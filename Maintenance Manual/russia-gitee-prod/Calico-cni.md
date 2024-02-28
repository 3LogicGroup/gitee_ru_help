Calico-cni network plugin

Calico network plugin is another popular open-source network solution in the Kubernetes ecosystem. Calico is a layer 3 network solution that supports Border Gateway Protocol (BGP) mode and IPIP mode.

Calico adopts a very flexible modular architecture design. Users can choose necessary modules for installation and deployment according to their actual needs. Calico mainly consists of the following modules.

- Container Network Interface Plugin: Provides efficient Pod networking and IP address management for the Kubernetes container platform.
- Felix: A policy engine, also known as the Calico agent, needs to run on each worker node and is responsible for configuring routing and access control policies to ensure connectivity and security restrictions between worker nodes.
- BIRD: Responsible for distributing routing information from Felix written into the Linux kernel to the entire Calico network, ensuring connectivity between Pods.
- EEtcd: Distributed key-value storage, mainly responsible for ensuring the consistency of network metadata and ensuring the accuracy of Calico network state.
- calico/node: Packages Felix, Bird, and other components into a unified component, and is responsible for initializing and preparing the environment for other components.
Typha: By default, Felix interacts with Etcd through the API server of the Kubernetes cluster. However, in the case of a large number of cluster nodes, we can reduce the pressure on the API server by directly interacting with Etcd through Typha.
- calicocli: Calico's command-line tool, used for managing Calico network configurations and network policies.

Calico architecture is shown in the following diagram.

![](../images/calico-ipinip1.png)

Calico supports a variety of network modes, which can be broadly divided into overlay network types and non-overlay network types. Overlay network types include VXLAN network mode and IPIP network mode, while non-overlay network types include BGP full-mesh mode and BGP route reflection mode.

## 1. IPIP Mode

Calico's IPIP mode, which is the IP-in-IP overlay network model, Calico creates a tunl0 network card on each compute node in the cluster. All packets that need to be forwarded to other nodes within the cluster must pass through this tunl0 network card device for encapsulation and decapsulation, resulting in significant network performance loss in IPIP mode.

Calico 3.x's default configuration is IPIP transport mode instead of BGP mode. IPIP mode has lower requirements for the underlying network, but similar to Flannel VXLAN mode, this mode has higher network overhead and is not suitable for scenarios with high performance requirements for container networks.

We can deploy Calico components in a Kubernetes cluster and use the IPIP mode by following these steps.

```sh
$ curl -LO https://docs.projectcalico.org/manifests/calico.yaml
$ kubectl apply -f calico.yaml
```

Calico component running status as follows.

```
$ kubectl -nkube-system get po |grep calico-node
calico-node-2mcj7                                  1/1     Running   0               5d18h
calico-node-2t646                                  1/1     Running   0               27d
calico-node-4wxzt                                  1/1     Running   0               27d
calico-node-5fx6g                                  1/1     Running   0               27d
calico-node-74jjs                                  1/1     Running   0               27d
calico-node-bfvpk                                  1/1     Running   0               27d
calico-node-bv6zm                                  1/1     Running   0               27d
calico-node-c2p4d                                  1/1     Running   0               5d18h
calico-node-cbj5g                                  1/1     Running   0               27d
calico-node-cwqw6                                  1/1     Running   0               27d
calico-node-ggc54                                  1/1     Running   0               27d
calico-node-gkdzn                                  1/1     Running   0               27d
calico-node-lk9tc                                  1/1     Running   0               27d
calico-node-qg6qh                                  1/1     Running   0               27d
calico-node-rb7hn                                  1/1     Running   0               27d
calico-node-tkjwr                                  1/1     Running   0               27d
calico-node-vwn57                                  1/1     Running   0               27d
calico-node-xmbs6                                  1/1     Running   0               5d19h
```

The cluster node status is as follows.

