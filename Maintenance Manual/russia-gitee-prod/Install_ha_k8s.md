# High availability deployment solution for Kubernetes clusters

## 1. High Availability Principle of Kubernetes Cluster

In a Kubernetes cluster, there are mainly two types of nodes, namely Master nodes and worker nodes.

The Master node is the management node of the entire Kubernetes cluster, which receives external commands and maintains the cluster status.

If the master node fails, the entire cluster will lose control. The main services running on the master node are apiserver, etcd, scheduler, and controller-manager.

Worker nodes (Node nodes) primarily perform computing tasks and run main services like kubelet and kube-proxy. When a worker node fails, Kubernetes will schedule Pods to other worker nodes without affecting the entire cluster operation, and even the impact on the application system is minimal.

Therefore, the high availability of the Kubernetes cluster mainly refers to the high availability of the Master node.

## 2. Server basic information

节点角色
| ------------------------------ | --------- | ---------------- | ---------------------------------------------------- | ------------ | -------- | ----------------- | -------------------------------------------------- |
| gitee-kubernetes-master1       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G        | 10.4.145.92  | v1.26.0  | containerd=1.6.20 | VIP：10.4.145.100                                  |
| gitee-kubernetes-master2       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G        | 10.4.145.129 | v1.26.0  | containerd=1.6.20 | VIP：10.4.145.100                                  |
| gitee-kubernetes-master3       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G        | 10.4.145.169 | v1.26.0  | containerd=1.6.20 | VIP：10.4.145.100                                  |
| gitee-kubernetes-node01~node15 | Amd64/X86 |
  Ubuntu 20.04 LTS | VCPU: 16C
Mem: 64G
System-Disk: 200G
 | omitted         |

## 3. Kubernetes cluster network planning

| Network | CIDR Range | Remarks |
| ------------ | ------------- | -------------------------------------- |
| Pod Network | 10.200.0.0/16 | The cluster can accommodate up to 65534 Pods |
| Service Network | 10.100.0.0/16 | Used for service discovery and load balancing within the cluster
| calico network segment | 10.10.0.0/16 | Cross-host forwarding is achieved through route configuration on the host. |

> - Network Proxy: ipvs
>
> - CNI component: **calico network component** Reference: k8s network Calico network
>
> - The DNS domain is `cluster.local`. This domain is the default DNS domain for Kubernetes, used to resolve DNS records for Kubernetes Services and Pods.
>
> Note
The host network segment, K8s Service network segment, and Pod network segment cannot overlap.

## 4. Installation in a high availability environment

### 4.1 Install Environment Preparation

In order to deploy Kubernetes smoothly, some configuration work needs to be done, and the configuration work has been integrated into the following script

`pre_reboot.sh`

```sh
#!/bin/env bash

HOST_NAME=$1
DNS_ADDRESS=$2

usage() {
  echo "Usage: $0 <HOSTNAME> <IP_ADDRESS>"
}

if [ "$#" -ne 2 ]; then
  usage
  exit 1
fi


validate_ip() {
  local ip=$1
  if [[ $ip =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    return 0
  else
    return 1
  fi
}


if ! validate_ip "$DNS_ADDRESS"; then
  echo "Error: $DNS_ADDRESS is not a valid IP address."
  usage
  exit 1
fi



install::installationOfToolsForEachNode() {
  # support ssl transmission
  sudo apt update
  sudo apt -y install \
    apt-transport-https \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg-agent \
    openssl \
    software-properties-common
}

setting::setDns() {
  dns=$1
  sudo sed -i "s/^#DNS=.*/DNS=${dns}/g" /etc/systemd/resolved.conf
  sudo sed -i 's/^#DNSStubListener=.*/DNSStubListener=no/g' /etc/systemd/resolved.conf
  sudo systemctl daemon-reload

  sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
  sudo systemctl restart systemd-resolved
}

setting::set_hostname() {
  new_hostname=$1
  sudo hostnamectl set-hostname $new_hostname
  echo "Hostname set to $new_hostname"
}

setting::turn_off_firewall_selinux() {
  sudo systemctl stop ufw
  sudo systemctl disable ufw
  sudo setenforce 0
}
setting::disable_swap() {
  sudo swapoff -a
  sudo sed -i '/swap/ s/^\(.*\)$/#\1/g' /etc/fstab
}
setting::set_time_synchronization() {
  sudo apt -y install chrony
  sudo systemctl restart chrony
}


upgrade::upgrade_system() {
  sudo apt update
  sudo apt -y full-upgrade
echo -n "Server will be restarted. Countdown.."
  tput sc
Loop for 20 seconds
  for count in `seq 20 -1 0`
  do
    tput rc
    tput ed
    echo -en "\033[1;31;40m ${count}s \033[0m"
    sleep 1
  done
  [ -f /var/run/reboot-required ] && sudo reboot -f
}


setting() {
  setting::set_hostname ${HOST_NAME}
  setting::setDns ${DNS_ADDRESS}
  setting::turn_off_firewall_selinux
  setting::disable_swap
  setting::set_time_synchronization
}

main() {
  install::installationOfToolsForEachNode
  setting
  upgrade::upgrade_system
}

main
```

```sh
Pre-configuration before installation
$ bash pre_reboot.sh hostname DNS_address
```

### 4.2 Install Master Node

`post_reboot.sh`

```sh
#!/usr/bin/env bash

kubernetes_version=$1
containerd_version=$2
role=$3

usage() {
    echo "Usage: $0 <kubernetes_version> <containerd_version> <master|node>"
    echo "  kubernetes_version: The desired Kubernetes version"
    echo "  containerd_version: The desired containerd version"
    echo "  example Usage: bash $0 1.26.3 1.6.20 master|node"
}

if [[ $# -ne 3 ]] || [[ "$role" != "master" && "$role" != "node" ]]; then
    usage
    exit 1
fi


set_kubernetes_cri_config() {
sudo sh -c 'cat << EOF > /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
user.max_user_namespaces=28633
EOF'

sudo sysctl -p /etc/sysctl.d/99-kubernetes-cri.conf


sudo sh -c 'sudo tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF'

sudo sudo sysctl --system
}

kernel_parameter_optimization () {
Enable kernel modules
sudo modprobe nf_conntrack && sudo modprobe br_netfilter
Configure kernel parameters
sudo sh -c 'cat >>/etc/sysctl.conf<<EOF
net.ipv4.ip_forward = 1
vm.max_map_count = 262144
kernel.pid_max = 4194303
fs.file-max = 1000000
net.ipv4.tcp_max_tw_buckets = 6000
net.netfilter.nf_conntrack_max = 2097152
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
vm.swappiness = 0
EOF'

# Add Kernel Module Boot Mount
sudo sh -c 'cat >> /etc/modules-load.d/modules.conf <<EOF
ip_vs
ip_vs_lc
ip_vs_lblc
ip_vs_lblcr
ip_vs_rr
ip_vs_wrr
ip_vs_sh
ip_vs_dh
ip_vs_fo
ip_vs_nq
ip_vs_sed
ip_vs_ftp
ip_vs_sh
ip_tables
ip_set
ipt_set
ipt_rpfilter
ipt_REJECT
ipip
xt_set
br_netfilter
nf_conntrack
overlay
EOF'

# Verify kernel modules and memory parameters after restart
sudo lsmod | grep br_netfilter
sudo sysctl -a | grep bridge-nf-call-iptables
}

enable_ipvs() {
sudo apt -y install ipvsadm
sudo mkdir -p /etc/sysconfig/modules/
sudo sh -c 'cat > /etc/sysconfig/modules/ipvs.modules <<EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack
EOF'

sudo chmod 755 /etc/sysconfig/modules/ipvs.modules
sudo bash /etc/sysconfig/modules/ipvs.modules
sudo lsmod | grep -e -ip_vs -e nf_conntrack
}

install_containerd() {
cd /tmp || exit 1
sudo wget https://github.com/containerd/containerd/releases/download/v"${containerd_version}"/containerd-"${containerd_version}"-linux-amd64.tar.gz
sudo tar xfv containerd-"${containerd_version}"-linux-amd64.tar.gz
sudo cp bin/* /usr/bin/

sudo sh -c 'cat > /lib/systemd/system/containerd.service << EOF
# Copyright The containerd Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

[Unit]
Description=containerd container runtime
Documentation=https://containerd.io
After=network.target local-fs.target

[Service]
ExecStartPre=-/sbin/modprobe overlay
ExecStart=/usr/bin/containerd

Type=notify
Delegate=yes
KillMode=process
Restart=always
RestartSec=5
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNPROC=infinity
LimitCORE=infinity
LimitNOFILE=infinity
# Comment TasksMax if your systemd version does not supports it.
# Only systemd 226 and above support this version.
TasksMax=infinity
OOMScoreAdjust=-999

[Install]
WantedBy=multi-user.target
EOF'


sudo sh -c 'cat > /etc/crictl.yaml<<-'EOF'
runtime-endpoint: unix:///run/containerd/containerd.sock
image-endpoint: unix:///run/containerd/containerd.sock
timeout: 10
debug: false
EOF'


Install runc
# runc is a container runtime that implements the init, run, create, ps... commands required to run containers.
# https://github.com/opencontainers/runc/releases
sudo wget https://github.com/opencontainers/runc/releases/download/v1.1.6/runc.amd64
sudo chmod a+x runc.amd64
sudo mv runc.amd64 /usr/bin/runc

# Modify the configuration of containerd, because containerd by default pulls images from the k8s official website
sudo mkdir -p /etc/containerd
# Export containerd configuration to a file
sudo sh -c 'containerd config default > /etc/containerd/config.toml'
sudo sh -c 'cp /etc/containerd/config.toml /etc/containerd/config.toml.backup'

# Modify configuration file
#sudo sed -i "s#registry.k8s.io/pause#registry.aliyuncs.com/google_containers/pause#g"  /etc/containerd/config.toml
sudo sed -i 's#SystemdCgroup = false#SystemdCgroup = true#g' /etc/containerd/config.toml
sudo sed -i 's#config_path = ""#config_path = "/etc/containerd/certs.d"#g' /etc/containerd/config.toml


# Create Image Acceleration Directory
#sudo mkdir /etc/containerd/certs.d/docker.io -pv
#sudo mkdir /etc/containerd/certs.d/quay.io -pv
#sudo mkdir /etc/containerd/certs.d/gcr.io -pv
#sudo mkdir /etc/containerd/certs.d/k8s.gcr.io -pv
sudo mkdir /etc/containerd/certs.d/harbor.io -pv


sudo sh -c 'cat > /etc/containerd/certs.d/harbor.io/hosts.toml << EOF
server = "https://hub.gitee.com"
[host."https://hub.gitee.com"]
  capabilities = ["pull", "resolve", "push"]
  skip_verify = true
EOF'


# Configuration Acceleration
#sudo sh -c 'cat > /etc/containerd/certs.d/docker.io/hosts.toml << EOF
#server = "https://docker.io"
#[host."https://registry-1.docker.io"]
#  capabilities = ["pull", "resolve"]
#EOF'

#sudo sh -c 'cat > /etc/containerd/certs.d/quay.io/hosts.toml << EOF
#server = "https://quay.io"
#[host."https://quay.mirrors.ustc.edu.cn"]
#  capabilities = ["pull", "resolve"]
#  skip_verify = true
#EOF'
#
#sudo sh -c 'cat > /etc/containerd/certs.d/gcr.io/hosts.toml << EOF
#server = "https://gcr.io"
#[host."https://gcr.mirrors.ustc.edu.cn"]
#  capabilities = ["pull", "resolve"]
#  skip_verify = true
#EOF'
#
#sudo sh -c 'cat > /etc/containerd/certs.d/k8s.gcr.io/hosts.toml << EOF
#server = "https://k8s.gcr.io"
#[host."https://gcr.mirrors.ustc.edu.cn/google-containers/"]
#  capabilities = ["pull", "resolve"]
#  skip_verify = true
#EOF'


# Load the kernel module of containerd and create the configuration file
sudo sh -c 'cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF'

# Set a suitable value for LimitNOFILE
sudo mkdir /etc/systemd/system/containerd.service.d -pv
sudo sh -c 'cat >/etc/systemd/system/containerd.service.d/LimitNOFILE.conf<<EOF
[Service]
LimitNOFILE=1048576
EOF'

# Execute the following command to make the configuration take effect
sudo modprobe overlay
sudo modprobe br_netfilter

sudo systemctl daemon-reload
sudo systemctl enable --now containerd
sudo systemctl status containerd
#containerd -v
}

install_nerdctl() {
cd /tmp || exit 1
sudo wget https://github.com/containerd/nerdctl/releases/download/v1.3.0/nerdctl-1.3.0-linux-amd64.tar.gz
sudo tar xfv nerdctl-1.3.0-linux-amd64.tar.gz -C /usr/bin/
#nerdctl version

# nerdctl configuration file
sudo mkdir /etc/nerdctl/ -pv
sudo sh -c 'cat > /etc/nerdctl/config.toml <<EOF
namespace = "k8s.io"
debug = false
debug_full = false
insecure_registry = true
EOF'

# Install CNI
sudo wget https://github.com/containernetworking/plugins/releases/download/v1.2.0/cni-plugins-linux-amd64-v1.2.0.tgz
sudo mkdir /opt/cni/bin -p
sudo tar xfv cni-plugins-linux-amd64-v1.2.0.tgz -C /opt/cni/bin/
}

install_kubeadm_kubelet_or_kubectl () {
sudo sh -c 'curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -'
sudo sh -c 'cat > /etc/apt/sources.list.d/kubernetes.list << EOF
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF'

sudo apt update

# Install kubeadm, kubectl, and kubelet on all three nodes, where kubectl is optional and not required on worker nodes.
if [ "$role" == "master" ]; then
  #sudo apt install -y --allow-change-held-packages kubeadm=1.26.3-00 kubectl=1.26.3-00 kubelet=1.26.3-00
  sudo apt install -y --allow-change-held-packages kubeadm=${kubernetes_version}-00 kubectl=${kubernetes_version}-00 kubelet=${kubernetes_version}-00
  sudo apt-mark hold kubeadm kubelet
  sudo systemctl enable kubelet.service
else
  sudo apt install -y --allow-change-held-packages kubeadm=${kubernetes_version}-00 kubelet=${kubernetes_version}-00
  sudo apt-mark hold kubeadm kubelet
  sudo systemctl enable kubelet.service
fi
}


main () {
  set_kubernetes_cri_config
  kernel_parameter_optimization
  enable_ipvs
  install_containerd
  install_nerdctl
  install_kubeadm_kubelet_or_kubectl
}

main
```

