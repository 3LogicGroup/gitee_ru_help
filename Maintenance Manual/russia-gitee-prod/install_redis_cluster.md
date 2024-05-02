# Устанавливаем кластер Redis



## 1. Создание пула устройств хранения данных CephFS

`filesystem-russia.yaml`

```yaml
apiVersion: ceph.rook.io/v1
kind: CephFilesystem
metadata:
  name: russia-fs
  namespace: rook-ceph
spec:
  metadataPool:
    replicated:
      size: 3
  dataPools:
    - name: replicated
      replicated:
        size: 3
  preserveFilesystemOnDelete: true
  metadataServer:
    activeCount: 1
    activeStandby: true
```



```sh
$ k apply -f filesystem-russia.yaml
cephfilesystem.ceph.rook.io/russia-fs created

$ k get CephFilesystem -n rook-ceph
NAME             ACTIVEMDS   AGE   PHASE
russia-fs  1           26s   Progressing
```



## 2. Предоставление хранилища CephFS

`storageclass-russia.yaml`

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gitee-public-cephfs
provisioner: rook-ceph.cephfs.csi.ceph.com
parameters:
"  clusterID: rook-ceph # Modify to the correct namespace where rook-ceph is located"
  fsName: russia-fs
  pool: russia-fs-replicated
  csi.storage.k8s.io/provisioner-secret-name: rook-csi-cephfs-provisioner
csi.storage.k8s.io/provisioner-secret-namespace: rook-ceph # Modify to the correct namespace where rook-ceph is located
  csi.storage.k8s.io/controller-expand-secret-name: rook-csi-cephfs-provisioner
csi.storage.k8s.io/controller-expand-secret-namespace:
  rook-ceph # Modify to the correct namespace where rook-ceph is located
  csi.storage.k8s.io/node-stage-secret-name: rook-csi-cephfs-node
csi.storage.k8s.io/node-stage-secret-namespace: rook-ceph # Modify to the correct namespace where rook-ceph is located.
reclaimPolicy: Delete
allowVolumeExpansion: true
mountOptions:
```



```sh
$ k apply -f storageclass-russia.yaml
storageclass.storage.k8s.io/rook-cephfs created

$ k get sc
NAME                        PROVISIONER                     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
gitee-public-cephfs         rook-ceph.cephfs.csi.ceph.com   Delete          Immediate           true                   15m
```



## 3. Развертывание кластера Redis с помощью Helm — 3 главных и 3 подчиненных устройства

Предварительное условие: используйте StorageClass типа NFS для постоянного хранилища с именем StorageClass «rook-cephfs».



Диаграмма: [https://artifacthub.io/packages/helm/bitnami/redis-cluster](https://gitee.com/link?target=https%3A%2F%2Fartifacthub.io%2Fpackages%2Fhelm%2Fbitnami%2Fredis-cluster)

```sh
Pull chart to local
$ helm repo list
$ helm pull bitnami/redis-cluster --version 7.6.1
$ tar -xvf redis-cluster-7.6.1.tgz
$ cd redis-cluster
$ cat > values-pro.yaml<<'EOF'
usePassword: false

service:
  ports:
    redis: 6379


persistence:
  path: /bitnami/redis/data
  subPath: ""
  storageClass: "gitee-public-cephfs"

redis:
  livenessProbe:
    enabled: true
    initialDelaySeconds: 60
    periodSeconds: 30
    timeoutSeconds: 10
    successThreshold: 1
    failureThreshold: 5

  readinessProbe:
    enabled: true
    initialDelaySeconds: 60
    periodSeconds: 30
    timeoutSeconds: 10
    successThreshold: 1
    failureThreshold: 5

  startupProbe:
    enabled: false
    path: /
    initialDelaySeconds: 300
    periodSeconds: 30
    timeoutSeconds: 10
    failureThreshold: 6
    successThreshold: 1
EOF

$ helm install redis-cluster -f values-pro.yaml --namespace gitee-public .
NAME: redis-cluster
LAST DEPLOYED: Thu Jan  4 08:28:45 2024
NAMESPACE: gitee-public
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: redis-cluster
CHART VERSION: 7.6.1
APP VERSION: 6.2.7** Please be patient while the chart is being deployed **



You have deployed a Redis&trade; Cluster accessible only from within you Kubernetes Cluster.INFO: The Job to create the cluster will be created.To connect to your Redis&trade; cluster:

1. Run a Redis&trade; pod that you can use as a client:
kubectl run --namespace gitee-public redis-cluster-client --rm --tty -i --restart='Never' \

--image docker.io/bitnami/redis-cluster:6.2.7-debian-10-r22 -- bash

2. Connect using the Redis&trade; CLI:

redis-cli -c -h redis-cluster

$ k get pod
NAME              READY   STATUS    RESTARTS      AGE
redis-cluster-0   1/1     Running   1 (66s ago)   109s
redis-cluster-1   1/1     Running   0             109s
redis-cluster-2   1/1     Running   0             109s
redis-cluster-3   1/1     Running   0             109s
redis-cluster-4   1/1     Running   0             109s
redis-cluster-5   1/1     Running   0             109s
```



Объяснение

```sh
# Internal access within the cluster, through svc automatic load balancing:
redis-cluster.gitee-public.svc.cluster.local:6379

# Access Single Redis Address within the Cluster
redis-cluster-0.redis-cluster-headless.gitee-public
redis-cluster-1.redis-cluster-headless.gitee-public
redis-cluster-2.redis-cluster-headless.gitee-public
redis-cluster-3.redis-cluster-headless.gitee-public
redis-cluster-4.redis-cluster-headless.gitee-public
redis-cluster-5.redis-cluster-headless.gitee-public

#Default redis-cluster-0 and redis-cluster-1 are master-slave, 0 is master and 1 is slave
#Default redis-cluster-2 and redis-cluster-3 are master-slave, 0 master 1 slave
#Default redis-cluster-4 and redis-cluster-5 are master-slave, 4 is master and 5 is slave
# The cluster master nodes are: redis-cluster-0 redis-cluster-2 redis-cluster-4
# The cluster slave nodes are: redis-cluster-1 redis-cluster-3 redis-cluster-5
```