```sh
$ kubectl get no -o wide
NAME                       STATUS   ROLES           AGE     VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
gitee-kubernetes-master1   Ready    control-plane   27d     v1.26.3   10.4.145.92    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-master2   Ready    control-plane   27d     v1.26.3   10.4.145.129   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-master3   Ready    control-plane   27d     v1.26.3   10.4.145.169   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node01    Ready    <none>          27d     v1.26.3   10.4.145.107   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node02    Ready    <none>          27d     v1.26.3   10.4.145.32    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node03    Ready    <none>          27d     v1.26.3   10.4.145.79    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node04    Ready    <none>          27d     v1.26.3   10.4.145.37    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node05    Ready    <none>          27d     v1.26.3   10.4.145.168   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node06    Ready    <none>          27d     v1.26.3   10.4.145.113   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node07    Ready    <none>          27d     v1.26.3   10.4.145.34    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node08    Ready    <none>          27d     v1.26.3   10.4.145.25    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node09    Ready    <none>          27d     v1.26.3   10.4.145.57    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node10    Ready    <none>          27d     v1.26.3   10.4.145.116   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node11    Ready    <none>          27d     v1.26.3   10.4.145.26    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node12    Ready    <none>          27d     v1.26.3   10.4.145.123   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node13    Ready    <none>          5d19h   v1.26.3   10.4.145.144   <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node14    Ready    <none>          5d18h   v1.26.3   10.4.145.53    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
gitee-kubernetes-node15    Ready    <none>          5d18h   v1.26.3   10.4.145.52    <none>        Ubuntu 20.04.6 LTS   5.4.0-169-generic   containerd://1.6.20
```

Next, we deploy two Pods, busybox01 and busybox02, respectively.

```sh
$ kubectl run busybox01 --image=busybox --restart=Never -- sleep 1d
$ kubectl run busybox02 --image=busybox --restart=Never -- sleep 1d
```

The nodes busybox01 and busybox02 are distributed on different hosts and have been assigned different IP addresses as shown below.

```
$ kubectl get po -o wide
NAME        READY   STATUS    RESTARTS   AGE     IP              NODE                      NOMINATED NODE   READINESS GATES
busybox01   1/1     Running   0          3m14s   10.10.72.17     gitee-kubernetes-node12   <none>           <none>
busybox02   1/1     Running   0          8s      10.10.245.137   gitee-kubernetes-node08   <none>           <none>
```

Test connectivity from busybox01 to busybox02.

```sh
root@gitee-sre2:/home/ubuntu/workdir/kubernetes-test# k exec -it pod/busybox01 -- sh
/ #
/ # ping 10.10.245.137
PING 10.10.245.137 (10.10.245.137): 56 data bytes
64 bytes from 10.10.245.137: seq=0 ttl=62 time=1.238 ms
64 bytes from 10.10.245.137: seq=1 ttl=62 time=0.971 ms
```

Viewing routing information on compute node gitee-kubernetes-node12, as shown below.