```sh
# Install Master Node
$ bash post_reboot.sh 1.26.3 1.6.20 master
# Install node node
$ bash post_reboot.sh 1.26.3 1.6.20 node
```

```sh
# Check version after installation
root@gitee-kubernetes-master1:/tmp# kubelet --version
Kubernetes v1.26.3
root@gitee-kubernetes-master1:/tmp# kubectl version
WARNING: This version information is deprecated and will be replaced with the output from kubectl version --short.  Use --output=yaml|json to get the full version.
Client Version: version.Info{Major:"1", Minor:"26", GitVersion:"v1.26.3", GitCommit:"9e644106593f3f4aa98f8a84b23db5fa378900bd", GitTreeState:"clean", BuildDate:"2023-03-15T13:40:17Z", GoVersion:"go1.19.7", Compiler:"gc", Platform:"linux/amd64"}
Kustomize Version: v4.5.7
The connection to the server localhost:8080 was refused - did you specify the right host or port?
root@gitee-kubernetes-master1:/tmp# kubeadm version
kubeadm version: &version.Info{Major:"1", Minor:"26", GitVersion:"v1.26.3", GitCommit:"9e644106593f3f4aa98f8a84b23db5fa378900bd", GitTreeState:"clean", BuildDate:"2023-03-15T13:38:47Z", GoVersion:"go1.19.7", Compiler:"gc", Platform:"linux/amd64"}
```

### 4.3 Install haproxy

haproxy is a high-performance load balancing system.

Implement load balancing for 3 apiservers using haproxy.

The following operations are performed on master1, master2, and master3 respectively.

#### Install haproxy

```sh
$ apt -y install haproxy
# When the concurrent access is large enough to exhaust the ports on the server where HAProxy is running, subsequent TCP connections cannot be established to the backend, resulting in load balancing failure.
# Use the following command to add a port number
$ echo 1024 61000 > /proc/sys/net/ipv4/ip_local_port_range
```

#### Configure haproxy

Configure HAProxy on all Master nodes (refer to the official HAProxy documentation for detailed configuration, all Master nodes have the same HAProxy configuration)

```sh
$ sudo cp -rf /etc/haproxy/haproxy.cfg{,.bak}
$ sudo sh -c 'cat > /etc/haproxy/haproxy.cfg << EOF
#---------------------------------------------------------------------
# Global settings
#---------------------------------------------------------------------
global
    log         127.0.0.1 local2
    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon

    stats socket /var/lib/haproxy/stats
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    10s
    timeout queue           1m
    timeout connect         10s
    timeout client          1m
    timeout server          1m
    timeout http-keep-alive 10s
    timeout check           10s
    maxconn                 3000
#---------------------------------------------------------------------
# kubernetes apiserver frontend which proxys to the backends
#---------------------------------------------------------------------
frontend kubernetes-apiserver
    mode                 tcp
    bind                 *:16443
    option               tcplog
    default_backend      kubernetes-apiserver
#---------------------------------------------------------------------
# round robin balancing between the various backends
#---------------------------------------------------------------------
backend kubernetes-apiserver
    mode        tcp
    balance     roundrobin
    server      master01.k8s.io   10.4.145.92:6443 check
    server      master02.k8s.io   10.4.145.129:6443 check
    server      master03.k8s.io   10.4.145.169:6443 check
#---------------------------------------------------------------------
# collection haproxy statistics message
#---------------------------------------------------------------------
listen stats
    mode                 http
    bind                 0.0.0.0:1080
    stats auth           admin:admin
    stats refresh        30s
    stats realm          HAProxy\ Statistics
    stats uri            /haproxy-status
EOF'
```

```sh
$ sudo systemctl enable --now haproxy
```

Enable haproxy logging

```sh
# vim /etc/haproxy/haproxy.cfg

log /var/log/haproxy.log    local0
log /var/log/haproxy.log    local1 notice

# Restart haproxy service for changes to take effect

# Next, make sure the /var/log/haproxy.log file exists and is writable
sudo touch /var/log/haproxy.log
sudo chown syslog:adm /var/log/haproxy.log

# Update the rsyslog configuration to redirect haproxy logs to the specified log file. Edit the file /etc/rsyslog.d/49-haproxy.conf:
vim /etc/rsyslog.d/49-haproxy.conf
local0.* /var/log/haproxy.log
local1.* /var/log/haproxy.log

sudo service rsyslog restart
sudo service haproxy restart

# Now, haproxy will start outputting logs to the /var/log/haproxy.log file. You can use the tail command to view and monitor the contents of the log file:
sudo tail -f /var/log/haproxy.log
```

### 4.4 Install keepalived

keepalived is a very popular server high availability solution. Use keepalived to implement apiserver

The following operations are performed on master1, master2, and master3 respectively.

#### Install keepalived

```sh
$ sudo apt -y install keepalived
```

#### Configure keepalived

master1

```
; vim /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
    router_id k8s
    script_user root
    enable_script_security
}
vrrp_script chk_apiserver {
    script "/etc/keepalived/check_apiserver.sh"
    interval 5
    weight -5
    fall 2
    rise 1
}
vrrp_instance VI_1 {
    state MASTER
    interface enp3s0
    mcast_src_ip 10.4.145.92
    virtual_router_id 99
    priority 101
    advert_int 2
    authentication {
        auth_type PASS
        auth_pass ceb1b3ec013d66163d6ab
    }
    virtual_ipaddress {
        10.4.145.100
    }
    track_script {
       chk_apiserver
    }
}
```

master2

```
; vim /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
    router_id k8s
    script_user root
    enable_script_security
}
vrrp_script chk_apiserver {
    script "/etc/keepalived/check_apiserver.sh"
    interval 5
    weight -5
    fall 2
    rise 1
}
vrrp_instance VI_1 {
    state BACKUP
    interface enp3s0
    mcast_src_ip 10.4.145.129
    virtual_router_id 99
    priority 101
    advert_int 2
    authentication {
        auth_type PASS
        auth_pass ceb1b3ec013d66163d6ab
    }
    virtual_ipaddress {
        10.4.145.100
    }
    track_script {
       chk_apiserver
    }
}
```

master3

```
; vim /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
    router_id k8s
    script_user root
    enable_script_security
}
vrrp_script chk_apiserver {
    script "/etc/keepalived/check_apiserver.sh"
    interval 5
    weight -5
    fall 2
    rise 1
}
vrrp_instance VI_1 {
    state BACKUP
    interface enp3s0
    mcast_src_ip 10.4.145.169
    virtual_router_id 99
    priority 101
    advert_int 2
    authentication {
        auth_type PASS
        auth_pass ceb1b3ec013d66163d6ab
    }
    virtual_ipaddress {
        10.4.145.100
    }
    track_script {
       chk_apiserver
    }
}
```

#### Health Check Script

All Master nodes configure KeepAlived health check file:

```sh
$ cat >/etc/keepalived/check_apiserver.sh<<"EOF"
#!/bin/bash

errorExit () {
  echo "*** $*" 1>&2
  exit 1
}

curl --silent --max-time 2 --insecure https://localhost:6443/ -o /dev/null || errorExit "Error GET https://localhost:6443/"


if ip addr |grep -q 10.4.145.100; then
  curl --silent --max-time 2 --insecure https://10.4.145.100:16443/ -o /dev/null || errorExit "Error GET https://10.4.145.100:16443/"
fi
EOF
$ chmod +x /etc/keepalived/check_apiserver.sh
```

```sh
$ sudo systemctl enable --now keepalived
```

Start haproxy and keepalived:

```sh
$ systemctl daemon-reload
$ systemctl enable --now haproxy
$ systemctl enable --now keepalived
```

If high availability is implemented using HAProxy and KeepAlived, test if the VIP is working properly.

```sh
## Perform Ping Test on All Nodes
$ ping 10.4.145.100 -c 4
PING 10.4.145.100 (10.4.145.100) 56(84) bytes of data.
64 bytes from 10.4.145.100: icmp_seq=1 ttl=64 time=0.076 ms
64 bytes from 10.4.145.100: icmp_seq=2 ttl=64 time=0.072 ms
....


## Test telnet on all nodes
$ telnet 10.4.145.100 16443
Trying 10.4.145.100...
Connected to 10.4.145.100.
Escape character is '^]'.
^]
telnet> quit
Connection closed.
```

If ping is not available and telnet does not appear, the VIP is considered unavailable.

If VIP is not available, further execution should not continue. VIP issues, such as firewall and SELinux, HAProxy and Keepalived status, and whether the listening ports are normal, need to be investigated.

### 4.5 Initializing Master Node

Next, initialize the Master node. It's important to note that only one Master node needs to be initialized, and the remaining Master nodes join using the kubeadm join command.

Initialization command for master1:

#### Command line initialization of k8s

```sh
# kubeadm init --apiserver-advertise-address=192.168.101.21 --control-plane-endpoint=192.168.101.18 --apiserver-bind-port=6443 --kubernetes-version=v1.26.3 --pod-network-cidr=10.200.0.0/16 --service-cidr=10.100.0.0/16 --service-dns-domain=cluster.local --image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers --ignore-preflight-errors=swap
```

#### Initialize k8s based on the init file

Output default configuration to file

```sh
sudo sh -c 'kubeadm config print init-defaults > kubeadm-init.yaml'
sudo cp -rf kubeadm-init.yaml kubeadm-init.yaml.bak
```

**Modified Initialization File Content**

`kubeadm-init.yaml`

```
apiVersion: kubeadm.k8s.io/v1beta3
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: abcdef.0123456789abcdef
  ttl: 24h0m0s
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: 10.4.145.92
  bindPort: 6443
nodeRegistration:
  criSocket: unix:///var/run/containerd/containerd.sock
  imagePullPolicy: IfNotPresent
  name: gitee-kubernetes-master1
  taints:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
---
apiServer:
  certSANs:
  - 10.4.145.100
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controlPlaneEndpoint: 10.4.145.100:16443
controllerManager: {}
dns: {}
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.k8s.io
kind: ClusterConfiguration
kubernetesVersion: v1.26.3
networking:
  dnsDomain: cluster.local
  podSubnet: 10.200.0.0/16
  serviceSubnet: 10.100.0.0/16
scheduler: {}

---
#Specify kubelet usage systemd
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
cgroupDriver: systemd
---
#Specify KubeProxy to use ipvs
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: ipvs
```

File-based execution of k8s master initialization

```sql
root@k8s-master-1:/home/containerd# kubeadm init --upload-certs --config kubeadm-init.yaml
[init] Using Kubernetes version: v1.26.3
[preflight] Running pre-flight checks
        [WARNING Hostname]: hostname "k8s-master" could not be reached
        [WARNING Hostname]: hostname "k8s-master": lookup k8s-master on 10.4.145.142:53: no such host
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [k8s-master kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.1          00.0.1 10.4.145.92 10.4.145.100]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [k8s-master localhost] and IPs [10.4.145.92 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [k8s-master localhost] and IPs [10.4.145.92 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
W1213 03:57:54.577508  182309 endpoint.go:57] [endpoint] WARNING: port specified in controlPlaneEndpoint overrides bindPort in the controlplane address
[kubeconfig] Writing "admin.conf" kubeconfig file
W1213 03:57:54.872731  182309 endpoint.go:57] [endpoint] WARNING: port specified in controlPlaneEndpoint overrides bindPort in the controlplane address
[kubeconfig] Writing "kubelet.conf" kubeconfig file
W1213 03:57:55.062089  182309 endpoint.go:57] [endpoint] WARNING: port specified in controlPlaneEndpoint overrides bindPort in the controlplane address
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
W1213 03:57:55.192987  182309 endpoint.go:57] [endpoint] WARNING: port specified in controlPlaneEndpoint overrides bindPort in the controlplane address
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of the control-plane node running the following command on each as root:

  kubeadm join 10.4.145.100:16443 --token abcdef.0123456789abcdef \
        --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c \
        --control-plane --certificate-key 1ffac4970d53e793a1387ae4356949e8e4255c05574573dca2bd4ec73e369f38

Please note that the certificate-key gives access to cluster sensitive data, keep it secret!
As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use
"kubeadm init phase upload-certs --upload-certs" to reload certs afterward.

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.4.145.100:16443 --token abcdef.0123456789abcdef \
        --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c

```

**According to the instructions, the following actions need to be performed to use the cluster**

```ruby
root@gitee-kubernetes-master1:/tmp# mkdir -p $HOME/.kube
root@gitee-kubernetes-master1:/tmp# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
root@gitee-kubernetes-master1:/tmp# sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 4.6 Install Calico Network

Perform the following operations in the master node, select to use the calico network plugin here

```sh
root@gitee-kubernetes-master1:~/workdir/kubernetes_install/calico# wget https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/calico.yaml


root@gitee-kubernetes-master1:~/workdir/kubernetes_install/calico# cat calico.yaml |grep -A1 CALICO_IPV4POOL_CIDR
            - name: CALICO_IPV4POOL_CIDR
              value: "10.10.0.0/16"
root@gitee-kubernetes-master1:~/workdir/kubernetes_install/calico# kubectl apply -f calico.yaml
poddisruptionbudget.policy/calico-kube-controllers created
serviceaccount/calico-kube-controllers created
serviceaccount/calico-node created
serviceaccount/calico-cni-plugin created
configmap/calico-config created
.....

wget https://github.com/projectcalico/calicoctl/releases/download/v2.0.0/calicoctl
mv calicoctl /usr/bin && chmod +x /usr/bin/calicoctl
export CALICO_DATASTORE_TYPE=kubernetes
export CALICO_KUBECONFIG=~/.kube/config
calicoctl get ippool
NAME                  CIDR
default-ipv4-ippool   10.10.0.0/16
calicoctl get node
```

#### Calico IPIP network usage instructions

[Calico-cni Network Plugin](./Calico-cni.md)

### 4.7 Join the remaining Master nodes

Next, add the master2 and master3 nodes to the control plane of the master nodes.

Perform the following commands on master2 and master3 respectively, where the command for master2 node is as follows:

```sh
kubeadm join 10.4.145.100:16443 --token abcdef.0123456789abcdef \
      --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c \
      --control-plane --certificate-key 1ffac4970d53e793a1387ae4356949e8e4255c05574573dca2bd4ec73e369f38
