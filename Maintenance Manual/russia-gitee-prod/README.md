## Gitee Core Component List

### Open Source Dependency Service List

{"服务名称"=>"Redis_cluster", "部署方式"=>"容器", "链接"=>"[官网](URL-5df12506b0)", "版本"=>"5.0", "服务说明"=>"内容审查使用 redis 集群"}
| ------------- | -------- | ----------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| MySQL         | Binary   | [Official Website](https://www.mysql.com)
  \                  | 5.7                          | Gitee Uses Relational Database                                                 |
  One Master and One Slave, Read-Write Separation                                   |
{"服务名称"=>"PostgreSQL", "部署方式"=>"二进制", "链接"=>"[官网](https://www.postgresql.org)", "版本"=>"12.17", "服务说明"=>"foruda、praefect、grms 共用关系型数据库"}
| Minio         | Binary   | [Official Website](https://min.io)
  \                         | RELEASE.2023-12-13T23-28-55Z | MinIO is a high-performance object storage                                           |
| Haproxy | Binary | [Official Website](https://haproxy.org) | 2.6.16 | 2 Node DNS Round Robin | HAProxy Load Balancer's development branch (mirror of git.haproxy.org) |
Varnish
Redis
| Redis_cluster | container | [Official Website](https://redis.io)
  \                       | 5.0                          | redis cluster used for content review
  three masters and three slaves |
| Kafka         | Container | [Official Website](https://kafka.apache.org)
  \               | 3.6.1                        | Webhook Event Producer                                                     |
  3 Node Cluster <br />Deployed on the same server as Elasticsearch |
Elasticsearch

### Gitee Public Component List

| Service Name | Deployment Method | Repository URL | Branch | Deployment Node Labels | Service Description | Remarks |
| ------------------ | -------- | ------------------------------------------------------------- | ------- | ------------- | ------------------------------------------------------------------ | --------------------------------------------------------- |
| gitee-http-pilot   | chart    | [Gitee Repository](https://gitee.com/oscstudio/pilot)
  | master  | giteeFrontend | Git Via HTTP Frontend Service
  | Provides authentication service for git repository push and pull with HTTPS protocol |
gitee-ssh-pilot
| gitee-svnsbz | Chart | [Gitee Repository](https://gitee.com/oscstudio/svnsbz) | master | giteeFrontend | SVN Dynamic Proxy | Svn Frontend Proxy |
| Gitaly             | Binary   | [Gitee Repository](https://gitee.com/oscstudio/gitaly)
  \             | release | 3 physical nodes  | Git grpc backend service
Git repository storage service, provides Git operation interface
  | Gitaly, gitee-GNK, and Sserver are recommended to be deployed on the same server.     |
| gitee-praefect     | chart    | [Gitee Repository](https://gitee.com/oscstudio/gitaly)
  \             | release | giteePubcomm  | Gitaly routing and traffic replication
  Middleware dependencies:<br />PG<br />and Gitaly should be on the same repository branch |
| gitee-GNK | Binary | Gitee Repository https://gitee.com/oscstudio/gitee-hook | master | 3 physical nodes | Git native hooks | It is recommended to deploy Gitaly, gitee-GNK, and Sserver on the same server. |
| Sserver-binary | Binary | Gitee Repository https://gitee.com/oscstudio/sserver-binary | master | 3 physical nodes | Svn backend service | It is recommended to deploy Gitaly, gitee-GNK, and Sserver on the same server. |
| Lfsoss | Container | Gitee Repository https://gitee.com/oscstudio/lfsoss |
{"gitee-ums-admin"=>{"repo"=>"chart", "url"=>"Gitee 仓库", "external_url"=>"https://gitee.com/oschina/gitee-ums"}}
{"branch"=>"mirror of git.haproxy.org", "description"=>"2 台 DNS 轮询", "gitee-ums-review"=>{"repo"=>"chart", "url"=>"Gitee 仓库", "external_url"=>"https://gitee.com/oschina/gitee-ums"}, "dependencies"=>{"middleware"=>["MySQL", "Kafka", "Redis-UMS"]}}
gitee-rollingbox
gitee-foruda
| gitee-foruda-admin | chart    | [Gitee Repository](https://gitee.com/oscstudio/foruda-admin.git)
  | master  | giteeInternal | Object Storage Service-web end
  | Middleware dependency:<br /> PG MinIO |
| gitee-grms         | chart    | [Gitee Repository](https://gitee.com/oscstudio/grms)
  | master  | giteePubcomm  | Repository Backend Management Service
  | Middleware dependency:<br /> PG |
| gitee-pages | docker | |  | Single Container Deployment | | |

### Gitee Backend Service List

| Service Name | Deployment Method | Deployment Node Labels | Service Description |
| -------------------- | -------- | ------------ | --------------------------------------------------------- |
| gitee-webunicorn | chart | giteeRuby | Gitee Community Main Service |
| gitee-graphqlunicorn | chart    | giteeRuby    |
  Gitee 内部系统提供 graphql 接口的 gitee rails 服务        |
| gitee-giteecron | chart | giteePubcomm | Gitee service for executing one-time scripts and running scheduled scripts in gitee rails |
gitee-authunicorn
gitee-sidekiq

### Gitee Frontend Service List

| 服务名称            | 部署方式 | 部署节点标签  | 服务说明                                                         |
| ------------------- | -------- | ------------- | ---------------------------------------------------------------- |
| gitee-community-web | chart | giteeInternal
| gitee-ent-web       | chart    | giteeInternal
  | Gitee front-end service enterprise edition front-end                           |
| gitee-assets | chart | giteeFrontend | HTTP Dynamic Routing Reverse Proxy Service |



## Gitee Core Component Deployment

### Gitee Backend Project Deployment

Build and deploy backend projects for all shared repositories on Gitee

- gitee-giteecron

- gitee-webunicorn
- gitee-graphqlunicorn
- gitee-authunicorn
- gitee-sidekiq

> Prerequisite: Create namespace and private repository access keys

````sh
# Provide Credentials on the Command Line to Create a Secret, Name: gitee

```shell
kubectl create ns gitee-prod
kubectl -n gitee-prod create secret docker-registry gitee \
  --docker-server=hub.gitee.com \
  --docker-username=gitee \
  --docker-password=Oschina123 \
  --docker-email=gitee@gitee.com
```
````

Add custom domain name resolution in Kubernetes CoreDNS

```sh
$ kubectl get cm/coredns -o yaml -n kube-system
apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . 10.4.145.142 {
            max_fails 3
            max_concurrent 1000
            prefer_udp
        }
        cache 30
        loop
        reload
        loadbalance
    }
kind: ConfigMap
```

> Note that there is a period after 'forward'.
>
> 10.4.145.142 is the internal data center Coredns server.

You can also add host A records as follows:

```
hosts {  # Add custom domain name resolution
  192.168.31.x git.k8s.local
  192.168.31.x jenkins.k8s.local
  192.168.31.x harbor.k8s.local
  fallthrough
}
```

You can add the following content to the Corefile to configure wildcard domain resolution and A records:

```
.:53 {
    # Other configuration items
    # ...

    # Wildcard domain resolution
    rewrite name regex (.*)\.internal\.example\.com internal.example.com

    # A Record Resolution
    hosts {
        10.0.0.1 a.internal.example.com
        10.0.0.2 b.internal.example.com
        # Other records
        # ...
    }
}
```

The rewrite directive is used for wildcard domain resolution, resolving all domain names ending with .internal.example.com to internal.example.com. The hosts directive is used to configure A record resolution, resolving the specified domain name to the corresponding IP address.

Remember to modify the path of Corefile and reload the configuration file to make the configuration take effect.

#### Dockerfile production image list

##### gitee-giteecron

##### gitee-webunicorn

##### gitee-graphqlunicorn

##### gitee-authunicorn

##### gitee-sidekiq

#### Charts Deployment Service List

```sh
# gitee-giteecron
# 2C2G replicaCount: 2 node_role: giteePubcomm
helm -n gitee-prod upgrade gitee-giteecron -f ./gitee-giteecron/values.yaml ./gitee-giteecron --install

# gitee-webunicorn
# 2C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-webunicorn -f ./gitee-webunicorn/values.yaml ./gitee-webunicorn --install

# gitee-graphqlunicorn
# 2C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-graphqlunicorn -f ./gitee-graphqlunicorn/values.yaml ./gitee-graphqlunicorn --install

# gitee-authunicorn
# 2C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-authunicorn -f ./gitee-authunicorn/values.yaml ./gitee-authunicorn --install

# gitee-sidekiq
# 4C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-sidekiq -f ./gitee-sidekiq/values.yaml ./gitee-sidekiq --install
```

### Deployment of Gitee Pub-Comm project

Build and deploy common components for all shared gitee repositories

- gitee-http-pilot
- gitee-ssh-pilot
- gitee-svnsbz
- gitee-praefect
- gitee-ums-admin
- gitee-ums-consumer
- ~~gitee-ums-review~~
- gitee-rollingbox
- gitee-foruda
- gitee-foruda-admin
- gitee-grms
- ~~git-pages~~
- gitee-lfsoss



#### Dockerfile production image list

The images are located in the repository directory. Look for the 'Dockerfile' or 'Dockerfile-base' file in the repository directory.

##### gitee-http-pilot

##### gitee-ssh-pilot

##### gitee-svnsbz

##### gitee-praefect

##### gitee-ums-admin

##### gitee-ums-consumer

##### ~~gitee-ums-review~~

##### gitee-rollingbox

##### gitee-foruda

##### gitee-foruda-admin

##### gitee-grms

##### gitee-lfsoss

##### ~~git-pages~~



#### Charts Deployment Service List

```sh
# gitee-http-pilot
# 4C4G replicaCount: 1 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-http-pilot -f ./gitee-http-pilot/values.yaml ./gitee-http-pilot --install

# gitee-ssh-pilot
# 4C4G replicaCount: 1 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-ssh-pilot -f ./gitee-ssh-pilot/values.yaml ./gitee-ssh-pilot --install

# gitee-svnsbz
# 4C4G replicaCount: 1 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-svnsbz -f ./gitee-svnsbz/values.yaml ./gitee-svnsbz --install

# gitee-praefect
# 2C2G replicaCount: 3 node_role: giteePubcomm
helm -n gitee-prod upgrade gitee-praefect -f ./gitee-praefect/values.yaml ./gitee-praefect --install

# gitee-ums-admin
# 2C2G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-ums-admin -f ./gitee-ums-admin/values.yaml ./gitee-ums-admin --install

# gitee-ums-consumer
# 4C4G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-ums-consumer -f ./gitee-ums-consumer/values.yaml ./gitee-ums-consumer --install

# gitee-ums-review Not ready for delivery
#helm -n gitee-prod upgrade gitee-ums-review -f ./gitee-ums-review/values.yaml ./gitee-ums-review --install

# gitee-rolling-box
# 4C4G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-rolling-box -f ./gitee-rolling-box/values.yaml ./gitee-rolling-box  --install

# gitee-foruda
# 4C4G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-foruda -f ./gitee-foruda/values.yaml ./gitee-foruda --install
Health Check Interface
#https://foruda.autom.studio/health

# gitee-foruda-admin
# 2C2G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-foruda-admin -f ./gitee-foruda-admin/values.yaml ./gitee-foruda-admin --install
Modify the .env.build configuration as follows
# https://foruda.autom.studio

# gitee-lfsoss
# 2C2G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-lfsoss -f ./gitee-lfsoss/values.yaml ./gitee-lfsoss --install
```



> Note: gitee-lfsoss needs to change the recycling policy of pv to Retain mode, modify helm uninstall to retain pvc
>
> Reference: https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/change-pv-reclaim-policy/
>
> [Removal of Persistent Volumes · Issue #1875 · helm/helm (github.com)](https://github.com/helm/helm/issues/1875)



### Gitee Frontend Project Deployment

Build and deploy frontend projects for all shared repositories on gitee

- gitee-community-web
- ~~gitee-edu-api~~
- ~~gitee-edu-web~~
- gitee-ent-web
- gitee-assets

#### Dockerfile production image list

##### gitee-community-web

##### gitee-ent-web

##### gitee-assets

#### Charts Deployment Service List

```sh
# gitee-community-web
# 2C2G replicaCount: 3 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-community-web -f gitee-community-web/values.yaml ./gitee-community-web --install

# gitee-edu-api not delivered yet
# helm -n gitee-prod upgrade gitee-edu-api -f ./gitee-edu-api/values.yaml ./gitee-edu-api --install

# gitee-edu-web not delivered yet
# helm -n gitee-prod upgrade gitee-edu-web -f ./gitee-edu-web/values.yaml ./gitee-edu-web --install

# gitee-ent-web
# 2C2G replicaCount: 2 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-ent-web -f ./gitee-ent-web/values.yaml ./gitee-ent-web --install

# gitee-assets
# 2C4G replicaCount: 3 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-assets -f ./gitee-assets/values.yaml ./gitee-assets --install
```

## Jenkins-based Continuous Integration and Continuous Deployment (CICD) on Kubernetes

Early manual update

Front-end

- gitee-assets

```sh
# Build frontend image
OSC_GIT_COMMIT=$(git rev-parse --short HEAD | cut -c 1-7)
docker build --pull --build-arg USERPASS=admin:P@ssw0rd --build-arg VERSION="${OSC_GIT_COMMIT}" -f Dockerfile.assets -t hub.gitee.com/gitee/assets:${OSC_GIT_COMMIT} .

Deploy front-end
helm upgrade -i --wait --atomic  --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-assets gitee-assets
```

- gitee-community-web

```shell
OSC_GIT_COMMIT=$(git rev-parse --short HEAD | cut -c 1-7)
sed 's@NEXT_PUBLIC_ENT_SITE_URL=.*@NEXT_PUBLIC_ENT_SITE_URL=https://enterprise.gitee.ru@g' -i packages/gitee-community-web/.env
sed 's@GRAPHQL_SCHEMA_API_URL=.*@GRAPHQL_SCHEMA_API_URL=https://gitee.ru/graphql@g' -i packages/gitee-community-web/.env
docker build --pull --build-arg GITEE_APP_VERSION=${OSC_GIT_COMMIT} -f docker/community.Dockerfile -t hub.gitee.com/gitee-frontend/gitee-community-web:${OSC_GIT_COMMIT} .

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-community-web gitee-community-web
```

Back-end

- unicorn

```sh
helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-webunicorn gitee-webunicorn

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-graphqlunicorn gitee-graphqlunicorn

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-giteecron gitee-giteecron

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-authunicorn gitee-authunicorn

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-sidekiq gitee-sidekiq
```

Rollback

```sh
Roll back to the previous version
Befor_versio=$(helm history gitee-assets -n gitee-prod | grep -v REVISION | awk '{print $1}' | tail -n 2 | head -n 1)
helm rollback gitee-assets ${Befor_versio} -n gitee-prod


# Roll back to a specific version
Designation_version=$(helm history gitee-assets | grep 993544f| awk '{print $1}')
helm rollback gitee-assets ${Designation_version} -n gitee-prod
```



[Useful optimization features in Jenkins | Mr.Pu's Blog (putianhui.cn)](https://www.putianhui.cn/posts/f5b12f59c480/)

"[Automated deployment of dev-uat-preprd-prd environment services using Jenkins, and implementing rollback on deployment failure.| Mr.Pu's Personal Blog (putianhui.cn)](https://www.putianhui.cn/posts/7041616304b2/)"

[Explanation of Jenkinsfile | Mr.Pu's Personal Blog (putianhui.cn)](https://www.putianhui.cn/posts/fa563716f116/)



Release process and pipeline maintenance

https://gitee.com/autom-studio/std/blob/master/ Operation program / cloud native environment service maintenance / release process and pipeline maintenance.md



## Reference

Deploying k8s 1.26.3 (with containerd as container runtime) using Kubeadm on Ubuntu 22.04 LTS

[Install k8s-v1.25.x cluster on Ubuntu 22.04 (yuque.com)](https://www.yuque.com/longfc/k8s/mq3iyw#Y2unZ)

[Install a High-Availability Kubernetes Cluster on Ubuntu 20.04 | Cifangzi - Find Me to Bring Vegetables (cifangzi.club)](http://cifangzi.club/2021/06/k8s_installation/)

Kubeadm installation guide - DevOps Development