```
$ route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         10.4.145.254    0.0.0.0         UG    100    0        0 enp3s0
10.0.0.0        10.4.145.1      255.0.0.0       UG    100    0        0 enp3s0
10.4.145.0      0.0.0.0         255.255.255.0   U     0      0        0 enp3s0
10.10.33.128    10.4.145.37     255.255.255.192 UG    0      0        0 tunl0
10.10.56.64     10.4.145.52     255.255.255.192 UG    0      0        0 tunl0
10.10.72.0      0.0.0.0         255.255.255.192 U     0      0        0 *
10.10.72.5      0.0.0.0         255.255.255.255 UH    0      0        0 calic9794644568
10.10.72.6      0.0.0.0         255.255.255.255 UH    0      0        0 calia7efe363e11
10.10.72.7      0.0.0.0         255.255.255.255 UH    0      0        0 calic55f229dc12
10.10.72.9      0.0.0.0         255.255.255.255 UH    0      0        0 cali53110add79b
10.10.72.10     0.0.0.0         255.255.255.255 UH    0      0        0 cali4c5dc10ef75
10.10.72.11     0.0.0.0         255.255.255.255 UH    0      0        0 cali6d4db38382a
10.10.72.17     0.0.0.0         255.255.255.255 UH    0      0        0 cali62b1ad91c8d
10.10.72.46     0.0.0.0         255.255.255.255 UH    0      0        0 cali3a91edd0921
10.10.72.47     0.0.0.0         255.255.255.255 UH    0      0        0 calif3e423643c7
10.10.72.61     0.0.0.0         255.255.255.255 UH    0      0        0 cali179c17c1158
10.10.72.128    10.4.145.168    255.255.255.192 UG    0      0        0 tunl0
10.10.91.128    10.4.145.113    255.255.255.192 UG    0      0        0 tunl0
10.10.92.0      10.4.145.53     255.255.255.192 UG    0      0        0 tunl0
10.10.97.64     10.4.145.34     255.255.255.192 UG    0      0        0 tunl0
10.10.107.64    10.4.145.116    255.255.255.192 UG    0      0        0 tunl0
10.10.115.64    10.4.145.26     255.255.255.192 UG    0      0        0 tunl0
10.10.116.192   10.4.145.57     255.255.255.192 UG    0      0        0 tunl0
10.10.135.64    10.4.145.32     255.255.255.192 UG    0      0        0 tunl0
10.10.189.192   10.4.145.129    255.255.255.192 UG    0      0        0 tunl0
10.10.190.64    10.4.145.92     255.255.255.192 UG    0      0        0 tunl0
10.10.196.0     10.4.145.79     255.255.255.192 UG    0      0        0 tunl0
10.10.210.0     10.4.145.144    255.255.255.192 UG    0      0        0 tunl0
10.10.218.64    10.4.145.107    255.255.255.192 UG    0      0        0 tunl0
10.10.228.192   10.4.145.169    255.255.255.192 UG    0      0        0 tunl0
10.10.245.128   10.4.145.25     255.255.255.192 UG    0      0        0 tunl0
169.254.169.254 10.4.145.2      255.255.255.255 UGH   100    0        0 enp3s0
172.16.0.0      10.4.145.1      255.240.0.0     UG    100    0        0 enp3s0
192.168.0.0     10.4.145.1      255.255.0.0     UG    100    0        0 enp3s0

$ route -n|grep 10.10.245
10.10.245.128   10.4.145.25     255.255.255.192 UG    0      0        0 tunl0
```

Viewing routing information on compute node gitee-kubernetes-node08, as shown below.