```

After the command execution is completed, check the status of the Pods in the cluster again, as shown below:

```sh
root@gitee-kubernetes-master1:/home/ubuntu# kubectl get node
NAME                       STATUS   ROLES           AGE    VERSION
gitee-kubernetes-master1   Ready    control-plane   18m    v1.26.3
gitee-kubernetes-master2   Ready    control-plane   111s   v1.26.3
gitee-kubernetes-master3   Ready    control-plane   106s   v1.26.3

root@gitee-kubernetes-master1:/home/ubuntu# kubectl get pod -A
NAMESPACE     NAME                                               READY   STATUS    RESTARTS       AGE
kube-system   calico-kube-controllers-949d58b75-dq9f4            1/1     Running   0              4m48s
kube-system   calico-node-4wxzt                                  1/1     Running   0              2m3s
kube-system   calico-node-74jjs                                  1/1     Running   0              2m12s
kube-system   calico-node-cwqw6                                  1/1     Running   0              4m48s
kube-system   coredns-787d4945fb-gqs9q                           1/1     Running   0              18m
kube-system   coredns-787d4945fb-vtwpv                           1/1     Running   0              18m
kube-system   etcd-gitee-kubernetes-master1                      1/1     Running   4              18m
kube-system   etcd-gitee-kubernetes-master2                      1/1     Running   0              2m1s
kube-system   etcd-gitee-kubernetes-master3                      1/1     Running   0              117s
kube-system   kube-apiserver-gitee-kubernetes-master1            1/1     Running   4              18m
kube-system   kube-apiserver-gitee-kubernetes-master2            1/1     Running   0              114s
kube-system   kube-apiserver-gitee-kubernetes-master3            1/1     Running   1 (117s ago)   116s
kube-system   kube-controller-manager-gitee-kubernetes-master1   1/1     Running   4              18m
kube-system   kube-controller-manager-gitee-kubernetes-master2   1/1     Running   0              2m6s
kube-system   kube-controller-manager-gitee-kubernetes-master3   1/1     Running   0              2m
kube-system   kube-proxy-74k64                                   1/1     Running   0              18m
kube-system   kube-proxy-86tdt                                   1/1     Running   0              2m12s
kube-system   kube-proxy-jf77p                                   1/1     Running   0              2m3s
kube-system   kube-scheduler-gitee-kubernetes-master1            1/1     Running   4              18m
kube-system   kube-scheduler-gitee-kubernetes-master2            1/1     Running   0              2m1s
kube-system   kube-scheduler-gitee-kubernetes-master3            1/1     Running   0              116s
```

You can find that important components like apiserver, controller-manager, etcd, and scheduler are already running on 3 nodes.

At this point, in the statistics report interface of haproxy, it can be seen that all 3 Master nodes have turned green.

- https://haproxy.autom.studio/haproxy-status

4.8 Join worker nodes

Joining a worker node is relatively simple. After installing all the required components such as kubectl, kubelet, and kubeadm in the installation environment, use the command provided by the system during the initialization of master01. In this example, the join command is:

```sh
View token
$ kubeadm token create --print-join-command
kubeadm join 10.4.145.100:16443 --token x7j9gh.fw5mslqrn5w8hjvz --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c

$ kubeadm join 10.4.145.100:16443 --token x7j9gh.fw5mslqrn5w8hjvz --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c
```

## 5. Install common tools

### 5.1 Install kubectl

```sh
root@gitee-sre2:/home/ubuntu# apt-get -y install bash-completion
root@gitee-sre2:/home/ubuntu# curl -SL https://dl.k8s.io/release/v1.26.3/bin/linux/amd64/kubectl -o /usr/bin/kubectl
root@gitee-sre2:/home/ubuntu# chmod 755  /usr/bin/kubectl
root@gitee-sre2:/home/ubuntu# kubectl get nodes
NAME                       STATUS   ROLES           AGE    VERSION
gitee-kubernetes-master1   Ready    control-plane   129m   v1.26.3
gitee-kubernetes-master2   Ready    control-plane   112m   v1.26.3
gitee-kubernetes-master3   Ready    control-plane   112m   v1.26.3
gitee-kubernetes-node01    Ready    <none>          59m    v1.26.3
.....
# kubectl Completion
source /etc/profile.d/bash_completion.sh
echo "source <(kubectl completion bash)" >> ~/.bash_profile
echo "source /usr/share/bash-completion/bash_completion" >> ~/.bash_profile
source ~/.bash_profile

# Shortcuts
cat >> ~/.bashrc <<EOF
alias k=kubectl
complete -o default -F __start_kubectl k
EOF

source  ~/.bashrc
```

### 5.2 Install helm

```sh
# helm
$ wget -c https://repo.huaweicloud.com/helm/v3.8.0/helm-v3.8.0-linux-386.tar.gz
$ tar -zxvf helm-v3.8.0-linux-386.tar.gz
$ cp linux-386/helm /usr/local/bin/
$ chmod a+x  /usr/local/bin/helm
$ chmod 600 ~/.kube/config
$ helm list -A
NAME    NAMESPACE       REVISION        UPDATED STATUS  CHART   APP VERSION

Helm Completion
$ helm completion bash > /etc/bash_completion.d/helm

$ echo "helm completion bash > /etc/bash_completion.d/helm" >>  ~/.bashrc
```

> How to Accelerate?

[DaoCloud/public-binary-files-mirror: Many binary files are overseas. It is slow to download in China and needs acceleration. (github.com)](https://github.com/DaoCloud/public-binary-files-mirror?tab=readme-ov-file)

### 5.3 Kubectx Kubens and fzf

In general, there may be multiple clusters, such as development/testing/production, local or cloud clusters. Kubectx and Kubens can be used to quickly switch between different clusters and namespaces.

In addition, fzf provides an interactive way to switch contexts, so you don't have to remember any clusters or namespaces.

Install dependencies for kubectx and kubens:

```sh
Download kubectx and kubens script files
git clone https://github.com/ahmetb/kubectx.git ~/.kubectx
sudo ln -s ~/.kubectx/kubectx /usr/local/bin/kubectx
sudo ln -s ~/.kubectx/kubens /usr/local/bin/kubens



Configure bash auto-completion
echo 'source ~/.kubectx/completion/kubectx.bash' >> ~/.bash_profile
echo 'source ~/.kubectx/completion/kubens.bash' >> ~/.bash_profile
source ~/.bash_profile
```

kubectx and kubens have been successfully installed.

To install fzf, follow the steps below:

```sh
# 1. Download and install fzf
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install


# 2. Configure bash autocompletion:
echo '[ -f ~/.fzf.bash ] && source ~/.fzf.bash' >> ~/.bashrc
source ~/.bashrc
```

Now, fzf has been successfully installed.

Please note that before installation, make sure that your system has installed git and curl.

5.4 kubectl plugin manager krew

Manually install linux-x86_64

```sh
wget https://github.com/kubernetes-sigs/krew/releases/download/v0.4.4/krew-linux_amd64.tar.gz
tar zxvf krew-linux_amd64.tar.gz ./krew-linux_amd64
./krew-linux_amd64 install krew

Configure environment variables
echo 'export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Using krew

```cmake
kubectl krew search               # Display all plugins
kubectl krew install view-secret # Install the plugin named view-secret
kubectl view-secret # Use this plugin
kubectl krew upgrade              # Upgrade installed plugins
kubectl krew remove view-secret   # Uninstall the plugin
```

### 5.5 kubectl-neat

Project URL: kubectl-neat(opens new window)

Project description: A tool that removes unnecessary information when exporting yaml using kubectl with -o

https://github.com/itaysk/kubectl-neat

Simply download the binary file to /usr/local/bin.

```sh
$ wget "https://github.com/itaysk/kubectl-neat/releases/download/v2.0.3/kubectl-neat_linux_amd64.tar.gz"
$ tar zxvf kubectl-neat_linux_amd64.tar.gz
$ mv kubectl-neat /usr/local/bin/
```

Alternatively, install the following, Go development environment is required

```sh
$ git clone https://github.com/itaysk/kubectl-neat.git
$ cd kubectl-neat
$ go build .
$ mv kubectl-neat /usr/local/bin/
```

## 6. Kubernetes Node Scheduling Plan

{"节点名称"=>"gitee-kubernetes-node13", "ROLES"=>"Amd64/X86", "IP"=>"10.4.145.144", "标签"=>"污点", "备注"=>"redis cluster migration"}
| ----------------------- | ------ | ----------------------------------------------- | ------------------------------ | ------------------------------------------------ | ----------------------------------- |
| master                  | master | 10.4.145.92<br />10.4.145.129<br />10.4.145.169 | node-role.kubernetes.io/master | node-role.kubernetes.io/control-plane:NoSchedule | Master node is not allowed to deploy non-system Pods.
| gitee-kubernetes-node01 | worker | 10.4.145.107
  \                                   | node_role=giteeInternal        | GiteeInternalOnly=yes:NoSchedule
  \                | Internal 标签的 Pod                 |
gitee-kubernetes-node02
gitee-kubernetes-node03
gitee-kubernetes-node04
gitee-kubernetes-node05
| gitee-kubernetes-node06 | worker | 10.4.145.113
| gitee-kubernetes-node07 | worker | 10.4.145.34
  \                                    | node_role=giteeRuby            | GiteeRubyOnly=yes:NoSchedule
  \                    | Ruby 标签的 pod                     |
gitee-kubernetes-node08
| gitee-kubernetes-node09 | worker | 10.4.145.57
  \                                    | node_role=giteeFrontend        | GiteeFrontendOnly=yes:NoSchedule
  \                | Frontend pod                 |
| gitee-kubernetes-node10 | worker | 10.4.145.116
  \                                   | node_role=giteeFrontend        | GiteeFrontendOnly=yes:NoSchedule
  \                | Frontend 标签的 pod                 |
gitee-kubernetes-node11
| gitee-kubernetes-node12 | worker | 10.4.145.123 | node_role=giteeMonitor | No taint | Pod with Monitor label.
gitee-kubernetes-node13
| gitee-kubernetes-node14 | worker | 10.4.145.53
  \                                    | node_role=giteeRuby            | GiteeRubyOnly=yes:NoSchedule
  \                    | Ruby 标签的 pod                     |
gitee-kubernetes-node15

The commands to set tags and taints are as follows:

```sh
# ----------------gitee k8s--------------------------
Set labels
kubectl label nodes gitee-kubernetes-node01 node_role=giteeInternal
kubectl label nodes gitee-kubernetes-node02 node_role=giteeInternal

kubectl label nodes gitee-kubernetes-node03 node_role=giteePubcomm
kubectl label nodes gitee-kubernetes-node04 node_role=giteePubcomm

kubectl label nodes gitee-kubernetes-node05 node_role=giteeRuby
kubectl label nodes gitee-kubernetes-node06 node_role=giteeRuby
kubectl label nodes gitee-kubernetes-node07 node_role=giteeRuby


kubectl label nodes gitee-kubernetes-node09 node_role=giteeFrontend
kubectl label nodes gitee-kubernetes-node10 node_role=giteeFrontend
kubectl label nodes gitee-kubernetes-node11 node_role=giteeFrontend

Monitor nodes
kubectl label nodes gitee-kubernetes-node08 node_role=giteeMonitor
kubectl label nodes gitee-kubernetes-node12 node_role=giteeMonitor



Set taints
kubectl taint nodes gitee-kubernetes-node01 GiteeInternalOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node02 GiteeInternalOnly=yes:NoSchedule

kubectl taint nodes gitee-kubernetes-node03 GiteePubcommOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node04 GiteePubcommOnly=yes:NoSchedule

kubectl taint nodes gitee-kubernetes-node05 GiteeRubyOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node06 GiteeRubyOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node07 GiteeRubyOnly=yes:NoSchedule

kubectl taint nodes gitee-kubernetes-node09 GiteeFrontendOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node10 GiteeFrontendOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node11 GiteeFrontendOnly=yes:NoSchedule

Monitor node without taint
# kubectl taint nodes gitee-kubernetes-node12 GiteeMonitorOnly=yes:NoSchedule


View labels
kubectl get node --show-labels
# View Single Node Tags
kubectl get node gitee-kubernetes-node01 --show-labels|grep giteeInternal
kubectl get node gitee-kubernetes-node02 --show-labels|grep giteeInternal
kubectl get node gitee-kubernetes-node03 --show-labels|grep giteePubcomm
kubectl get node gitee-kubernetes-node04 --show-labels|grep giteePubcomm
....


View taints
kubectl describe nodes gitee-kubernetes-node01|grep -A 5 Taints
kubectl describe nodes gitee-kubernetes-node02|grep -A 5 Taints
kubectl describe nodes gitee-kubernetes-node03|grep -A 5 Taints
kubectl describe nodes gitee-kubernetes-node04|grep -A 5 Taints
....
```

For more operations, refer to the following:

```sh
Kubernetes Advanced Scheduling
############# Taint
Set taints
kubectl taint node 172.18.0.66 GiteeInternalOnly=yes:NoSchedule
kubectl taint node 172.18.0.67 GiteeCronOnly=yes:NoSchedule

View taints
kubectl describe nodes 172.18.0.66|grep -A 5 Taints

Remove taints
kubectl taint node 172.18.0.66 GiteeInternalOnly:NoSchedule-
kubectl taint node 172.18.0.70 GiteeRubyOnly:NoSchedule-
kubectl taint node 172.18.0.68 GiteeFrontendOnly:NoSchedule-
kubectl taint node 172.18.0.69 GiteeFrontendOnly:NoSchedule-

############ Tags
Set labels
kubectl label nodes 172.18.0.66 node_role=giteeInternal
kubectl label nodes 172.18.0.67 node_role=giteeCron
kubectl label nodes 172.18.0.68 node_role=giteeFrontend
kubectl label nodes 172.18.0.69 node_role=giteeFrontend
kubectl label nodes 172.18.0.70 node_role=giteeRuby


View labels
kubectl get node --show-labels
kubectl get node 172.18.0.66 --show-labels|grep giteeInternal
kubectl get node 172.18.0.67 --show-labels|grep gitee

Delete labels
kubectl label nodes 172.18.0.66 node_role-
```

## 7. Deploy Metrics

In newer versions of Kubernetes, metrics collection for system resources is done using Metrics-server, which can collect memory, disk, CPU, and network usage of nodes and pods.

```sh
root@ctrl:~# git clone https://github.com/kubernetes-sigs/metrics-server
root@ctrl:~# vi ./metrics-server/manifests/base/deployment.yaml
.....
.....
 containers:
      - name: metrics-server
        image: gcr.io/k8s-staging-metrics-server/metrics-server:master
        imagePullPolicy: IfNotPresent
        # line 23 : add
        command:
        - /metrics-server
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP
        args:
          - --cert-dir=/tmp
          - --secure-port=10250
          - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
          - --kubelet-use-node-status-port
          - --metric-resolution=15s
      nodeSelector:
        kubernetes.io/os: linux
        node_role: giteePubcomm
      tolerations:
      - key: "GiteePubcommOnly"
        operator: "Equal"
        value: "yes"
        effect: "NoSchedule"
.....
.....


root@ctrl:~# kubectl apply -k ./metrics-server/manifests/base/
serviceaccount/metrics-server created
clusterrole.rbac.authorization.k8s.io/system:aggregated-metrics-reader created
clusterrole.rbac.authorization.k8s.io/system:metrics-server created
rolebinding.rbac.authorization.k8s.io/metrics-server-auth-reader created
clusterrolebinding.rbac.authorization.k8s.io/metrics-server:system:auth-delegator created
clusterrolebinding.rbac.authorization.k8s.io/system:metrics-server created
service/metrics-server created
deployment.apps/metrics-server created
apiservice.apiregistration.k8s.io/v1beta1.metrics.k8s.io created

root@ctrl:~# kubectl get pods -n kube-system
NAME                                       READY   STATUS    RESTARTS        AGE
calico-kube-controllers-59697b644f-fgfqp   1/1     Running   1 (6m30s ago)   23h
calico-node-8hjm5                          1/1     Running   1 (6m15s ago)   23h
calico-node-ck5zq                          1/1     Running   1 (6m11s ago)   23h
calico-node-z8vgs                          1/1     Running   1 (6m30s ago)   23h
coredns-565d847f94-v8v2x                   1/1     Running   1 (6m30s ago)   24h
coredns-565d847f94-zh4rd                   1/1     Running   1 (6m30s ago)   24h
etcd-ctrl.srv.world                        1/1     Running   1 (6m30s ago)   24h
kube-apiserver-ctrl.srv.world              1/1     Running   1 (6m30s ago)   24h
kube-controller-manager-ctrl.srv.world     1/1     Running   1 (6m30s ago)   24h
kube-proxy-9hmsh                           1/1     Running   1 (6m15s ago)   23h
kube-proxy-lnvhj                           1/1     Running   1 (6m30s ago)   24h
kube-proxy-zftff                           1/1     Running   1 (6m11s ago)   23h
kube-scheduler-ctrl.srv.world              1/1     Running   1 (6m30s ago)   24h
metrics-server-6776c5c959-5plm8            1/1     Running   0               88s
# [metrics-server] pod has been deployed
```

Validation

```sh
root@ctrl:~# k top node
NAME                       CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
gitee-kubernetes-master1   359m         4%     1895Mi          5%
gitee-kubernetes-master2   319m         3%     1620Mi          5%
gitee-kubernetes-master3   287m         3%     1491Mi          4%
gitee-kubernetes-node01    137m         0%     900Mi           1%
gitee-kubernetes-node02    117m         0%     939Mi           1%
gitee-kubernetes-node03    126m         0%     959Mi           1%
gitee-kubernetes-node04    150m         0%     1001Mi          1%
.....

root@ctrl:~# k top pod
NAME                                               CPU(cores)   MEMORY(bytes)
calico-kube-controllers-949d58b75-dq9f4            4m           20Mi
calico-node-2t646                                  71m          95Mi
calico-node-4wxzt                                  44m          84Mi
calico-node-5fx6g                                  53m          93Mi
calico-node-74jjs                                  64m          85Mi
calico-node-bfvpk                                  43m          95Mi
calico-node-bv6zm                                  45m          94Mi
.....
```

## 8. Deploy Dashboard

helm deployment

Chart Repository URL

```sh
$ helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
$ helm repo update

Download and install locally
$ helm search repo kubernetes-dashboard/kubernetes-dashboard
NAME                                            CHART VERSION   APP VERSION     DESCRIPTION
kubernetes-dashboard/kubernetes-dashboard       6.0.0           2.7.0           General-purpose web UI for Kubernetes clusters

$ helm pull kubernetes-dashboard/kubernetes-dashboard --version 6.0.0 --untar

$ cat > values-pro.yaml<<EOF
extraArgs:
  - --token-ttl=0
- --system-banner="Welcome to Kubernetes Cluster.
 Russian production environment, be cautious!!!"
service:
  type: NodePort
  nodePort: 30443
# Node Selector
nodeSelector:
  node_role: giteePubcomm
Tolerate taints
tolerations:
- key: "GiteePubcommOnly"
  operator: "Equal"
  value: "yes"
  effect: "NoSchedule"

rbac:
  clusterReadOnlyRole: true
metricsScraper:
  enabled: true
EOF



# deploy
$ helm install kubernetes-dashboard kubernetes-dashboard -f values-pro.yaml --namespace kubernetes-dashboard --create-namespace

NAME: kubernetes-dashboard
LAST DEPLOYED: Thu Feb  9 10:52:32 2023
NAMESPACE: kubernetes-dashboard
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
*********************************************************************************
*** PLEASE BE PATIENT: kubernetes-dashboard may take a few minutes to install ***
*********************************************************************************

Get the Kubernetes Dashboard URL by running:
  export NODE_PORT=$(kubectl get -n kubernetes-dashboard -o jsonpath="{.spec.ports[0].nodePort}" services kubernetes-dashboard)
  export NODE_IP=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")
  echo https://$NODE_IP:$NODE_PORT/
```

Check the deployment status of kubernetes-dashboard

```sh
$ kubectl get pods,svc -n kubernetes-dashboard | grep kubernetes-dashboard
pod/kubernetes-dashboard-5486c8f5bf-xff6r   1/1     Running   0          45s
service/kubernetes-dashboard   NodePort   192.168.48.88   <none>        443:30443/TCP   45s
```

Set login token information

```sh
$ cat >admin.yaml<<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard

---
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: admin-user
  annotations:
    kubernetes.io/service-account.name: "admin-user"
EOF



Create directly:

➜  ~ kubectl apply -f admin.yaml
➜  ~ kubectl get secret -n kubernetes-dashboard|grep admin-token
admin-token-lwmmx                  kubernetes.io/service-account-token   3         1d
➜  ~ kubectl get secret admin-token-lwmmx -o jsonpath={.data.token} -n kubernetes-dashboard |base64 -d
It will generate a long base64-encoded string.


# Alternatively, use the following script
➜  ~cat login-token.sh

#!/bin/bash

kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')

# Get token value for logging in
```

Access the https://node01IP:30443/ to see the login interface.

You can use nginx for reverse proxy, nginx configuration is as follows

`kubernetes-dashboard.conf`

```
upstream kubernetes-dashboard {
    server 10.4.145.107:30443;
    server 10.4.145.32:30443;
    server 10.4.145.79:30443;
    keepalive 32;
}

server {
    listen 80;
    server_name kubernetes-dashboard.autom.studio;
    access_log /var/log/nginx/kubernetes-dashboard_302_access.log main;
    error_log /var/log/nginx/kubernetes-dashboard_302_error.log;
    return 302 https://$server_name$request_uri;
}

server {
    include ssl.d/autom_ssl.conf;
    server_name kubernetes-dashboard.autom.studio;
    access_log /var/log/nginx/kubernetes-dashboard_access.log main;
    error_log /var/log/nginx/kubernetes-dashboard_error.log;

    if ($http_user_agent ~ "MSIE" ) {
        return 303 https://browser-update.org/update.html;
    }

    location / {
        proxy_pass https://kubernetes-dashboard/;
        # Disable cache
        proxy_no_cache 1;
        proxy_cache_bypass 1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

## 9. Cloud-Native Storage Rook

### 9.1 Motivation

{"description"=>"云环境 kubernetes 集群要使用后端存储有很多选择，比如 oss ， nas ， 云盘等。但是有时候我们可能会出于其他各种原因需要自建存储服务器来为 kubernetes 提供存储卷，一般我们都会选择 ceph 存储，但如果使用物理机或者 ecs去部署，需要花费大量人力不说，维护起来也相当割裂，幸好有 rook ceph 这种方案，很好地与云原生环境集成，可以让 ceph 直接跑在 kubernetes集群上，这样一来便可大大方便维护还是管理。"}

### 9.2 Prerequisites

1. In the production environment, at least 3 nodes are needed to be used as OSD nodes for storing data.
Each OSD node must have at least one raw disk for initialization when deploying rook ceph.
3. We are using a higher version of rook ceph, which requires Kubernetes version 1.22 or higher.

| Name          | Information                                                       |
| --------------- | ------------------------------------------------------------------- |
| Node Configuration       | 16c64g 200G SSD *1 500G SSD *1 (one system disk and one ceph metadata) Number of Nodes 3 |
| Kubernetes Cluster | v1.26.0 |
| helm            | v3.8.0                                                              |
| Rook            | v1.13.1                                                             |
| Ceph            | v18.2.1                                                             |
| Mon Component | 3 |
| Mgr Component | 2 |

### 9.3 Deployment

#### K8S Cluster Preparation

Rook 1.13 supports Kubernetes v1.23 or higher versions.

The Kubernetes cluster used in this article is as follows:

```sh
$ kubectl get node
NAME                       STATUS   ROLES           AGE   VERSION
gitee-kubernetes-master1   Ready    control-plane   20d   v1.26.3
gitee-kubernetes-master2   Ready    control-plane   20d   v1.26.3
gitee-kubernetes-master3   Ready    control-plane   20d   v1.26.3
gitee-kubernetes-node01    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node02    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node03    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node04    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node05    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node06    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node07    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node08    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node09    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node10    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node11    Ready    <none>          20d   v1.26.3
gitee-kubernetes-node12    Ready    <none>          20d   v1.26.3
```

Regarding the configuration of the container runtime, the container runtime of this Kubernetes cluster is Containerd.

Note that if the Containerd systemd configuration containerd.service has the `LimitNOFILE=infinity` configuration, there will be issues with the Ceph Mon component when starting the Ceph cluster using Rook. The `ms_dispatch` process will continuously consume 100% CPU. The Rook community has discussed this issue in two ISSUES, ISSUE 11253 (https://github.com/rook/rook/issues/11253) and ISSUE 10110 (https://github.com/rook/rook/issues/10110). It is necessary to set a suitable value for `LimitNOFILE`, and in my case, I have set it to `1048576`.

How to fix?

```bash
$ cat >/etc/systemd/system/containerd.service.d/LimitNOFILE.conf<<EOF
[Service]
LimitNOFILE=1048576
EOF
$ systemctl daemon-reload
$ systemctl restart containerd
```

#### Local Storage Preparation (LVM logical volume)

To configure a Ceph storage cluster, you need at least one of the following local storage options:

- Raw devices (without partition or formatted file system)
- Raw partitions (without formatted file system)
- LVM logical volume (without formatted file system)
- A persistent volume provided in block mode within a storage class.

We will use `LVM logical volume` as the local storage.

gitee-kubernetes-node09~gitee-kubernetes-node11

```sh
# gitee-kubernetes-node09
root@gitee-kubernetes-node09:/home/ubuntu# fdisk -l | grep /dev/vdb
Disk /dev/vdb: 500 GiB, 536870912000 bytes, 1048576000 sectors

# gitee-kubernetes-node10
root@gitee-kubernetes-node10:/home/ubuntu# fdisk -l | grep /dev/vdb
Disk /dev/vdb: 500 GiB, 536870912000 bytes, 1048576000 sectors

# # gitee-kubernetes-node11
root@gitee-kubernetes-node11:/home/ubuntu# fdisk -l | grep /dev/vdb
Disk /dev/vdb: 500 GiB, 536870912000 bytes, 1048576000 sectors
```

> Note: Before performing the following steps, make sure there are no important data on the disk, as these steps will erase all data on the disk.

```sh
# First, create physical volumes
pvcreate /dev/vdb
# Next, create a volume group named ceph
vgcreate ceph /dev/vdb
# Finally, create a logical volume from the ceph volume group using the lvcreate command.
# Created a logical volume named osd using all available space of the ceph volume group
lvcreate -n osd -l 100%FREE ceph

# If you want to specify the specific size of a logical volume, you can use the following command:
# lvcreate -n osd -L 400G ceph

Delete LVM
#yes | lvremove /dev/ceph/osd
#vgremove ceph
#pvremove /dev/vdb
```

Because the local storage required by the Ceph cluster is LVM logical volumes that are not formatted as a file system, be sure not to use 'mkfs.ext4' or 'mkfs.xfs' to format the logical volume.

Finally, check the logical volume:

```sh
$ lvdisplay
  --- Logical volume ---
  LV Path                /dev/ceph/osd
  LV Name                osd
  VG Name                ceph
  LV UUID                cVsDhP-hUtV-7Eoe-XID1-Uvdt-TZ3z-7IEAXG
  LV Write Access        read/write
  LV Creation host, time gitee-kubernetes-node09, 2024-01-02 10:37:19 +0000
  LV Status              available
  # open                 0
  LV Size                <500.00 GiB
  Current LE             127999
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0
```

#### Configure Time Synchronization

Pay attention to setting the time synchronization of each server node, whether this is important, otherwise if the time of each server node is not synchronized, the rook ceph operator may not work properly when operating the ceph mon component.

It is recommended to use chronyd for time synchronization.

#### Install helm

Refer to 5.2 Install helm

#### Deploy Rook Operator

We schedule Ceph's mon, osd, mrg, etc. to gitee-kubernetes-node09,

Label the following 3 nodes with 'role=ceph' and add the taint 'GiteeFrontendOnly=yes:NoSchedule'

```sh
# kubectl label node gitee-kubernetes-node09 role=ceph
# Note: ceph and the frontend server are deployed together
kubectl label node gitee-kubernetes-node09 role=ceph
kubectl label node gitee-kubernetes-node10 role=ceph
kubectl label node gitee-kubernetes-node11 role=ceph