```sh
$ route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         10.4.145.254    0.0.0.0         UG    100    0        0 enp3s0
10.0.0.0        10.4.145.1      255.0.0.0       UG    100    0        0 enp3s0
10.4.145.0      0.0.0.0         255.255.255.0   U     0      0        0 enp3s0
10.10.33.128    10.4.145.37     255.255.255.192 UG    0      0        0 tunl0
10.10.56.64     10.4.145.52     255.255.255.192 UG    0      0        0 tunl0
10.10.72.0      10.4.145.123    255.255.255.192 UG    0      0        0 tunl0
10.10.72.128    10.4.145.168    255.255.255.192 UG    0      0        0 tunl0
10.10.91.128    10.4.145.113    255.255.255.192 UG    0      0        0 tunl0
10.10.92.0      10.4.145.53     255.255.255.192 UG    0      0        0 tunl0
10.10.97.64     10.4.145.34     255.255.255.192 UG    0      0        0 tunl0
10.10.107.64    10.4.145.116    255.255.255.192 UG    0      0        0 tunl0
10.10.115.64    10.4.145.26     255.255.255.192 UG    0      0        0 tunl0
10.10.116.192   10.4.145.57     255.255.255.192 UG    0      0        0 tunl0
10.10.135.64    10.4.145.32     255.255.255.192 UG    0      0        0 tunl0
10.10.189.192   10.4.145.129    255.255.255.192 UG    0      0        0 tunl0
10.10.190.64    10.4.145.92     255.255.255.192 UG    0      0        0 tunl0
10.10.196.0     10.4.145.79     255.255.255.192 UG    0      0        0 tunl0
10.10.210.0     10.4.145.144    255.255.255.192 UG    0      0        0 tunl0
10.10.218.64    10.4.145.107    255.255.255.192 UG    0      0        0 tunl0
10.10.228.192   10.4.145.169    255.255.255.192 UG    0      0        0 tunl0
10.10.245.128   0.0.0.0         255.255.255.192 U     0      0        0 *
10.10.245.129   0.0.0.0         255.255.255.255 UH    0      0        0 cali45b04ae9cf6
10.10.245.131   0.0.0.0         255.255.255.255 UH    0      0        0 cali96e57390261
10.10.245.135   0.0.0.0         255.255.255.255 UH    0      0        0 cali5cce408a2d7
10.10.245.137   0.0.0.0         255.255.255.255 UH    0      0        0 calif801f1b8d31
10.10.245.165   0.0.0.0         255.255.255.255 UH    0      0        0 cali2cc1bcfc5c7
10.10.245.166   0.0.0.0         255.255.255.255 UH    0      0        0 cali79bedb1c9ec
10.10.245.180   0.0.0.0         255.255.255.255 UH    0      0        0 calif2b11c394dd
10.10.245.186   0.0.0.0         255.255.255.255 UH    0      0        0 cali34c6341b899
10.10.245.187   0.0.0.0         255.255.255.255 UH    0      0        0 cali2e337dd6027
10.10.245.188   0.0.0.0         255.255.255.255 UH    0      0        0 cali0564d85b9a0
10.10.245.191   0.0.0.0         255.255.255.255 UH    0      0        0 cali84896e6f48c
169.254.169.254 10.4.145.2      255.255.255.255 UGH   100    0        0 enp3s0
172.16.0.0      10.4.145.1      255.240.0.0     UG    100    0        0 enp3s0
192.168.0.0     10.4.145.1      255.255.0.0     UG    100    0        0 enp3s0

$ route -n|grep 10.10.72
10.10.72.0      10.4.145.123    255.255.255.192 UG    0      0        0 tunl0
10.10.72.128    10.4.145.168    255.255.255.192 UG    0      0        0 tunl0

$ route -n|grep 10.10.245
10.10.245.128   0.0.0.0         255.255.255.192 U     0      0        0 *
10.10.245.129   0.0.0.0         255.255.255.255 UH    0      0        0 cali45b04ae9cf6
10.10.245.131   0.0.0.0         255.255.255.255 UH    0      0        0 cali96e57390261
10.10.245.135   0.0.0.0         255.255.255.255 UH    0      0        0 cali5cce408a2d7
10.10.245.137   0.0.0.0         255.255.255.255 UH    0      0        0 calif801f1b8d31
10.10.245.165   0.0.0.0         255.255.255.255 UH    0      0        0 cali2cc1bcfc5c7
10.10.245.166   0.0.0.0         255.255.255.255 UH    0      0        0 cali79bedb1c9ec
10.10.245.180   0.0.0.0         255.255.255.255 UH    0      0        0 calif2b11c394dd
10.10.245.186   0.0.0.0         255.255.255.255 UH    0      0        0 cali34c6341b899
10.10.245.187   0.0.0.0         255.255.255.255 UH    0      0        0 cali2e337dd6027
10.10.245.188   0.0.0.0         255.255.255.255 UH    0      0        0 cali0564d85b9a0
10.10.245.191   0.0.0.0         255.255.255.255 UH    0      0        0 cali84896e6f48c
```

Data packet forwarding process as shown in the figure

![](../images/calico-ipinip2.png)

Calico IPIP Mode Data Packet Forwarding Process

1) The data packet pinging 10.10.245.137 is sent from Pod busybox01. On the gitee-kubernetes-node12 node, it will match the route entry '10.10.245.128 10.4.145.25 255.255.255.192 UG 0 0 0 tunl0'. This route means that the business system of the Gitee platform is deployed in the compute node's K8s cluster. The high availability of the K8s cluster is achieved through multiple master nodes and load balancing using an upper layer LB. The nodes in the K8s cluster support dynamic scaling, where a node running Ubuntu can be initialized and added to the K8s cluster to expand the cluster's computing power.
Packets destined for the 10.10.245.128/32 network segment are all forwarded to the gateway 10.4.145.254 through the tunl0 device and then forwarded to other compute nodes via eth0.