# kubectl taint nodes node4 dedicated=ceph:NoSchedule
kubectl taint nodes gitee-kubernetes-node09 GiteeFrontendOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node10 GiteeFrontendOnly=yes:NoSchedule
kubectl taint nodes gitee-kubernetes-node11 GiteeFrontendOnly=yes:NoSchedule
```

We will deploy the rook ceph operator using the Rook Helm Chart.

Rook currently publishes the built version of Ceph Operator to the release and master channels. The release channel contains the latest stable version of Rook.

```sh
$ helm repo add rook-release https://charts.rook.io/release
$ helm repo update
#$ helm install --create-namespace --namespace rook-ceph rook-ceph rook-release/rook-ceph -f values.yaml
```

Or download the rook-ceph helm chart from https://charts.rook.io/release/rook-ceph-v1.13.1.tgz, and then use the following command to install:

```sh
$ helm pull rook-release/rook-ceph --version v1.13.1 --untar
# $ helm pull rook-release/rook-ceph --version v1.13.1
$ helm install --create-namespace --namespace rook-ceph rook-ceph rook-ceph-v1.13.1.tgz -f values.yaml
```

Regarding the content configured in values.yaml, you can customize it as needed based on the documentation at https://github.com/rook/rook/blob/master/deploy/charts/rook-ceph-cluster/values.yaml.

The following is the current customization I have made, mainly configuring the use of a private image repository address when deploying Rook Operator and Ceph, as well as scheduling related configurations.

`values-prod.yaml`

```yaml
image:
  # -- Image
  repository: rook/ceph
  # -- Image tag
  # @default -- `v1.13.1`
  tag: v1.13.1
  # -- Image pull policy
  pullPolicy: IfNotPresent

tolerations:
  - key: "GiteeFrontendOnly"
    operator: "Equal"
    value: "yes"
    effect: "NoSchedule"

provisionerNodeAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
    nodeSelectorTerms:
      - matchExpressions:
          - key: role
            operator: In
            values:
              - ceph
provisionerTolerations:
  - key: "GiteeFrontendOnly"
    operator: "Equal"
    value: "yes"
    effect: "NoSchedule"
pluginNodeAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
    nodeSelectorTerms:
      - matchExpressions:
          - key: role
            operator: In
            values:
              - ceph
pluginTolerations:
  - key: "GiteeFrontendOnly"
    operator: "Equal"
    value: "yes"
    effect: "NoSchedule"

discover:
  tolerations:
    - key: "GiteeFrontendOnly"
      operator: "Equal"
      value: "yes"
      effect: "NoSchedule"
  nodeAffinity:
    nodeSelectorTerms:
      - matchExpressions:
          - key: role
            operator: In
            values:
              - ceph

admissionController:
  tolerations:
    - key: "GiteeFrontendOnly"
      operator: "Equal"
      value: "yes"
      effect: "NoSchedule"
    - key: "node-role.kubernetes.io/master"
      operator: "Exists"
      effect: "PreferNoSchedule"
  nodeAffinity:
    nodeSelectorTerms:
      - matchExpressions:
          - key: role
            operator: In
            values:
              - ceph
```

Deployment

```sh
$ kubectl create ns rook-ceph
$ cd rook-ceph
$ helm install -n rook-ceph rook-ceph -f values-prod.yaml .
```

After the deployment is complete, confirm that rook-ceph-operator is started normally:

```sh
$ kubectl get pods -n rook-ceph -l "app=rook-ceph-operator"
NAME                                  READY   STATUS    RESTARTS   AGE
rook-ceph-operator-5bb7fbf69c-hn785   1/1     Running   0          64s
```

#### Create Ceph cluster

##### Reference Documentation

Rook documentation focuses on starting Rook in various environments. When creating a Ceph cluster, customization can be considered based on the example cluster manifest below:

- [cluster.yaml](https://github.com/rook/rook/blob/release-1.12/deploy/examples/cluster.yaml): Cluster settings for the production cluster running on bare metal. Requires at least three worker nodes.
- [cluster-on-pvc.yaml](https://github.com/rook/rook/blob/release-1.12/deploy/examples/cluster-on-pvc.yaml): Cluster setup for a production cluster running in a dynamic cloud environment.
- cluster-test.yaml: Used for cluster settings in the test environment (such as minikube).

For more detailed information, refer to Ceph example configuration

Rook Ceph Operator has been deployed and running successfully, and we can now create a Ceph cluster using 'cluster.yaml'.

##### Create Cluster

```sh
$ git clone --single-branch --branch v1.13.1 https://github.com/rook/rook.git
```

Based on [cluster-prod.yaml](https://github.com/rook/rook/blob/release-1.12/deploy/examples/cluster.yaml), customize our own cluster.yaml. Here are the modifications that only include cluster.yaml:

```yaml
apiVersion: ceph.rook.io/v1
kind: CephCluster
metadata:
  name: rook-ceph
  namespace: rook-ceph
spec:
  cephVersion:
    image: quay.io/ceph/ceph:v18.2.1
  mon:
    count: 3
    allowMultiplePerNode: false
  mgr:
    count: 2
    allowMultiplePerNode: false
    modules:
      - name: pg_autoscaler
        enabled: true
  dashboard:
    enabled: true
    ssl: false
  storage:
    useAllNodes: true
    useAllDevices: true
    devices:
      - name: /dev/ceph/osd
    config:
      osdsPerDevice: "1"
    onlyApplyOSDPlacement: false

  placement:
    all:
      nodeAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
          nodeSelectorTerms:
            - matchExpressions:
                - key: role
                  operator: In
                  values:
                    - ceph
      podAffinity:
      podAntiAffinity:
      topologySpreadConstraints:
      tolerations:
        - key: "GiteeFrontendOnly"
          operator: "Equal"
          value: "yes"
          effect: "NoSchedule"
        - key: "node-role.kubernetes.io/master"
          operator: "Exists"
          effect: "PreferNoSchedule"
```

Because the local storage of the Ceph cluster will use the previously created unformatted file system's LVM logical volume, the logical volume we created is named `osd`, belongs to the volume group `ceph`, and has the path `/dev/ceph/osd`.

Rook started supporting the use of LVM logical volumes as local storage from version 1.9. The implementation code for this is in the PR https://github.com/rook/rook/pull/7967. The documentation in the CephCluster CRD (https://rook.io/docs/rook/v1.13/CRDs/Cluster/ceph-cluster-crd/) is not very detailed on how to use logical volumes for storage. Based on the implementation code in the PR, the current configuration requires specifying `spec.storage.devices[].name` in the CephCluster resource definition as `/dev/disk/by-id/dm-name-<vgName>-<lvName>`.

Therefore, the value of `devices[].name` in the `spec.storage` section of our cluster.yaml configuration is `/dev/disk/by-id/dm-name-ceph-osd`.

Create Ceph Cluster:

```sh
$ kubectl create -f cluster-prod.yaml
cephcluster.ceph.rook.io/rook-ceph created
```

Verify if the cluster is running by inspecting the pods in the rook-ceph namespace.

```sh
$ kubectl get pod
NAME                                                              READY   STATUS      RESTARTS       AGE
csi-cephfsplugin-8l9t7                                            2/2     Running     1 (112s ago)   2m26s
csi-cephfsplugin-provisioner-76bfc9dcd9-42zjb                     5/5     Running     0              15m
csi-cephfsplugin-provisioner-76bfc9dcd9-jfpxt                     5/5     Running     0              15m
csi-cephfsplugin-vvjb9                                            2/2     Running     0              15m
csi-rbdplugin-provisioner-56f7bf6d4d-kr6vq                        5/5     Running     0              15m
csi-rbdplugin-provisioner-56f7bf6d4d-wjgcn                        5/5     Running     0              15m
csi-rbdplugin-r5qsw                                               2/2     Running     1 (112s ago)   2m26s
csi-rbdplugin-slgs2                                               2/2     Running     0              15m
rook-ceph-crashcollector-gitee-kubernetes-node09-748dd9c59wpldm   1/1     Running     0              19h
rook-ceph-crashcollector-gitee-kubernetes-node10-765b7b857xxbds   1/1     Running     0              19h
rook-ceph-crashcollector-gitee-kubernetes-node11-6fbb8b47bmrdzs   1/1     Running     0              19h
rook-ceph-exporter-gitee-kubernetes-node09-5d5db7d54f-4hhlj       1/1     Running     0              19h
rook-ceph-exporter-gitee-kubernetes-node10-75c4755979-jsqsd       1/1     Running     0              19h
rook-ceph-exporter-gitee-kubernetes-node11-5f6744dd9b-m7ktj       1/1     Running     0              19h
rook-ceph-mgr-a-587ff77854-t96j8                                  2/2     Running     0              19h
rook-ceph-mgr-b-578f895c7b-l2hqd                                  2/2     Running     0              19h
rook-ceph-mon-a-84589c6b44-6rlv7                                  1/1     Running     0              19h
rook-ceph-mon-b-664b5fc9cf-9wv82                                  1/1     Running     0              19h
rook-ceph-mon-c-648796588d-x9zkf                                  1/1     Running     0              19h
rook-ceph-operator-5bb7fbf69c-5r2cq                               1/1     Running     0              20h
rook-ceph-osd-0-ddff98578-v2vzr                                   1/1     Running     0              19h
rook-ceph-osd-1-85b7486f99-9x5k6                                  1/1     Running     0              19h
rook-ceph-osd-2-55dbd68f47-9lh95                                  1/1     Running     0              19h
rook-ceph-osd-prepare-gitee-kubernetes-node09-l29rj               0/1     Completed   0              95s
rook-ceph-osd-prepare-gitee-kubernetes-node10-js8tx               0/1     Completed   0              98s
rook-ceph-osd-prepare-gitee-kubernetes-node11-p92dn               0/1     Completed   0              91s
rook-ceph-tools-5996f89559-b4tch                                  1/1     Running     0              18h
```

The number of OSD pods depends on the number of nodes in the cluster and the number of configured devices. For the default cluster.yaml mentioned above, an OSD will be created for each available device found on each node.

If there are any issues during the creation process, you can check the logs of the `rook-ceph-operator` Pod.

To re-run the `rook-ceph-osd-prepare-<nodename>` Job, scan for available local storage to add OSD, you can run the following command:

```sh
# Delete old jobs
$ kubectl get job -n rook-ceph | awk '{system("kubectl delete job "$1" -n rook-ceph")}'
# Restart operator
$ kubectl rollout restart deploy rook-ceph-operator  -n rook-ceph
```

To determine if each OSD on a node can be successfully added, pay attention to the logs of the 'rook-ceph-osd-prepare-<nodename>' Job corresponding to the Pod.

#### Verify Cluster Status

To verify the health status of the cluster, Rook Toolbox is required.](https://rook.io/docs/rook/v1.13/Troubleshooting/ceph-toolbox/)

```sh
$ kubectl apply -f https://raw.githubusercontent.com/rook/rook/release-1.13/deploy/examples/toolbox.yaml

$ kubectl get po -n rook-ceph | grep rook-ceph-tools
rook-ceph-tools-68b98695bb-gh76t                  1/1     Running     0             23s
```

> 注: 当前 release-1.13/deploy/examples/toolbox.yaml
  中的 Ceph 镜像还是 v17.2.6，可以手动修改成 v18.2.1 还需加上污点容忍和亲和性

```sh
      nodeSelector:
        role: ceph
      tolerations:
        - key: "node.kubernetes.io/unreachable"
          operator: "Exists"
          effect: "NoExecute"
          tolerationSeconds: 5
        - key: "GiteeFrontendOnly"
          operator: "Equal"
          value: "yes"
          effect: "NoSchedule"
```

Connect to the toolbox and run the command `ceph status`:

```sh
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
Or as follows
$ kubectl -n rook-ceph exec -it $(kubectl -n rook-ceph get pod -l "app=rook-ceph-tools" -o jsonpath='{.items[0].metadata.name}') -- bash
```

The following are the verification points for health status:

- All monitor (mon) nodes should be in quorum state.
- A manager (mgr) node should be in an active state.
- At least three OSD nodes should be online and available

If the health status is not HEALTH_OK, you should investigate the reasons for warnings or errors.

```sh
bash-4.4$ ceph status
  cluster:
    id:     80acf00a-a7e1-40fe-b6c2-30f546e519bb
    health: HEALTH_OK

  services:
    mon: 3 daemons, quorum a,b,c (age 71m)
    mgr: a(active, since 68m), standbys: b
    osd: 3 osds: 3 up (since 70m), 3 in (since 70m)

  data:
    pools:   1 pools, 1 pgs
    objects: 2 objects, 449 KiB
    usage:   80 MiB used, 1.5 TiB / 1.5 TiB avail
    pgs:     1 active+clean

bash-4.4$ ceph osd status
ID  HOST                      USED  AVAIL  WR OPS  WR DATA  RD OPS  RD DATA  STATE
 0  gitee-kubernetes-node10  26.7M   499G      0        0       0        0   exists,up
 1  gitee-kubernetes-node09  26.7M   499G      0        0       0        0   exists,up
 2  gitee-kubernetes-node11  26.7M   499G      0        0       0        0   exists,up

bash-4.4$ ceph df
--- RAW STORAGE ---
CLASS     SIZE    AVAIL    USED  RAW USED  %RAW USED
hdd    1.5 TiB  1.5 TiB  80 MiB    80 MiB          0
TOTAL  1.5 TiB  1.5 TiB  80 MiB    80 MiB          0

--- POOLS ---
POOL  ID  PGS   STORED  OBJECTS     USED  %USED  MAX AVAIL
.mgr   1    1  449 KiB        2  1.3 MiB      0    475 GiB


bash-4.4$ ceph osd tree
ID  CLASS  WEIGHT   TYPE NAME                         STATUS  REWEIGHT  PRI-AFF
-1         1.46489  root default
-5         0.48830      host gitee-kubernetes-node09
 1    hdd  0.48830          osd.1                         up   1.00000  1.00000
-3         0.48830      host gitee-kubernetes-node10
 0    hdd  0.48830          osd.0                         up   1.00000  1.00000
-7         0.48830      host gitee-kubernetes-node11
 2    hdd  0.48830          osd.2                         up   1.00000  1.00000

bash-4.4$ rados df
POOL_NAME       USED  OBJECTS  CLONES  COPIES  MISSING_ON_PRIMARY  UNFOUND  DEGRADED  RD_OPS       RD  WR_OPS       WR  USED COMPR  UNDER COMPR
.mgr         1.3 MiB        2       0       6                   0        0         0     192  288 KiB     133  1.3 MiB         0 B          0 B
replicapool   12 KiB        1       0       3                   0        0         0       0      0 B       0      0 B         0 B          0 B