The gitee-kubernetes-node08 node receives a packet and finds that the destination IP of the packet is 10.10.245.137. According to the routing rule '10.10.245.137 0.0.0.0 255.255.255.255 UH 0 0 0 calif801f1b8d31', the packet is forwarded to the 'calif801f1b8d31' device. The 'calif801f1b8d31' device is the host-side of the veth-pair of the Pod busybox02.

## 2. BGP mode

Currently, this mode is not used in production environment, will consider it when needed.

## 3. Network Policy

Calico network also supports a series of network security policies based on iptables. Users can restrict or allow network connectivity between Pods based on specific business requirements. Here we create a default network policy that does not allow any traffic to enter for all Pods in the default namespace.

```sh
$ kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector:
    matchLabels: {}
EOF
```

`calico-NetworkPolicy-ns-deny.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector:
    matchLabels: {}
```

Verify that the network communication from busybox01 to busybox02 has been isolated, proving that the network policy has taken effect.

```sh
$ kubectl exec -it busybox01 sh
/ # ping 10.10.245.137
PING 10.10.245.137 (10.10.245.137): 56 data bytes
```

Next, we further set busybox02 to allow only busybox01 to access.

```sh
$ kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: bysubox02-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      run: busybox02
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          run: busybox01
EOF
```

`calico-NetworkPolicy-ns-allow.yaml`

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: bysubox02-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      run: busybox02
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          run: busybox01
```

The network communication restriction between busybox01 and busybox02 has been opened again for verification.

```sh
$ kubectl exec -it busybox01 sh
/ # ping 10.10.245.137
PING 10.100.241.5 (10.100.241.5): 56 data bytes
64 bytes from 10.100.241.5: seq=0 ttl=62 time=0.399 ms
64 bytes from 10.100.241.5: seq=1 ttl=62 time=0.272 ms
```

Create busybox03, because we set the network policy to only allow busybox01 to access busybox02, the network communication from busybox03 to busybox02 is still restricted.

```sh
$ kubectl exec -it busybox03 sh
/ # ping 10.100.241.5
PING 10.100.241.5 (10.100.241.5): 56 data bytes
```

## 4. Comparison of container network plugins

Comparison of container network plugins as shown in the table

| Network Mode | Network Performance | Cluster Scale | Network Security Strategy
  | Cloud Platform Support | Cloud Platform Support Description |
| -------------------- | -------------- | -------- | ------------ | ---------- | ---------------------------------------- |
Flannel VXLAN
| Flannel host-wg | Routing, Layer 3 | High | Not supported
| Calicao IPIP         | Overlay Network, Layer 2 | Low     | Supported
  \        | Small and Medium-sized | Any Platform                                 |
| Calicao Full Interconnection Mode | Routing forwarding, Layer 3 | High | Supported | Small and Medium-sized | Supported in BGP-enabled cloud environments, excluding Alibaba Cloud VPC environments |
| Calicao Route Reflection Mode | Routing forwarding, Layer 3 | High | Supported | Large | Supported in BGP-enabled cloud environments, excluding Alibaba Cloud VPC environments |
| Cilium VXLAN         | Overlay Network, Layer 2 | Low     | Supported
  \        | Small and Medium-sized | Any Platform                                 |
| Cilium BGP Routing | Layer 3 routing | High | Supported | Large | Supported in BGP-enabled cloud environments, excluding Alibaba Cloud VPC environments |

Reference documentation

[10 Diagrams to Illustrate the Principles and Functions of K8S CNI Calico Network Model - Technical Yan Liang - Cnblogs (cnblogs.com)](https://www.cnblogs.com/cheyunhua/p/17126430.html)