total_objects    3
total_used       81 MiB
total_avail      1.5 TiB
total_space      1.5 TiB

```

From the output, it can be seen that the cluster is in normal state, with 3 mons, 2 mgrs, and 3 osds deployed in the cluster.

Check the storage pools in the current cluster:

```sh
bash-4.4$ ceph osd lspools
1 .mgr
```

You can see that there is only one storage pool named `.mgr` in the current cluster. This indicates that only the default management pool (mgr pool) has been created in this Ceph cluster, which is a special pool used to store management and monitoring-related data.

Query commands related to the toolbox

```
ceph status
ceph osd status
ceph df
rados df
ceph osd lspools
```

#### Ceph Dashboard

Ceph Dashboard can be used to view the status of the cluster. A Ceph cluster deployed with Rook has Ceph Dashboard enabled by default.

![](https://blog.frognew.com/images/2023/09/ceph-v18-dashboard.png)

`rook-ceph-mgr-dashboard` is its Service in the Kubernetes cluster.

```sh
$ kubectl get svc rook-ceph-mgr-dashboard -n rook-ceph
NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
rook-ceph-mgr-dashboard   ClusterIP   10.100.133.87   <none>        7000/TCP   73m
```

It can be exposed through Ingress or by creating a NodePort Service [dashboard-external-http](https://github.com/rook/rook/blob/master/deploy/examples/dashboard-external-http.yaml).

```sh
$ kubectl get svc  -n rook-ceph
NAME                                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)             AGE
rook-ceph-exporter                      ClusterIP   10.100.135.90    <none>        9926/TCP            75m
rook-ceph-mgr                           ClusterIP   10.100.15.109    <none>        9283/TCP            75m
rook-ceph-mgr-dashboard                 ClusterIP   10.100.133.87    <none>        7000/TCP            75m
rook-ceph-mgr-dashboard-external-http   NodePort    10.100.213.184   <none>        7000:32396/TCP      33s
rook-ceph-mon-a                         ClusterIP   10.100.29.79     <none>        6789/TCP,3300/TCP   76m
rook-ceph-mon-b                         ClusterIP   10.100.73.21     <none>        6789/TCP,3300/TCP   75m
rook-ceph-mon-c                         ClusterIP   10.100.159.142   <none>        6789/TCP,3300/TCP   75m
```

The name of the Ceph Dashboard admin user can be checked with the following command:

```sh
$ kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo
```

### 9.4 Use Storage - Service Persistence

Ceph provides three types of storage interfaces: Block, Shared Filesystem, and Object.

The following demonstrates how to use these three types of storage for a Ceph cluster deployed and managed by Rook.

Using Rook to use Ceph provides three storage types and their purposes as follows:

- Block storage (Block) is used to provide ReadWriteOnce (RWO) storage for a single Pod.
- CephFS Shared Filesystem is suitable for shared read-write (RWX) storage between multiple Pods.
- Object storage provides storage that can be accessed through the S3 endpoint of an internal or external Kubernetes cluster.

![](https://mmbiz.qpic.cn/mmbiz_png/bd4WXH8wjhlHKsrr5E8rxpD8qyeqr1ZrQ3jb8bqZFLpgZe7EdvqWOgib19aI9gWFfn0lHus6jlUFK10vnibDr4Jg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### 9.4.1 Block Storage

```shell
Block storage is a data storage technology that writes data to disks or other storage media in units called blocks. Block storage is commonly used in environments such as servers, data centers, and cloud computing to store large-scale datasets.

A block storage system is typically composed of one or more block storage devices, which can be disks, solid-state drives (SSDs), or other storage media. Block storage devices usually have high-speed read and write capabilities and high reliability. Each block storage device has a controller that is responsible for managing read and write operations on the block device and replicating data blocks to multiple devices to improve fault tolerance and data redundancy.

The main advantages of block storage are high-speed read-write capabilities, high reliability, and data redundancy. Block storage devices can quickly read and write data, and can automatically handle operations such as data replication, backup, and recovery. Additionally, block storage devices have a high level of fault tolerance and reliability as they can replicate data across multiple devices and switch to other devices automatically in case of device failure.

Block storage systems are typically used to store large-scale datasets such as databases, file systems, cloud computing platforms, etc. They are also used to store critical data such as server operating systems, applications, and data warehouses.

1: Alibaba Cloud: EBS
2: Tencent Cloud: CBS
3：Ceph：RBD
......

I believe everyone has also used cloud storage. So what can cloud storage do? Of course, our RBD can do the same things, such as snapshot backup, incremental backup, kernel driver, etc., all of which are supported.
```

**Block storage allows a single Pod to mount storage.**

This guide explains how to create a simple multi-tier web application on Kubernetes using the persistent volumes enabled by Rook.

##### 9.4.1.1 RBD storage supply

Before Rook can provide storage, you need to create StorageClass and CephBlockPool.

This example requires at least 1 OSD per node, and each OSD needs to be on 3 different nodes. Each OSD must be on a different node because `failureDomain` is set to `host` and `replicated.size` is set to 3.

Use directly

Use the `rook/deploy/examples/csi/rbd/storageclass.yaml` file to create CephBlockPool storage pool and StorageClass dynamic storage volumes.

Or create the `storageclass.yaml` file below:

```yaml
apiVersion: ceph.rook.io/v1
kind: CephBlockPool
metadata:
  name: replicapool
  namespace: rook-ceph
spec:
  failureDomain: host
  replicated:
    size: 3
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: rook-ceph-block
# Change "rook-ceph" provisioner prefix to match the operator namespace if needed
provisioner: rook-ceph.rbd.csi.ceph.com
parameters:
  # clusterID is the namespace where the rook cluster is running
  clusterID: rook-ceph
  # Ceph pool into which the RBD image shall be created
  pool: replicapool

  imageFormat: "2"
  imageFeatures: layering

  csi.storage.k8s.io/provisioner-secret-name: rook-csi-rbd-provisioner
  csi.storage.k8s.io/provisioner-secret-namespace: rook-ceph
  csi.storage.k8s.io/controller-expand-secret-name: rook-csi-rbd-provisioner
  csi.storage.k8s.io/controller-expand-secret-namespace: rook-ceph
  csi.storage.k8s.io/node-stage-secret-name: rook-csi-rbd-node
  csi.storage.k8s.io/node-stage-secret-namespace: rook-ceph
  csi.storage.k8s.io/fstype: ext4

reclaimPolicy: Delete

allowVolumeExpansion: true
```

This storageclass.yaml file contains the definition of StorageClass 'rook-ceph-block' and CephBlockPool 'replicapool'.

If you have deployed the Rook Operator in a namespace other than 'rook-ceph', please change the prefix in the 'provisioner' field to match the namespace you are using. For example, if the Rook Operator is running in the 'my-namespace' namespace, the value of the provisioner should be 'my-namespace.rbd.csi.ceph.com'.

Next, create this StorageClass and CephBlockPool.

```sh
$ kubectl apply -f storageclass.yaml
cephblockpool.ceph.rook.io/replicapool created
storageclass.storage.k8s.io/rook-ceph-block created
```

> According to Kubernetes specifications, when using the "Retain" reclaim policy, any PersistentVolume

When creating a CephBlockPool resource named 'replicapool', it will automatically create a storage pool with the same name in the Ceph cluster.

This operation is performed by the Ceph Operator. If the storage pool is not created, you can check the Ceph Operator logs to identify the problem.

```sh
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
bash-4.4$ ceph osd lspools
1 .mgr
2 replicapool
```

The output above indicates that the storage pool 'replicapool' has been created.

Set Ceph as the default storage volume

```sh
[root@k8s-master1 ~]# kubectl patch storageclass rook-ceph-block -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

After modification, check the status of StorageClass (**with a default flag**).

```
$ kubectl get sc
NAME                        PROVISIONER                  RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
rook-ceph-block (default)   rook-ceph.rbd.csi.ceph.com   Delete          Immediate           true                   2m5s
```

##### 9.4.1.2 Use Storage

`rook/deploy/examples/csi/rbd/pvc.yaml`

```
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rbd-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: rook-ceph-block
```

To view Kubernetes PVC (Persistent Volume Claim), run the following command:

```sh
$ kubectl get pvc
NAME      STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
rbd-pvc   Bound    pvc-f6fa10da-9e2e-4ca1-aec2-0a1b9b457f86   1Gi        RWO            rook-ceph-block   8m55s
```

View the created persistent volumes:

```sh
$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM               STORAGECLASS      REASON   AGE
pvc-f6fa10da-9e2e-4ca1-aec2-0a1b9b457f86   1Gi        RWO            Delete           Bound    rook-ceph/rbd-pvc   rook-ceph-block            11m
```

View specific information of one persistent volume:

```sh
$ kubectl describe pv pvc-f6fa10da-9e2e-4ca1-aec2-0a1b9b457f86
Name:            pvc-f6fa10da-9e2e-4ca1-aec2-0a1b9b457f86
Labels:          <none>
Annotations:     pv.kubernetes.io/provisioned-by: rook-ceph.rbd.csi.ceph.com
                 volume.kubernetes.io/provisioner-deletion-secret-name: rook-csi-rbd-provisioner
                 volume.kubernetes.io/provisioner-deletion-secret-namespace: rook-ceph
Finalizers:      [kubernetes.io/pv-protection]
StorageClass:    rook-ceph-block
Status:          Bound
Claim:           rook-ceph/rbd-pvc
Reclaim Policy:  Delete
Access Modes:    RWO
VolumeMode:      Filesystem
Capacity:        1Gi
Node Affinity:   <none>
Message:
Source:
    Type:              CSI (a Container Storage Interface (CSI) volume source)
    Driver:            rook-ceph.rbd.csi.ceph.com
    FSType:            ext4
    VolumeHandle:      0001-0009-rook-ceph-0000000000000003-487f0510-6c2c-4a39-8198-3c411598a777
    ReadOnly:          false
    VolumeAttributes:      clusterID=rook-ceph
                           imageFeatures=layering
                           imageFormat=2
                           imageName=csi-vol-487f0510-6c2c-4a39-8198-3c411598a777
                           journalPool=replicapool
                           pool=replicapool
                           storage.kubernetes.io/csiProvisionerIdentity=1704334037395-4473-rook-ceph.rbd.csi.ceph.com
Events:                <none>
```

Check the rbd images in the storage pool replicapool:

```sh
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
bash-4.4$ rbd ls -p replicapool
csi-vol-487f0510-6c2c-4a39-8198-3c411598a777
```

We create a Pod example application using block storage provided by Rook.

`rook/deploy/examples/csi/rbd/pod.yaml`

```yml
---
apiVersion: v1
kind: Pod
metadata:
  name: csirbd-demo-pod
spec:
  containers:
    - name: web-server
      image: nginx
      volumeMounts:
        - name: mypvc
          mountPath: /var/lib/www/html
  volumes:
    - name: mypvc
      persistentVolumeClaim:
        claimName: rbd-pvc
        readOnly: false
```

```sh
$ kubectl apply -f pod.yaml
pod/csirbd-demo-pod created

$ kubectl get pod csirbd-demo-pod
NAME              READY   STATUS    RESTARTS   AGE
csirbd-demo-pod   1/1     Running   0          2m1s
```

Or directly create a transient pod

```sh
$ kubectl apply -f pod-ephemeral.yaml
pod/csi-rbd-demo-ephemeral-pod created

$ cat pod-ephemeral.yaml
kind: Pod
apiVersion: v1
metadata:
  name: csi-rbd-demo-ephemeral-pod
spec:
  containers:
    - name: web-server
      image: docker.io/library/nginx:latest
      volumeMounts:
        - mountPath: "/myspace"
          name: mypvc
  volumes:
    - name: mypvc
      ephemeral:
        volumeClaimTemplate:
          spec:
            accessModes: ["ReadWriteOnce"]
            storageClassName: "rook-ceph-block"
            resources:
              requests:
                storage: 1Gi
$ kubectl get pod csi-rbd-demo-ephemeral-pod
NAME                         READY   STATUS    RESTARTS   AGE
csi-rbd-demo-ephemeral-pod   1/1     Running   0          14s
```

Check the rbd images in the storage pool replicapool:

```
$ rbd ls -p replicapool
csi-vol-487f0510-6c2c-4a39-8198-3c411598a777
csi-vol-75a8fa65-83b7-469e-baa2-5856fc96721e
```

##### 9.4.1.3 PVC Snapshot - Block Storage Snapshot

The purpose of snapshotclass:

Like StorageClass, it provides a way to manage the supply of volumes. VolumeSnapshotClass also provides a way to manage volume snapshots.

Kubernetes 1.19 and above require a separate installation of the Snapshot Controller to enable PVC snapshot functionality. Therefore, it is installed in advance. If the version is below 1.19, it is not necessary to install it separately.

Installation method is as follows:

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/deploy/kubernetes/snapshot-controller/rbac-snapshot-controller.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/deploy/kubernetes/snapshot-controller/setup-snapshot-controller.yaml
```

Reference: [I get an error when deploying an existing snapshotclass.yaml. · Issue #6819 · rook/rook (github.com)](https://github.com/rook/rook/issues/6819)

[Ceph Docs (rook.github.io)](https://rook.github.io/docs/rook/v1.5/ceph-csi-snapshot.html)

File location: rook/deploy/examples/csi/rbd/snapshotclass.yaml

Creation

```sh
$ kubectl create -f snapshotclass.yaml
volumesnapshotclass.snapshot.storage.k8s.io/csi-rbdplugin-snapclass created
```

Content: Actually, it is through parameters to specify the information of the snapshot resource provided. Managed through the snapshot.storage.k8s.io/v1 API interface.

```sh
cat csi/rbd/snapshotclass.yaml
---
# 1.17 <= K8s <= v1.19
# apiVersion: snapshot.storage.k8s.io/v1beta1
# K8s >= v1.20
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: csi-rbdplugin-snapclass
driver: rook-ceph.rbd.csi.ceph.com # driver:namespace:operator
parameters:
  # Specify a string that identifies your cluster. Ceph CSI supports any
  # unique string. When Ceph CSI is deployed by Rook use the Rook namespace,
  # for example "rook-ceph".
  clusterID: rook-ceph # namespace:cluster
  csi.storage.k8s.io/snapshotter-secret-name: rook-csi-rbd-provisioner
  csi.storage.k8s.io/snapshotter-secret-namespace: rook-ceph # namespace:cluster
deletionPolicy: Delete
```

###### Create Snapshot

Before creating a snapshot, we add some content to the volume that needs to be snapshotted for later data validation.

Add an nginx homepage data in the web-0-pvc pod for testing purposes later.

Create Test Containers and PVC

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  ports:
    - port: 80
      name: web
  selector:
    app: nginx
  type: ClusterIP

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: web-0-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: rook-ceph-block

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 80
              name: web
          volumeMounts:
            - name: www
              mountPath: /usr/share/nginx/html
      volumes:
        - name: www
          persistentVolumeClaim:
            claimName: web-0-pvc
```

```sh
$ k apply -f deployment-pvc-restore.yaml
service/nginx created
persistentvolumeclaim/web-0-pvc created

$  k get pvc web-0-pvc
NAME        STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
web-0-pvc   Bound    pvc-1a93a247-e78c-4d6e-838f-929a520d1343   1Gi        RWO            rook-ceph-block   73s

$ k exec -it pod/web-54c59df478-znqpp -n rook-ceph -- bash
root@web-54c59df478-znqpp:/# cd /usr/share/nginx/html/
root@web-54c59df478-znqpp:/usr/share/nginx/html# echo "this is pvc snapshot rbd test!" > index.html
root@web-54c59df478-znqpp:/usr/share/nginx/html# ls -l
total 20
-rw-r--r-- 1 root root    31 Jan  4 06:50 index.html
drwx------ 2 root root 16384 Jan  4 06:35 lost+found
root@web-54c59df478-znqpp:/usr/share/nginx/html# exit
```

Modified the `index.html` file, next, we will create a snapshot

snapsho defines a type called VolumeSnapshot, which comes from an existing PVC. Note that PVC
  is distinguished by namespace, so it must be in the same namespace, otherwise it cannot be Bound.

`snapshot.yaml`

```
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: rbd-pvc-snapshot
spec:
  volumeSnapshotClassName: csi-rbdplugin-snapclass
  source:
    persistentVolumeClaimName: web-0-pvc
```

```sh
$ k get pvc -n rook-ceph
NAME               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
web-0-pvc          Bound    pvc-1a93a247-e78c-4d6e-838f-929a520d1343   1Gi        RWO            rook-ceph-block   118s

$ k apply -f snapshot.yaml
volumesnapshot.snapshot.storage.k8s.io/rbd-pvc-snapshot created

# View snapshots, READYTOUSE must be true to be considered successful
$ kubectl get VolumeSnapshot -n rook-ceph
NAME               READYTOUSE   SOURCEPVC   SOURCESNAPSHOTCONTENT   RESTORESIZE   SNAPSHOTCLASS             SNAPSHOTCONTENT                                    CREATIONTIME   AGE
rbd-pvc-snapshot   true         web-0-pvc                           1Gi           csi-rbdplugin-snapclass   snapcontent-7cecab7b-297f-4899-8046-4813f08b58b6   3s             5s
```

###### Specify Snapshot Creation PVC

`pvc-restore.yaml`

```yaml
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rbd-pvc-restore
spec:
  storageClassName: rook-ceph-block
  dataSource:
    name: rbd-pvc-snapshot
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Note: When specifying a snapshot to create PVC, the following conditions need to be met:
>
> 1. In the same namespace;
>
> 2. The storage size must be less than or equal to the size of the snapshot. Otherwise, it cannot be bound.

```sh
$ kubectl create -f pvc-restore.yaml -n rook-ceph
persistentvolumeclaim/rbd-pvc-restore created

$ kubectl get pvc
NAME               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
rbd-pvc-restore    Bound    pvc-84e3a64e-3740-406e-ae30-38f57312cbc9   1Gi        RWO            rook-ceph-block   14s
web-0-pvc          Bound    pvc-1a93a247-e78c-4d6e-838f-929a520d1343   1Gi        RWO            rook-ceph-block   9m41s

```

###### Data validation

`restore-nginx.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress-restore
  namespace: rook-ceph
  labels:
    app: wordpress
    tier: frontend
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
        - image: nginx
          name: nginx
          volumeMounts:
            - name: wordpress-persistent-storage-restore
              mountPath: /var/www/html
      volumes:
        - name: wordpress-persistent-storage-restore
          persistentVolumeClaim:
            claimName: rbd-pvc-restore
```

Mount the previously created PVC to the pod by creating an nginx.

```sh
$ kubectl create -f restore-nginx.yaml -n rook-ceph
```

```sh
$  k get pod
web-54c59df478-znqpp                                              1/1     Running     0               20m
wordpress-restore-69bb6c76b8-zmb87                                1/1     Running     0               21s
$ k exec pod/web-54c59df478-znqpp -- cat /usr/share/nginx/html/index.html
this is pvc snapshot rbd test!

$ k exec pod/wordpress-restore-69bb6c76b8-zmb87 -- cat /var/www/html/index.html
this is pvc snapshot rbd test!
```

From the above, it can be seen that the data is OK.

Mount point for web-0: /usr/share/nginx/html/

Mount point for wordproess-restore: /var/www/html/

Because the data of the snapshot is also directly mounted to the PVC, the data is directly stored in the mount point of the PVC.

##### 9.4.1.4 PVC dynamic resizing

Expansion Requirement

- PVC expansion for file sharing type requires k8s 1.15+
Block storage type PVC expansion requires k8s 1.16+

PVC expansion requires enabling 'ExpandCSIVolumes'. The latest version of Kubernetes has already enabled this feature by default. You can check if your Kubernetes version has already enabled this feature.

```sh
$ kube-apiserver -h|grep ExpandCSIVolumes
```

If default is true, this feature does not need to be enabled. If default is false, this feature needs to be enabled.

- The storage class must also support dynamic scaling `allowVolumeExpansion: true`

```yaml
$ kubectl get sc rook-cephfs -o yaml
allowVolumeExpansion: true
apiVersion: storage.k8s.io/v1
kind: StorageClass
```

###### Scaling operation

Before scaling, PVC has a capacity of 1GB.

```sh
$ kubectl get pvc -n rook-ceph
NAME               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
web-0-pvc          Bound    pvc-1a93a247-e78c-4d6e-838f-929a520d1343   1Gi        RWO            rook-ceph-block   28m

$ root@gitee-sre2:/home/ubuntu# k exec -it pod/web-54c59df478-znqpp -n rook-ceph -- bash
root@web-54c59df478-znqpp:/# df -Th
Filesystem     Type     Size  Used Avail Use% Mounted on
overlay        overlay  194G   15G  180G   8% /
tmpfs          tmpfs     64M     0   64M   0% /dev
tmpfs          tmpfs     32G     0   32G   0% /sys/fs/cgroup
/dev/vda1      ext4     194G   15G  180G   8% /etc/hosts
shm            tmpfs     64M     0   64M   0% /dev/shm
/dev/rbd0      ext4     974M   28K  958M   1% /usr/share/nginx/html
tmpfs          tmpfs     63G   12K   63G   1% /run/secrets/kubernetes.io/serviceaccount
tmpfs          tmpfs     32G     0   32G   0% /proc/acpi
tmpfs          tmpfs     32G     0   32G   0% /proc/scsi
tmpfs          tmpfs     32G     0   32G   0% /sys/firmware
```

After Scaling

```sh
$ kubectl edit pvc/web-0-pvc -n rook-ceph
persistentvolumeclaim/web-0-pvc edited

$ kubectl get pv,pvc -n rook-ceph
NAME                                                        CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                        STORAGECLASS      REASON   AGE
persistentvolume/pvc-0375f153-0f61-4e0e-93fd-c0caafc9f22c   2Gi        RWX            Delete           Bound    rook-ceph/busybox-data-pvc   rook-cephfs                83m
persistentvolume/pvc-1a93a247-e78c-4d6e-838f-929a520d1343   2Gi        RWO            Delete           Bound    rook-ceph/web-0-pvc          rook-ceph-block            33m

NAME                                     STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
persistentvolumeclaim/busybox-data-pvc   Bound    pvc-0375f153-0f61-4e0e-93fd-c0caafc9f22c   2Gi        RWX            rook-cephfs       83m
persistentvolumeclaim/web-0-pvc          Bound    pvc-1a93a247-e78c-4d6e-838f-929a520d1343   2Gi        RWO            rook-ceph-block   33m

$ k exec -it pod/web-54c59df478-znqpp -n rook-ceph -- bash
root@web-54c59df478-znqpp:/# df -Th
Filesystem     Type     Size  Used Avail Use% Mounted on
overlay        overlay  194G   15G  180G   8% /
tmpfs          tmpfs     64M     0   64M   0% /dev
tmpfs          tmpfs     32G     0   32G   0% /sys/fs/cgroup
/dev/vda1      ext4     194G   15G  180G   8% /etc/hosts
shm            tmpfs     64M     0   64M   0% /dev/shm
/dev/rbd0      ext4     2.0G   28K  2.0G   1% /usr/share/nginx/html
tmpfs          tmpfs     63G   12K   63G   1% /run/secrets/kubernetes.io/serviceaccount
tmpfs          tmpfs     32G     0   32G   0% /proc/acpi
tmpfs          tmpfs     32G     0   32G   0% /proc/scsi
tmpfs          tmpfs     32G     0   32G   0% /sys/firmware
root@web-54c59df478-znqpp:/#
```

##### 9.4.1.5 PVC Clone

PVC cloning is similar to PVC snapshot

Create a test environment

```sh
$ k apply -f deployment-pvc-restore.yaml
service/nginx created
persistentvolumeclaim/web-0-pvc created
deployment.apps/web created

$ k get pv,pvc
NAME                                                        CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                        STORAGECLASS      REASON   AGE
persistentvolume/pvc-0375f153-0f61-4e0e-93fd-c0caafc9f22c   2Gi        RWX            Delete           Bound    rook-ceph/busybox-data-pvc   rook-cephfs                87m
persistentvolume/pvc-7568c98a-0225-4db0-9e88-d5ea27925440   1Gi        RWO            Delete           Bound    rook-ceph/web-0-pvc          rook-ceph-block            5s

NAME                                     STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
persistentvolumeclaim/busybox-data-pvc   Bound    pvc-0375f153-0f61-4e0e-93fd-c0caafc9f22c   2Gi        RWX            rook-cephfs       87m
persistentvolumeclaim/web-0-pvc          Bound    pvc-7568c98a-0225-4db0-9e88-d5ea27925440   1Gi        RWO            rook-ceph-block   5s

```

`pvc-clone.yaml`

```
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rbd-pvc-clone
spec:
  storageClassName: rook-ceph-block
  dataSource:
    name: web-0-pvc
    kind: PersistentVolumeClaim
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

```sh
$ k apply -f pvc-clone.yaml
persistentvolumeclaim/rbd-pvc-clone created

$ k get pvc
NAME               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
busybox-data-pvc   Bound    pvc-0375f153-0f61-4e0e-93fd-c0caafc9f22c   2Gi        RWX            rook-cephfs       89m
rbd-pvc-clone      Bound    pvc-d3466f64-639b-4720-b094-064121b9ed6b   1Gi        RWO            rook-ceph-block   2s
web-0-pvc          Bound    pvc-7568c98a-0225-4db0-9e88-d5ea27925440   1Gi        RWO            rook-ceph-block   115s
```

**Note:**

**1. Cloning can only be done within the same namespace;**

**2. The size of the cloned pvc must be less than or equal to the size of the original**

#### 9.4.2 CephFS shared file system

CephFS file system storage (also known as shared file system) can be mounted with read/write access from multiple Pods. This can be very useful for applications that can be clustered using a shared file system.

Starting from Pacific version (Ceph 16), Ceph supports multiple file systems.

```shell
1: Characteristics of RBD:
RBD block storage can only be used by a single VM or a single pod, cannot be shared by multiple VMs or pods at the same time, if there is a shared storage requirement for VMs or pods, CephFS should be used.

2: NAS Network Attached Storage: Multiple clients accessing simultaneously
	1：EFS
	2：NAS
	3：CFS

3: CephFS Features:
1: POSIX-compliant semantics
Separates metadata from data (data contains the actual data and metadata contains the information about the data)
3: Dynamic rebalancing
4: Subdirectory snapshots
5: Configurable striping
6: Kernel driver support
    7: FUSE support (user-space level mounting)
8: NFS/CIFS deployable (shared via NFS/CIFS for use)
9: Use with Hadoop (replace HDFS)
```

##### 9.4.2.1 Create CephFilesystem

Create a file system by specifying the required settings for metadata pool, data pools, and metadata server in the `CephFilesystem` CRD.

Here, we create a metadata pool with 3 replicas and a data pool with 3 replicas. For more options, please refer to the [documentation for creating a shared file system](https://rook.io/docs/rook/v1.11/CRDs/Shared-Filesystem/ceph-filesystem-crd/).

Create the following filesystem.yaml file:

```yaml
apiVersion: ceph.rook.io/v1
kind: CephFilesystem
metadata:
  name: myfs
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

Rook Ceph Operator will create all the pools and other resources required to start the service. This may take some time to complete.

```sh
$ kubectl create -f filesystem.yaml
```

Make sure the file system is configured and wait for the mds Pod to start:

```sh
$ kubectl -n rook-ceph get pod -l app=rook-ceph-mds
NAME                                   READY   STATUS    RESTARTS   AGE
rook-ceph-mds-myfs-a-9cc6945cf-tvv9x   1/1     Running   0          44s
rook-ceph-mds-myfs-b-b988647d4-spmh5   1/1     Running   0          42s
```

To check the detailed status of the file system, enter the Rook toolbox and use 'ceph status' to view it. Confirm that the output includes the status of the MDS service. In this example, there is an active MDS instance and a standby MDS instance for failover.

```sh
bash-4.4$ ceph -s
  cluster:
    id:     80acf00a-a7e1-40fe-b6c2-30f546e519bb
    health: HEALTH_OK

  services:
    mon: 3 daemons, quorum a,b,c (age 20h)
    mgr: a(active, since 20h), standbys: b
    mds: 1/1 daemons up, 1 hot standby
    osd: 3 osds: 3 up (since 20h), 3 in (since 20h)

  data:
    volumes: 1/1 healthy
    pools:   4 pools, 81 pgs
    objects: 39 objects, 3.7 MiB
    usage:   149 MiB used, 1.5 TiB / 1.5 TiB avail
    pgs:     81 active+clean

  io:
    client:   852 B/s rd, 1 op/s rd, 0 op/s wr
```

Use 'ceph osd lspools' to check and confirm the creation of the 'myfs-metadata' and 'myfs-replicated' storage pools.

```sh
bash-4.4$ ceph osd lspools
1 .mgr
3 replicapool
4 myfs-metadata
5 myfs-replicated
```

##### 9.4.2.2 CephFS Storage Provisioning

Before Rook starts providing CephFS storage, a StorageClass needs to be created based on the file system. This is necessary for Kubernetes to interact with the CSI driver to create persistent volumes.

Save the following storage class definition as storageclass.yaml file:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: rook-cephfs
# Change "rook-ceph" provisioner prefix to match the operator namespace if needed
provisioner: rook-ceph.cephfs.csi.ceph.com # driver:namespace:operator
parameters:
  # clusterID is the namespace where the rook cluster is running
  # If you change this namespace, also change the namespace below where the secret namespaces are defined
  clusterID: rook-ceph # namespace:cluster

  # CephFS filesystem name into which the volume shall be created
  fsName: myfs

  # Ceph pool into which the volume shall be created
  # Required for provisionVolume: "true"
  pool: myfs-replicated

  # The secrets contain Ceph admin credentials. These are generated automatically by the operator
  # in the same namespace as the cluster.
  csi.storage.k8s.io/provisioner-secret-name: rook-csi-cephfs-provisioner
  csi.storage.k8s.io/provisioner-secret-namespace: rook-ceph # namespace:cluster
  csi.storage.k8s.io/controller-expand-secret-name: rook-csi-cephfs-provisioner
  csi.storage.k8s.io/controller-expand-secret-namespace: rook-ceph # namespace:cluster
  csi.storage.k8s.io/node-stage-secret-name: rook-csi-cephfs-node
  csi.storage.k8s.io/node-stage-secret-namespace: rook-ceph # namespace:cluster

  # (optional) The driver can use either ceph-fuse (fuse) or ceph kernel client (kernel)
  # If omitted, default volume mounter will be used - this is determined by probing for ceph-fuse
  # or by setting the default mounter explicitly via --volumemounter command-line argument.
  # mounter: kernel
reclaimPolicy: Delete
allowVolumeExpansion: true
mountOptions:
  # uncomment the following line for debugging
  #- debug
```

If you have deployed the Rook Operator in a namespace different from 'rook-ceph', modify the prefix in the provisioner to match the namespace you are using.

For example, if the Rook Operator is running in the 'rook-op' namespace, then the value of the provisioner should be 'rook-op.rbd.csi.ceph.com'.

Create a storage class:

```sh
$ kubectl create -f storageclass.yaml
storageclass.storage.k8s.io/rook-cephfs created

$ kubectl get sc rook-cephfs
NAME          PROVISIONER                     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
rook-cephfs   rook-ceph.cephfs.csi.ceph.com   Delete          Immediate           true                   4m39s
```

##### 9.4.2.3 About quotas

CephFS CSI driver enforces requested PVC size using quotas. CephFS quotas are supported only in newer Linux kernels, at least version 4.17.

##### 9.4.2.4 Using storage: Mounting multiple Pods

Create the following busybox.yaml:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: busybox-data-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 2Gi
  storageClassName: rook-cephfs

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: busybox
spec:
  replicas: 2
  selector:
    matchLabels:
      app: busybox
  template:
    metadata:
      labels:
        app: busybox
    spec:
      containers:
        - name: busybox-container
          image: busybox:stable-glibc
          command: ["sleep", "3600"]
          volumeMounts:
            - name: data-volume
              mountPath: /data
      volumes:
        - name: data-volume
          persistentVolumeClaim:
            claimName: busybox-data-pvc
```

Create the deployment and pvc for this busybox:

```sh
$ kubectl apply -f busybox.yaml
persistentvolumeclaim/busybox-data-pvc created
deployment.apps/busybox created
```

View the created PVC and automatically provisioned PV:

```sh
$ kubectl get pvc
NAME                               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
busybox-data-pvc                   Bound    pvc-38fe93c8-c55b-4e18-b955-15a09dc45943   2Gi        RWX            rook-cephfs       21s

$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                                        STORAGECLASS      REASON   AGE
pvc-38fe93c8-c55b-4e18-b955-15a09dc45943   2Gi        RWX            Delete           Bound    rook-ceph/busybox-data-pvc                   rook-cephfs                25s
```

View specific information of PV:

```sh
$ kubectl describe pv pvc-38fe93c8-c55b-4e18-b955-15a09dc45943
Name:            pvc-38fe93c8-c55b-4e18-b955-15a09dc45943
Labels:          <none>
Annotations:     pv.kubernetes.io/provisioned-by: rook-ceph.cephfs.csi.ceph.com
                 volume.kubernetes.io/provisioner-deletion-secret-name: rook-csi-cephfs-provisioner
                 volume.kubernetes.io/provisioner-deletion-secret-namespace: rook-ceph
Finalizers:      [kubernetes.io/pv-protection]
StorageClass:    rook-cephfs
Status:          Bound
Claim:           rook-ceph/busybox-data-pvc
Reclaim Policy:  Delete
Access Modes:    RWX
VolumeMode:      Filesystem
Capacity:        2Gi
Node Affinity:   <none>
Message:
Source:
    Type:              CSI (a Container Storage Interface (CSI) volume source)
    Driver:            rook-ceph.cephfs.csi.ceph.com
    FSType:
    VolumeHandle:      0001-0009-rook-ceph-0000000000000001-4f7108ef-5d3e-4763-b429-f2437c2db4c2
    ReadOnly:          false
    VolumeAttributes:      clusterID=rook-ceph
                           fsName=myfs
                           pool=myfs-replicated
                           storage.kubernetes.io/csiProvisionerIdentity=1704338799133-1100-rook-ceph.cephfs.csi.ceph.com
                           subvolumeName=csi-vol-4f7108ef-5d3e-4763-b429-f2437c2db4c2
                           subvolumePath=/volumes/csi/csi-vol-4f7108ef-5d3e-4763-b429-f2437c2db4c2/81a009f7-8e8c-471a-ae4c-4caf1b898e6d
Events:                <none>
```

Is Ceph_openebs used for production environments?

#### 9.4.3 Object Storage

TODO

Reference articles

[Deploying and managing Ceph cluster automatically using Rook | Frognew (frognew.com)](https://blog.frognew.com/2023/06/rook-quick-start.html)

## 10. Backup Cloud-Native Applications Using the Open-Source Tool Velero

## FQA

### Uninstall and redeploy rook-ceph

```sh
#First: Uninstall the chart.
$ helm uninstall -n rook-ceph rook-ceph
$ helm -n rook-ceph uninstall rook-ceph-cluster


#Second: Delete the remains secrets and configmaps:
$ k -n rook-ceph get cm,secrets
NOTE: If they still remain, use k -n rook-ceph edit cm/NAME and delete the finalizer from it, save, and quit.


#Third: Delete the Rook Resources itself:
$ k -n rook-ceph delete CephObjectStore ceph-objectstore
$ k -n rook-ceph delete CephFilesystem ceph-filesystem
$ k -n rook-ceph delete CephBlockPool ceph-blockpool
$ k -n rook-ceph delete CephBlockPool rook-ceph

#Fourth: Delete the Rook CRDs:
kubectl delete -f rook/deploy/examples/crds.yaml
NOTE: If they still remain, use the below command:
# Or use the following
for CRD in $(kubectl get crd -n rook-ceph | awk '/ceph.rook.io/ {print $1}'); do
    kubectl get -n rook-ceph "$CRD" -o name | \
    xargs -I {} kubectl patch -n rook-ceph {} --type merge -p '{"metadata":{"finalizers": []}}'
done

# If unable to delete, use the following
kubectl patch crd/NAME -p '{"metadata":{"finalizers":[]}}' --type=merge


# Finally: Delete /var/lib/rook on every worker node.
sudo rm -rf /var/lib/rook
```

### Test Data Cleanup

If Rook is to be continued to use, only the created deploy, pod, pvc need to be cleaned. Afterwards, it can be put into use directly.

#### Data deletion steps

Data cleaning steps:

1. First, clean up the mounted PVC and Pod, which may involve cleaning up separately created Pod and Deployment or other advanced resources.
2. After cleaning up PVC, clean up all PVCs created through ceph StorageClass, and it is best to check if PVs are cleaned up
3. Then clean up the snapshot: `kubectl delete volumesnapshot XXXXXXXX`
4. Clean up the created Pool, including block storage and file storage

```sh
$ kubectl delete -n rook-ceph cephblockpool replicapool
$ kubectl delete -n rook-ceph cephfilesystem myfs
```

- Clean up StorageClass:

```sh
$ kubectl delete sc rook-ceph-block rook-cephfs
```

- Cleaning up Ceph cluster:

```
kubectl -n rook-ceph delete cephcluster rook-ceph
```

- Deleting Rook resources:

```sh
$ kubectl delete -f operator.yaml
$ kubectl delete -f common.yaml
$ kubectl delete -f crds.yaml
```

1.如果卡住需要参考 Rook 的[troubleshooting](https://rook.io/docs/rook/v1.6/ceph-teardown.html#troubleshooting)

```sh
for CRD in $(kubectl get crd -n rook-ceph | awk '/ceph.rook.io/ {print $1}');
do
	kubectl get -n rook-ceph "$CRD" -o name |   xargs -I {} kubectl patch {} --type merge -p '{"metadata":{"finalizers": [null]}}' -n rook-ceph;
done
```

2. Clean up data directory and disk

Reference link: https://rook.io/docs/rook/v1.6/ceph-teardown.html#delete-the-data-on-hosts

Reference link: https://rook.io/docs/rook/v1.6/ceph-teardown.html

```sh
kubectl -n rook-ceph patch configmap rook-ceph-mon-endpoints --type merge -p '{"metadata":{"finalizers": [null]}}'
kubectl -n rook-ceph patch secrets rook-ceph-mon --type merge -p '{"metadata":{"finalizers": [null]}}'
```

#### Delete ceph pool storage pool

```sh
kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
bash-4.4$ ceph fs status
myfs - 0 clients
====
RANK  STATE   MDS  ACTIVITY  DNS  INOS  DIRS  CAPS
 0    failed
      POOL         TYPE     USED  AVAIL
 myfs-metadata   metadata  1632k   474G
myfs-replicated    data       0    474G
bash-4.4$ ceph fs set myfs down true
myfs marked down.

bash-4.4$ ceph fs status
myfs - 0 clients
====
RANK  STATE   MDS  ACTIVITY  DNS  INOS  DIRS  CAPS
 0    failed
      POOL         TYPE     USED  AVAIL
 myfs-metadata   metadata  1632k   474G
myfs-replicated    data       0    474G

bash-4.4$ ceph fs rm myfs --yes-i-really-mean-it
bash-4.4$ ceph fs status
bash-4.4$ ceph osd pool ls
.mgr
replicapool
myfs-metadata
myfs-replicated

bash-4.4$ ceph osd pool delete myfs-metadata myfs-metadata --yes-i-really-really-mean-it
pool 'myfs-metadata' removed

bash-4.4$ ceph osd pool delete myfs-replicated myfs-replicated --yes-i-really-really-mean-it
pool 'myfs-replicated' removed

bash-4.4$ ceph fs status
bash-4.4$ ceph -s
```

Reference

[4.12. Delete Ceph File System Using Command Line Interface Red Hat Ceph Storage 4 | Red Hat Customer Portal](https://access.redhat.com/documentation/zh-cn/red_hat_ceph_storage/4/html/file_system_guide/removing-a-ceph-file-system-using-the-command-line-interface_fs#doc-wrapper)

#### Delete rbd hard disk

```sh
bash-4.4$ rbd ls -p replicapool
csi-vol-5e4e1cd5-d889-4705-9575-c65f0e0b4d01

bash-4.4$ rbd rm replicapool/csi-vol-5e4e1cd5-d889-4705-9575-c65f0e0b4d01
Removing image: 100% complete...done.
```

'#### ceph cluster reports 'daemons have recently crashed' issue handling'

The reason for this problem is that when data is balanced or rolled back, a daemon crashes and is not archived in time, causing alarms in the cluster.



2. Solution

```sh
$ ceph crash ls
$ ceph crash archive <id>
OR
$ ceph crash archive-all
```

3. Check Cluster Status

```sh
$ ceph -s
```



Reference documentation

rook's GitHub address: https://github.com/rook/rook

[Quickstart - Rook Ceph Documentation](https://rook.io/docs/rook/latest/Getting-Started/quickstart/#create-a-ceph-cluster)

[Rook 1.13 Deployment Guide: Deploying and Managing Ceph with Rook 1.13 (Reef)

[Deploying and managing Ceph cluster automatically using Rook | Frognew (frognew.com)](https://blog.frognew.com/2023/06/rook-quick-start.html)

"[Rook Cloud-Native Storage - Layzer - 博客园 (cnblogs.com)](https://www.cnblogs.com/layzer/articles/rook_notes.html)"

kubernetes application-rook ceph cluster deployment - coke without ice (isekiro.com)

Kubernetes Install Rook-ceph 1.3.11 - Flowing Year Dizzy Time - Blog Park

"Deploying Ceph Cluster with Rook on Existing Kubernetes Cluster (https://www.cnblogs.com/bixiaoyu/p/16135309.html)"

[【Original】K8S uses ceph-csi persistent storage RBD - wsjhk - 博客园 (cnblogs.com)](https://www.cnblogs.com/wsjhk/p/13710569.html)

[Advanced Kubernetes: Rook for Cloud-Native Storage - Skyflask - Cnblogs (cnblogs.com)](https://www.cnblogs.com/skyflask/p/16844097.html#_caption_8)

Install rook-ceph in k8s cluster - Hello Hello 111111 - Blog Park (cnblogs.com)

[Helm3 通过 Rook 安装 Ceph 集群 | Mr.Pu 个站博客 (putianhui.cn)](https://www.putianhui.cn/posts/07bbf6bfd606/)

Ceph Common Command Explanation - Mr.Pu Blog

[Deploying Ceph with Rook v1.11.2 Operator - 简书 (jianshu.com)](https://www.jianshu.com/p/87a006bca19b)

Kuberntes 云原生实战六 使用 Rook 搭建 Ceph 集群-阿里云开发者社区 (aliyun.com)