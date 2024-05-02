# Решение для развертывания высокой доступности для кластеров Kubernetes.

## 1. Принцип высокой доступности кластера Kubernetes

В кластере Kubernetes есть два основных типа узлов: главные и рабочие.

Мастер-узел — это узел управления всем кластером Kubernetes, который получает внешние команды и поддерживает состояние кластера.

Если главный узел выйдет из строя, отеряет управление весь кластер. Основными службами, работающими на главном узле, являются apiserver, etcd, планировщик и диспетчер-контроллер.

Рабочие узлы выполняют в основном вычислительные задачи и запускают основные сервисы, такие как kubelet и kube-proxy. В случае сбоя рабочего узла Kubernetes запланирует поды на другие рабочие узлы, не влияя на всю работу кластера, и даже влияние на систему приложений будет минимальным.

Таким образом, высокая доступность кластера Kubernetes в основном относится к высокой доступности главного узла.

## 2. Основная информация о сервере


Роль узла
| ------------------------------ | --------- | ---------------- | ---------------------------------------------------- | ------------ | -------- | ----------------- | -------------------------------------------------- |
| gitee-kubernetes-master1       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G        | 10.4.145.92  | v1.26.0  | containerd=1.6.20 | VIP：10.4.145.100                                  |
| gitee-kubernetes-master2       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G        | 10.4.145.129 | v1.26.0  | containerd=1.6.20 | VIP：10.4.145.100                                  |
| gitee-kubernetes-master3       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G        | 10.4.145.169 | v1.26.0  | containerd=1.6.20 | VIP：10.4.145.100                                  |
| gitee-kubernetes-node01~node15 | Amd64/X86 |
  Ubuntu 20.04 LTS | VCPU: 16C
Память: 64ГБ
Системный диск: 200ГБ
 | Пропуск |

## 3. Проектирования сети кластера Kubernetes

| Сеть | Диапазон CIDR | Примечания |
| ------------ | ------------- | -------------------------------------- |
| Капсульная сеть | 10.200.0.0/16 | Кластер может вместить до 65534 модулей |
| Сервисная сеть | 10.100.0.0/16 | Используется для обнаружения сервисов и балансировки нагрузки внутри кластера.
| сегмент сети колено | 10.10.0.0/16 | Пересылка между хостами достигается посредством настройки маршрута на хосте. |

> - Сетевой прокси: ipvs
>
> - Компонент CNI: **сетевой компонент Calico** Ссылка: сеть k8s Сеть Calico
>
> - DNS-домен — `cluster.local`. Этот домен является доменом DNS по умолчанию для Kubernetes и используется для разрешения записей DNS для служб и модулей Kubernetes.
>
> Примечание
Сегмент хост-сети, сегмент сети службы K8s и сегмент сети Pod не могут перекрываться.

## 4. Установка в среде высокой доступности

### 4.1 Подготовка среды установки

Для плавного развертывания Kubernetes необходимо выполнить некоторую работу по настройке, которая была интегрирована в следующий скрипт:

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

### 4.2 Установка главного узла

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

### 4.3 Установка haproxy

haproxy — это высокопроизводительная система балансировки нагрузки.

Реализуйте балансировку нагрузки для 3-х апсерверов с помощью haproxy.

Следующие операции выполняются на master1, master2 и master3 соответственно.

#### Установите haproxy

```sh
$ apt -y install haproxy
# When the concurrent access is large enough to exhaust the ports on the server where HAProxy is running, subsequent TCP connections cannot be established to the backend, resulting in load balancing failure.
# Use the following command to add a port number
$ echo 1024 61000 > /proc/sys/net/ipv4/ip_local_port_range
```

#### Настроика haproxy

Настройте HAProxy на всех главных узлах (подробную настройку см. в официальной документации HAProxy, все главные узлы имеют одинаковую конфигурацию HAProxy)

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

Включить ведение журнала haproxy

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

### 4.4 Установка поддержки активности

Keepalived — очень популярное решение для обеспечения высокой доступности серверов. Используйте Keepalived для реализации API-сервера

Следующие операции выполняются на master1, master2 и master3 соответственно.

#### Установка поддержки активности

```sh
$ sudo apt -y install keepalived
```

#### Настройка keepalived

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

#### Скрипт проверки работоспособности

Все главные узлы настраивают файл проверки работоспособности KeepAlived:

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

Запустите haproxy и keepalived:

```sh
$ systemctl daemon-reload
$ systemctl enable --now haproxy
$ systemctl enable --now keepalived
```

Если высокая доступность реализована с помощью HAProxy и KeepAlived, проверьте, правильно ли работает VIP.

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

Если пинг недоступен и telnet не отображается, VIP считается недоступным.

Если VIP недоступен, дальнейшее выполнение не должно продолжаться. Необходимо изучить проблемы VIP, такие как брандмауэр и статус SELinux, HAProxy и Keepalived, а также исправность портов прослушивания.

### 4.5 Инициализация главного узла

Затем инициализируйте главный узел. Важно отметить, что необходимо инициализировать только один главный узел, а остальные главные узлы присоединяются с помощью команды kubeadm join.

Команда инициализации для master1:

#### Инициализация k8s из командной строки

```sh
# kubeadm init --apiserver-advertise-address=192.168.101.21 --control-plane-endpoint=192.168.101.18 --apiserver-bind-port=6443 --kubernetes-version=v1.26.3 --pod-network-cidr=10.200.0.0/16 --service-cidr=10.100.0.0/16 --service-dns-domain=cluster.local --image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers --ignore-preflight-errors=swap
```

#### Инициализируем k8s на основе файла инициализации

Вывод конфигурации по умолчанию в файл

```sh
sudo sh -c 'kubeadm config print init-defaults > kubeadm-init.yaml'
sudo cp -rf kubeadm-init.yaml kubeadm-init.yaml.bak
```

**Измененное содержимое файла инициализации**

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

Инициализация k8s

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

**Согласно инструкции, для использования кластера необходимо выполнить следующие действия**

```ruby
root@gitee-kubernetes-master1:/tmp# mkdir -p $HOME/.kube
root@gitee-kubernetes-master1:/tmp# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
root@gitee-kubernetes-master1:/tmp# sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 4.6 Установка сети Calico

Выполните следующие операции на главном узле, используйте сетевой плагин Calico.

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

#### Инструкции по использованию сети Calico IPIP

[Сетевой плагин Calico-cni](./Calico-cni.md)

### 4.7 Присоединяйтесь к остальным мастер-узлам

Затем добавьте узлы master2 и master3 в плоскость управления главных узлов.

Выполните следующие команды на master2 и master3 соответственно, где команда для узла master2 выглядит следующим образом:

```sh
kubeadm join 10.4.145.100:16443 --token abcdef.0123456789abcdef \
      --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c \
      --control-plane --certificate-key 1ffac4970d53e793a1387ae4356949e8e4255c05574573dca2bd4ec73e369f38
```

После завершения выполнения команды еще раз проверьте состояние подов в кластере, как показано ниже:

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

Вы можете увидеть, что важные компоненты, такие как apiserver, контроллер-менеджер, планировщи и т. д. уже работают на трех узлах.

На этом этапе в интерфейсе статистического отчета haproxy видно, что все 3 главных узла стали зелеными.

- https://haproxy.autom.studio/haproxy-status

4.8 Присоединение к рабочим узлам

Присоединиться к рабочему узлу просто. После установки в среду всех необходимых компонентов, таких как kubectl, kubelet и kubeadm, используйте команду, предоставленную системой во время инициализации master01. В этом примере команда соединения:

```sh
View token
$ kubeadm token create --print-join-command
kubeadm join 10.4.145.100:16443 --token x7j9gh.fw5mslqrn5w8hjvz --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c

$ kubeadm join 10.4.145.100:16443 --token x7j9gh.fw5mslqrn5w8hjvz --discovery-token-ca-cert-hash sha256:e0138c2df859fb695753e13273372da733144e7dc95634a20b49f42c5b36e76c
```

## 5. Установите общие инструменты

### 5.1 Установите kubectl

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

### 5.2 Установите helm

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

> Как ускорить?

[DaoCloud/public-binary-files-mirror: Многие бинарные файлы находятся за границей. В Китае загружается медленно и требует ускорения. (github.com)](https://github.com/DaoCloud/public-binary-files-mirror?tab=readme-ov-file)

### 5.3 Kubectx Kubens и fzf

Как правило, может существовать несколько кластеров, таких как кластеры разработки/тестирования/производства, локальные или облачные кластеры. Kubectx и Kubens можно использовать для быстрого переключения между различными кластерами и пространствами имен.

Кроме того, fzf предоставляет интерактивный способ переключения контекстов, поэтому вам не нужно запоминать какие-либо кластеры или пространства имен.

Установите зависимости для kubectx и kubens:

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

kubectx и kubens были успешно установлены.

Чтобы установить fzf, выполните следующие действия:

```sh
# 1. Download and install fzf
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install


# 2. Configure bash autocompletion:
echo '[ -f ~/.fzf.bash ] && source ~/.fzf.bash' >> ~/.bashrc
source ~/.bashrc
```

Теперь fzf успешно установлен.

Перед установкой убедитесь, что в вашей системе установлены git и curl.

5.4 Менеджер плагинов kubectl krew

Установите Linux-x86_64 вручную.

```sh
wget https://github.com/kubernetes-sigs/krew/releases/download/v0.4.4/krew-linux_amd64.tar.gz
tar zxvf krew-linux_amd64.tar.gz ./krew-linux_amd64
./krew-linux_amd64 install krew

Configure environment variables
echo 'export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Использование команды

```cmake
kubectl krew search               # Display all plugins
kubectl krew install view-secret # Install the plugin named view-secret
kubectl view-secret # Use this plugin
kubectl krew upgrade              # Upgrade installed plugins
kubectl krew remove view-secret   # Uninstall the plugin
```

### 5.5 kubectl-neat

URL проекта: kubectl-neat(откроется в новом окне)

Описание проекта: Инструмент, удаляющий ненужную информацию при экспорте yaml с помощью kubectl с -o

https://github.com/itaysk/kubectl-neat

Просто загрузите двоичный файл в /usr/local/bin.

```sh
$ wget "https://github.com/itaysk/kubectl-neat/releases/download/v2.0.3/kubectl-neat_linux_amd64.tar.gz"
$ tar zxvf kubectl-neat_linux_amd64.tar.gz
$ mv kubectl-neat /usr/local/bin/
```

Альтернативно установите следующее среда разработки Go.

```sh
$ git clone https://github.com/itaysk/kubectl-neat.git
$ cd kubectl-neat
$ go build .
$ mv kubectl-neat /usr/local/bin/
```

## 6. План проектирования узла Kubernetes

{"Узел"=>"gitee-kubernetes-node13", "Роли"=>"Amd64/X86", "IP"=>"10.4.145.144", "Метка"=>"Ограничение", "Примечание" => "Миграция кластера Redis"}
| ----------------------- | ------ | ----------------------------------------------- | ------------------------------ | ------------------------------------------------ | ----------------------------------- |
| master                  | master | 10.4.145.92<br />10.4.145.129<br />10.4.145.169 | node-role.kubernetes.io/master | node-role.kubernetes.io/control-plane:NoSchedule | Master узлу не разрешено развертывать несистемные модули.
| gitee-kubernetes-node01 | worker | 10.4.145.107
  \                                   | node_role=giteeInternal        | GiteeInternalOnly=yes:NoSchedule
  \                | Pod  c меткой Internal                |
gitee-kubernetes-node02
gitee-kubernetes-node03
gitee-kubernetes-node04
gitee-kubernetes-node05
| gitee-kubernetes-node06 | worker | 10.4.145.113
| gitee-kubernetes-node07 | worker | 10.4.145.34
  \                                    | node_role=giteeRuby            | GiteeRubyOnly=yes:NoSchedule
  \                    | Pod  c меткой Ruby                     |
gitee-kubernetes-node08
| gitee-kubernetes-node09 | worker | 10.4.145.57
  \                                    | node_role=giteeFrontend        | GiteeFrontendOnly=yes:NoSchedule
  \                | Frontend pod                 |
| gitee-kubernetes-node10 | worker | 10.4.145.116
  \                                   | node_role=giteeFrontend        | GiteeFrontendOnly=yes:NoSchedule
  \                | Pod  c меткой Frontend                |
gitee-kubernetes-node11
| gitee-kubernetes-node12 | worker | 10.4.145.123 | node_role=giteeMonitor | No taint | Pod with Monitor label.
gitee-kubernetes-node13
| gitee-kubernetes-node14 | worker | 10.4.145.53
  \                                    | node_role=giteeRuby            | GiteeRubyOnly=yes:NoSchedule
  \                    | Pod с меткой Ruby                     |
gitee-kubernetes-node15

Команды для установки тегов и меток следующие:

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

Дополнительные операции см. в следующих разделах:

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

## 7. Развертывание метрик

В новых версиях Kubernetes сбор метрик для системных ресурсов осуществляется с помощью Metrics-сервера, который может собирать данные об использовании памяти, диска, ЦП и сети узлов и модулей.

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

Валидация

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

## 8. Развертывание информационной панели

развертывание helm

URL-адрес репозитория диаграмм

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

Проверьте статус развертывания kubernetes-dashboard.

```sh
$ kubectl get pods,svc -n kubernetes-dashboard | grep kubernetes-dashboard
pod/kubernetes-dashboard-5486c8f5bf-xff6r   1/1     Running   0          45s
service/kubernetes-dashboard   NodePort   192.168.48.88   <none>        443:30443/TCP   45s
```

Установить информацию токена входа

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

Откройте https://node01IP:30443/, чтобы увидеть интерфейс входа в систему.

Вы можете использовать nginx для обратного прокси, конфигурация nginx выглядит следующим образом.

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

## 9. Облачное хранилище Rook

### 9.1 Мотивация

{"описание"=>"В облачной среде для кластера Kubernetes существует множество вариантов использования хранилища, таких как OSS, NAS, облачные диски и т. д. Однако по разным причинам иногда нам может потребоваться создать собственный сервер хранения для предоставления томов хранения Kubernetes. Обычно мы выбираем хранилище Ceph, но если для развертывания используются физические серверы или ECS, это потребует значительных затрат как по части трудозатрат, так и по сложности поддержки. К счастью, существует такое решение, как Rook Ceph, которое отлично интегрируется в облачную среду, позволяя Ceph запускаться непосредственно на кластере Kubernetes. Это существенно облегчает процесс поддержки и управления"}

### 9.2 Предварительные условия

1. В производственной среде необходимо использовать как минимум 3 узла в качестве узлов OSD для хранения данных.
Каждый узел OSD должен иметь по крайней мере один необработанный диск для инициализации при развертывании rook ceph.
2. Мы используем более позднюю версию rook ceph, для которой требуется Kubernetes версии 1.22 или выше.

| Имя | Информация |
| --------------- | -------------------------------------------------- ----------------- |
| Конфигурация узла | 16c64g SSD 200 ГБ *1 SSD 500 ГБ *1 (один системный диск и один ceph для метаданных) Количество узлов 3 |
| Кластер Kubernetes | v1.26.0 |
| helm | v3.8.0 |
| Rook | v1.13.1 |
| Ceph | v18.2.1 |
| Mon Компонент | 3 |
| Mgr Компонент | 2 |

### 9.3 Развертывание

#### Подготовка кластера K8S

Rook 1.13 поддерживает Kubernetes v1.23 или более поздние версии.

Кластер Kubernetes, используемый в этой статье, выглядит следующим образом:

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

Что касается конфигурации среды выполнения контейнера, средой выполнения контейнера этого кластера Kubernetes является Containerd.

Обратите внимание, что если конфигурация systemd ContainerdContainerd.service имеет конфигурацию `LimitNOFILE=infinity`, возникнут проблемы с компонентом Ceph Mon при запуске кластера Ceph с использованием Rook. Процесс ms_dispatch будет постоянно загружать процессор на 100%. Сообщество Rook обсуждало эту проблему в двух РЕЛИЗАХ: РЕЛИЗ 11253 (https://github.com/rook/rook/issues/11253) и РЕЛИЗ 10110 (https://github.com/rook/rook/issues/10110). . Необходимо установить подходящее значение для LimitNOFILE, в моем случае я установил его на 1048576.

Как исправить?

```bash
$ cat >/etc/systemd/system/containerd.service.d/LimitNOFILE.conf<<EOF
[Service]
LimitNOFILE=1048576
EOF
$ systemctl daemon-reload
$ systemctl restart containerd
```

#### Подготовка локального хранилища (логический том LVM)

Чтобы настроить кластер хранения Ceph, вам нужен по крайней мере один из следующих вариантов локального хранилища:

- Необработанные устройства (без разделов и отформатированной файловой системы)
- Необработанные разделы (без отформатированной файловой системы)
- Логический том LVM (без форматированной файловой системы)
— Постоянный том, предоставляемый в блочном режиме внутри класса хранилища.

Мы будем использовать «логический том LVM» в качестве локального хранилища.

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

> Примечание. Прежде чем выполнять следующие действия, убедитесь, что на диске нет важных данных, поскольку эти действия приведут к удалению всех данных на диске.

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

Поскольку локальное хранилище, требуемое кластером Ceph, представляет собой логические тома LVM, которые не отформатированы как файловая система, не используйте «mkfs.ext4» или «mkfs.xfs» для форматирования логического тома.

Наконец, проверьте логический том:

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

#### Настройка синхронизации времени

Обратите внимание на настройку синхронизации времени каждого узла сервера, важно ли это, иначе, если время каждого узла сервера не синхронизировано, оператор rook ceph может работать неправильно при работе компонента ceph mon.

Для синхронизации времени рекомендуется использовать chronyd.

#### Установить helm

См. 5.2 Установка helm.

#### Развертывание оператора Rook

Мы планируем mon, osd, mrg и т. д. Ceph в gitee-kubernetes-node09,

Пометьте следующие три узла как «role=ceph» и добавьте запятнание «GiteeFrontendOnly=yes:NoSchedule».

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

Мы развернем оператор цефа ладьи, используя диаграмму Rook Helm.

В настоящее время Rook публикует встроенную версию Ceph Operation на каналах Release и Master. Канал выпуска содержит последнюю стабильную версию Rook.

```sh
$ helm repo add rook-release https://charts.rook.io/release
$ helm repo update
#$ helm install --create-namespace --namespace rook-ceph rook-ceph rook-release/rook-ceph -f values.yaml
```

Или загрузите диаграмму управления rook-ceph с https://charts.rook.io/release/rook-ceph-v1.13.1.tgz, а затем используйте следующую команду для установки:

```sh
$ helm pull rook-release/rook-ceph --version v1.13.1 --untar
# $ helm pull rook-release/rook-ceph --version v1.13.1
$ helm install --create-namespace --namespace rook-ceph rook-ceph rook-ceph-v1.13.1.tgz -f values.yaml
```

Что касается содержимого, настроенного в файле values.yaml, вы можете настроить его по мере необходимости на основе документации по адресу https://github.com/rook/rook/blob/master/deploy/charts/rook-ceph-cluster/values.yaml.

Ниже приведены текущие настройки, которые я сделал, в основном настраивая использование адреса частного репозитория изображений при развертывании Оператора Rook и Ceph, а также планируя соответствующие конфигурации.

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

Развертывание

```sh
$ kubectl create ns rook-ceph
$ cd rook-ceph
$ helm install -n rook-ceph rook-ceph -f values-prod.yaml .
```

После завершения развертывания убедитесь, что rook-ceph-operator запускается нормально:

```sh
$ kubectl get pods -n rook-ceph -l "app=rook-ceph-operator"
NAME                                  READY   STATUS    RESTARTS   AGE
rook-ceph-operator-5bb7fbf69c-hn785   1/1     Running   0          64s
```

#### Создание кластера Ceph

##### Справочная документация

Документация Rook посвящена запуску Rook в различных средах. При создании кластера Ceph можно рассмотреть возможность настройки на основе примера манифеста кластера ниже:

- [cluster.yaml](https://github.com/rook/rook/blob/release-1.12/deploy/examples/cluster.yaml): настройки кластера для производственного кластера, работающего на «голом железе». Требуется как минимум три рабочих узла.
- [cluster-on-pvc.yaml](https://github.com/rook/rook/blob/release-1.12/deploy/examples/cluster-on-pvc.yaml): настройка кластера для рабочего кластера, работающего в динамическая облачная среда.
-uster-test.yaml: используется для настроек кластера в тестовой среде (например, minikube).

Для получения более подробной информации обратитесь к примеру конфигурации Ceph.

Оператор Rook Ceph развернут и успешно работает, и теперь мы можем создать кластер Ceph, используя «cluster.yaml».

##### Создать кластер

```sh
$ git clone --single-branch --branch v1.13.1 https://github.com/rook/rook.git
```

На основе [cluster-prod.yaml](https://github.com/rook/rook/blob/release-1.12/deploy/examples/cluster.yaml) настройте собственный файл Cluster.yaml. Вот модификации, которые включают только файл Cluster.yaml:

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

Поскольку локальное хранилище кластера Ceph будет использовать ранее созданный логический том LVM неформатированной файловой системы, созданный нами логический том называется `osd`, принадлежит группе томов `ceph` и имеет путь `/dev/ceph/osd`.

Рук начал поддерживать использование логических томов LVM в качестве локального хранилища с версии 1.9. Код реализации для этого находится в PR https://github.com/rook/rook/pull/7967. Документация в CRD CephCluster (https://rook.io/docs/rook/v1.13/CRDs/Cluster/ceph-cluster-crd/) не очень подробно описывает, как использовать логические тома для хранения. Основываясь на коде реализации в запросе на слияние, текущая конфигурация требует указания `spec.storage.devices[].name` в определении ресурса CephCluster как `/dev/disk/by-id/dm-name-<vgName>-< lvName>`.

Таким образом, значение `devices[].name` в разделе `spec.storage` конфигурации кластера.yaml равно `/dev/disk/by-id/dm-name-ceph-osd`.

Создайте кластер Ceph:

```sh
$ kubectl create -f cluster-prod.yaml
cephcluster.ceph.rook.io/rook-ceph created
```

Убедитесь, что кластер работает, проверив модули в пространстве имен rook-ceph.

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

Количество модулей OSD зависит от количества узлов в кластере и количества настроенных устройств. Для упомянутого выше файла Cluster.yaml по умолчанию OSD будет создан для каждого доступного устройства, найденного на каждом узле.

Если в процессе создания возникли какие-либо проблемы, вы можете проверить журналы пода rook-ceph-operator.

Чтобы повторно запустить задание `rook-ceph-osd-prepare-<nodename>`, просканировать доступное локальное хранилище для добавления OSD, вы можете запустить следующую команду:

```sh
# Delete old jobs
$ kubectl get job -n rook-ceph | awk '{system("kubectl delete job "$1" -n rook-ceph")}'
# Restart operator
$ kubectl rollout restart deploy rook-ceph-operator  -n rook-ceph
```

Чтобы определить, можно ли успешно добавить каждое OSD на узле, обратите внимание на журналы задания «rook-ceph-osd-prepare-<nodename>», соответствующего поду.

#### Проверка состояния кластера

Для проверки состояния работоспособности кластера требуется Rook Toolbox.(https://rook.io/docs/rook/v1.13/Troubleshooting/ceph-toolbox/)

```sh
$ kubectl apply -f https://raw.githubusercontent.com/rook/rook/release-1.13/deploy/examples/toolbox.yaml

$ kubectl get po -n rook-ceph | grep rook-ceph-tools
rook-ceph-tools-68b98695bb-gh76t                  1/1     Running     0             23s
```

> Примечание: Образ Ceph в файле release-1.13/deploy/examples/toolbox.yaml все еще v17.2.6. Можно вручную изменить на v18.2.1, а также добавить разрешения Taints и Affinity.

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

Подключитесь к панели инструментов и запустите команду `ceph status`:

```sh
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
Or as follows
$ kubectl -n rook-ceph exec -it $(kubectl -n rook-ceph get pod -l "app=rook-ceph-tools" -o jsonpath='{.items[0].metadata.name}') -- bash
```

Ниже приведены точки проверки состояния:

— Все узлы монитора (mon) должны находиться в состоянии кворума.
- Узел менеджера (mgr) должен находиться в активном состоянии.
- Как минимум три узла OSD должны быть онлайн и доступны.

Если состояние работоспособности отличается от HEALTH_OK, вам следует выяснить причины предупреждений или ошибок.

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

Из выходных данных видно, что кластер находится в нормальном состоянии: в кластере развернуты 3 mon, 2 mgrs и 3 osd.

Проверьте пулы хранения в текущем кластере:

```sh
bash-4.4$ ceph osd lspools
1 .mgr
```

Вы можете видеть, что в текущем кластере есть только один пул хранения с именем .mgr. Это указывает на то, что в этом кластере Ceph был создан только пул управления по умолчанию (пул mgr), который представляет собой специальный пул, используемый для хранения данных, связанных с управлением и мониторингом.

Команды запроса, относящиеся к панели инструментов

```
ceph status
ceph osd status
ceph df
rados df
ceph osd lspools
```

#### Панель управления Ceph

Панель мониторинга Ceph можно использовать для просмотра состояния кластера. В кластере Ceph, развернутом с помощью Rook, по умолчанию включена панель мониторинга Ceph.

![](https://blog.frognew.com/images/2023/09/ceph-v18-dashboard.png)

`rook-ceph-mgr-dashboard` — это его служба в кластере Kubernetes.

```sh
$ kubectl get svc rook-ceph-mgr-dashboard -n rook-ceph
NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
rook-ceph-mgr-dashboard   ClusterIP   10.100.133.87   <none>        7000/TCP   73m
```

Его можно открыть через Ingress или создав службу NodePort [dashboard-external-http](https://github.com/rook/rook/blob/master/deploy/examples/dashboard-external-http.yaml).

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

Имя пользователя-администратора Ceph Dashboard можно проверить с помощью следующей команды:

```sh
$ kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo
```

### 9.4 Использование хранилища — постоянство сервиса

Ceph предоставляет три типа интерфейсов хранения: блочный, разделяемая файловая система и объектный.

Ниже показано, как использовать эти три типа хранилища для кластера Ceph, развернутого и управляемого Rook.

Использование Rook для использования Ceph обеспечивает три типа хранения и их назначение следующим образом:

— Блочное хранилище (Block) используется для предоставления хранилища ReadWriteOnce (RWO) для одного модуля.
- Общая файловая система CephFS подходит для совместного хранения данных для чтения и записи (RWX) между несколькими модулями.
— Объектное хранилище предоставляет хранилище, доступ к которому можно получить через конечную точку S3 внутреннего или внешнего кластера Kubernetes.

![](https://mmbiz.qpic.cn/mmbiz_png/bd4WXH8wjhlHKsrr5E8rxpD8qyeqr1ZrQ3jb8bqZFLpgZe7EdvqWOgib19aI9gWFfn0lHus6jlUFK10vnibDr4Jg/640?wx_fmt=png&wxfrom=5 &wx_lazy=1&wx_co=1)

#### 9.4.1 Блочное хранилище

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

**Блочное хранилище позволяет подключить хранилище к одному поду.**

В этом руководстве объясняется, как создать простое многоуровневое веб-приложение в Kubernetes с использованием постоянных томов, включенных Rook.

##### 9.4.1.1 Поставка хранилища RBD

Прежде чем Rook сможет предоставить хранилище, вам необходимо создать StorageClass и CephBlockPool.

В этом примере требуется как минимум один OSD на каждый узел, и каждый OSD должен находиться на трех разных узлах. Каждое OSD должно находиться на отдельном узле, поскольку для параметра «failureDomain» установлено значение «host», а для параметра «replication.size» установлено значение 3.

Используйте напрямую

Используйте файл rook/deploy/examples/csi/rbd/storageclass.yaml для создания пула хранения CephBlockPool и томов динамического хранения StorageClass.

Или создайте файл `storageclass.yaml` ниже:

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

Этот файл Storageclass.yaml содержит определение StorageClass 'rook-ceph-block' и CephBlockPool 'replicapool'.

Если вы развернули оператор Rook в пространстве имен, отличном от «rook-ceph», измените префикс в поле «provisioner», чтобы он соответствовал пространству имен, которое вы используете. Например, если оператор Rook работает в пространстве имен «my-namespace», значение поставщика должно быть «my-namespace.rbd.csi.ceph.com».

Затем создайте StorageClass и CephBlockPool.

```sh
$ kubectl apply -f storageclass.yaml
cephblockpool.ceph.rook.io/replicapool created
storageclass.storage.k8s.io/rook-ceph-block created
```


> Согласно спецификациям Kubernetes, при использовании политики восстановления «Retain» любой PersistentVolume

При создании ресурса CephBlockPool с именем «replicapool» он автоматически создаст пул хранения с тем же именем в кластере Ceph.

Эту операцию выполняет оператор Ceph. Если пул хранения не создан, вы можете проверить журналы оператора Ceph, чтобы определить проблему.

```sh
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
bash-4.4$ ceph osd lspools
1 .mgr
2 replicapool
```


Вывод выше показывает, что пул хранения «replicapool» создан.

Установите Ceph в качестве тома хранения по умолчанию

```sh
[root@k8s-master1 ~]# kubectl patch storageclass rook-ceph-block -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

После изменения проверьте статус StorageClass (**с флагом по умолчанию**).

```
$ kubectl get sc
NAME                        PROVISIONER                  RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
rook-ceph-block (default)   rook-ceph.rbd.csi.ceph.com   Delete          Immediate           true                   2m5s
```

##### 9.4.1.2 Использование хранилища

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

Чтобы просмотреть Kubernetes PVC (заявление постоянного тома), выполните следующую команду:

```sh
$ kubectl get pvc
NAME      STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
rbd-pvc   Bound    pvc-f6fa10da-9e2e-4ca1-aec2-0a1b9b457f86   1Gi        RWO            rook-ceph-block   8m55s
```

Просмотрите созданные постоянные тома:

```sh
$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM               STORAGECLASS      REASON   AGE
pvc-f6fa10da-9e2e-4ca1-aec2-0a1b9b457f86   1Gi        RWO            Delete           Bound    rook-ceph/rbd-pvc   rook-ceph-block            11m
```

Просмотр конкретной информации об одном постоянном томе:

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

Проверьте образы rbd в пуле реплик пула носителей:

```sh
$ kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
bash-4.4$ rbd ls -p replicapool
csi-vol-487f0510-6c2c-4a39-8198-3c411598a777
```

Мы создаем пример приложения Pod, используя блочное хранилище, предоставленное Rook.

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

Или напрямую создайте временный модуль

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

Проверьте образы rbd в пуле реплик пула носителей:

```
$ rbd ls -p replicapool
csi-vol-487f0510-6c2c-4a39-8198-3c411598a777
csi-vol-75a8fa65-83b7-469e-baa2-5856fc96721e
```

##### 9.4.1.3 Снимок PVC — снимок блочного хранилища

Цель класса моментальных снимков:

Как и StorageClass, он позволяет управлять предоставлением томов. VolumeSnapshotClass также предоставляет способ управления снимками томов.

Kubernetes 1.19 и более поздние версии требуют отдельной установки контроллера моментальных снимков, чтобы включить функцию моментального снимка PVC. Поэтому он устанавливается заранее. Если версия ниже 1.19, отдельно устанавливать ее не нужно.

Способ установки следующий:

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/deploy/kubernetes/snapshot-controller/rbac-snapshot-controller.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/deploy/kubernetes/snapshot-controller/setup-snapshot-controller.yaml
```

Ссылка: [Я получаю сообщение об ошибке при развертывании существующего файла snapshotclass.yaml. · Проблема № 6819 · rook/rook (github.com)](https://github.com/rook/rook/issues/6819)

[Документация Ceph (rook.github.io)](https://rook.github.io/docs/rook/v1.5/ceph-csi-snapshot.html)

Расположение файла: rook/deploy/examples/csi/rbd/snapshotclass.yaml.

Создание

```sh
$ kubectl create -f snapshotclass.yaml
volumesnapshotclass.snapshot.storage.k8s.io/csi-rbdplugin-snapclass created
```

Содержание: На самом деле, это параметры для указания информации о предоставленном ресурсе моментального снимка. Управляется через API-интерфейс snapshot.storage.k8s.io/v1.

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

###### Создать снимок

Прежде чем создавать снимок, мы добавляем в том некоторый контент, который необходимо сделать снимок для последующей проверки данных.

Добавьте данные домашней страницы nginx в модуль web-0-pvc для последующего тестирования.

Создание тестовых контейнеров и PVC

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

Изменил файл index.html, далее создадим снимок.

снимок определяет тип VolumeSnapshot, который происходит из существующего PVC. Обратите внимание, что PVC отличается пространством имен, поэтому он должен находиться в том же пространстве имен, иначе он не может быть привязан.

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

###### Укажите PVC создания моментального снимка

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

Примечание. При указании моментального снимка для создания PVC необходимо соблюдать следующие условия:
>
> 1. В том же пространстве имен;
>
> 2. Размер хранилища должен быть меньше или равен размеру снимка. В противном случае его невозможно связать.

```sh
$ kubectl create -f pvc-restore.yaml -n rook-ceph
persistentvolumeclaim/rbd-pvc-restore created

$ kubectl get pvc
NAME               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
rbd-pvc-restore    Bound    pvc-84e3a64e-3740-406e-ae30-38f57312cbc9   1Gi        RWO            rook-ceph-block   14s
web-0-pvc          Bound    pvc-1a93a247-e78c-4d6e-838f-929a520d1343   1Gi        RWO            rook-ceph-block   9m41s

```

###### Валидация данных

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

Подключите ранее созданный PVC к модулю, создав файл nginx.

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

Из вышеизложенного видно, что данные в порядке.

Точка монтирования для web-0: /usr/share/nginx/html/

Точка монтирования для wordproess-restore: /var/www/html/

Поскольку данные моментального снимка также напрямую монтируются в PVC, они сохраняются непосредственно в точке монтирования PVC.

##### 9.4.1.4 Динамическое изменение размера PVC

Требование к расширению

- Расширение PVC для типа обмена файлами требует k8s 1.15+
Для расширения PVC-хранилища блочного типа требуется k8s 1.16+.

Расширение PVC требует включения «ExpandCSIVolumes». Последняя версия Kubernetes уже включила эту функцию по умолчанию. Вы можете проверить, включена ли эта функция в вашей версии Kubernetes.

```sh
$ kube-apiserver -h|grep ExpandCSIVolumes
```

Если по умолчанию установлено значение true, эту функцию включать не нужно. Если по умолчанию установлено значение false, эту функцию необходимо включить.

- Класс хранилища также должен поддерживать динамическое масштабирование. `allowVolumeExpansion: true`

```yaml
$ kubectl get sc rook-cephfs -o yaml
allowVolumeExpansion: true
apiVersion: storage.k8s.io/v1
kind: StorageClass
```

###### Операция масштабирования

До масштабирования PVC имеет емкость 1 ГБ.

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

После масштабирования

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

##### 9.4.1.5 Клон PVC

Клонирование PVC похоже на снимок PVC.

Создайте тестовую среду

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

**Примечание:**

**1. Клонирование можно выполнить только в том же пространстве имен;**

**2. Размер клонированного PVC должен быть меньше или равен размеру оригинала**

#### 9.4.2 Общая файловая система CephFS

Хранилище файловой системы CephFS (также известное как общая файловая система) может быть смонтировано с доступом для чтения/записи из нескольких модулей Pod. Это может быть очень полезно для приложений, которые можно кластеризовать с использованием общей файловой системы.

Начиная с версии Pacific (Ceph 16), Ceph поддерживает несколько файловых систем.

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

##### 9.4.2.1 Создание файловой системы Ceph

Создайте файловую систему, указав необходимые настройки для пула метаданных, пулов данных и сервера метаданных в CRD `CephFilesystem`.

Здесь мы создаем пул метаданных с 3 репликами и пул данных с 3 репликами. Дополнительные параметры см. в [Документация по созданию общей файловой системы] (https://rook.io/docs/rook/v1.11/CRDs/Shared-Filesystem/ceph-filesystem-crd/).

Создайте следующий файл filesystem.yaml:

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

Оператор Rook Ceph создаст все пулы и другие ресурсы, необходимые для запуска службы. Это может занять некоторое время.

```sh
$ kubectl create -f filesystem.yaml
```

Убедитесь, что файловая система настроена, и дождитесь запуска модуля mds:

```sh
$ kubectl -n rook-ceph get pod -l app=rook-ceph-mds
NAME                                   READY   STATUS    RESTARTS   AGE
rook-ceph-mds-myfs-a-9cc6945cf-tvv9x   1/1     Running   0          44s
rook-ceph-mds-myfs-b-b988647d4-spmh5   1/1     Running   0          42s
```

Чтобы проверить подробный статус файловой системы, войдите в панель инструментов Rook и используйте «ceph status», чтобы просмотреть его. Убедитесь, что выходные данные включают состояние службы MDS. В этом примере имеется активный экземпляр MDS и резервный экземпляр MDS для аварийного переключения.

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

Используйте «ceph osd lspools», чтобы проверить и подтвердить создание пулов хранения «myfs-metadata» и «myfs-replicated».

```sh
bash-4.4$ ceph osd lspools
1 .mgr
3 replicapool
4 myfs-metadata
5 myfs-replicated
```

##### 9.4.2.2 Предоставление хранилища CephFS

Прежде чем Rook начнет предоставлять хранилище CephFS, необходимо создать StorageClass на основе файловой системы. Это необходимо для взаимодействия Kubernetes с драйвером CSI для создания постоянных томов.

Сохраните следующее определение класса хранения в файле Storageclass.yaml:

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

Если вы развернули оператор Rook в пространстве имен, отличном от «rook-ceph», измените префикс в поставщике, чтобы он соответствовал пространству имен, которое вы используете.

Например, если оператор Rook работает в пространстве имен «rook-op», то значение поставщика должно быть «rook-op.rbd.csi.ceph.com».

Создайте класс хранилища:

```sh
$ kubectl create -f storageclass.yaml
storageclass.storage.k8s.io/rook-cephfs created

$ kubectl get sc rook-cephfs
NAME          PROVISIONER                     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
rook-cephfs   rook-ceph.cephfs.csi.ceph.com   Delete          Immediate           true                   4m39s
```

##### 9.4.2.3 О квотах

Драйвер CephFS CSI обеспечивает запрошенный размер PVC с помощью квот. Квоты CephFS поддерживаются только в новых ядрах Linux, начиная с версии 4.17.

##### 9.4.2.4 Использование хранилища: монтирование нескольких модулей

Создайте следующий файл busybox.yaml:

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

Создайте развертывание и pvc для этого busybox:

```sh
$ kubectl apply -f busybox.yaml
persistentvolumeclaim/busybox-data-pvc created
deployment.apps/busybox created
```

Просмотрите созданный PVC и автоматически подготовленный PV:

```sh
$ kubectl get pvc
NAME                               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS      AGE
busybox-data-pvc                   Bound    pvc-38fe93c8-c55b-4e18-b955-15a09dc45943   2Gi        RWX            rook-cephfs       21s

$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                                        STORAGECLASS      REASON   AGE
pvc-38fe93c8-c55b-4e18-b955-15a09dc45943   2Gi        RWX            Delete           Bound    rook-ceph/busybox-data-pvc                   rook-cephfs                25s
```

Просмотр конкретной информации о PV:

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

Используется ли Ceph_openebs для производственных сред?

#### 9.4.3 Хранилище объектов

ПРЕДСТОИТ РАЗРАБОТАТЬ

Справочные статьи

[Автоматическое развертывание и управление кластером Ceph с помощью Rook | Frognew (frognew.com)](https://blog.frognew.com/2023/06/rook-quick-start.html)

## 10. Резервное копирование облачных приложений с помощью инструмента с открытым исходным кодом Velero

## Часто задаваемые вопросы

### Удаление и повторное развертывание rook-ceph

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

### Очистка тестовых данных

Если Rook будет продолжать использоваться, необходимо очистить только созданное развертывание, модуль, pvc. После этого его можно сразу использовать.

#### Действия по удалению данных

Этапы очистки данных:

1. Сначала очистите смонтированный PVC и Pod, что может включать очистку отдельно созданного Pod и Deployment или других дополнительных ресурсов.
2. После очистки PVC очистите все PVC, созданные с помощью ceph StorageClass, и лучше всего проверить, очищены ли PV.
3. Затем очистите снимок: `kubectl delete Volumesnapshot XXXXXXXX`
4. Очистите созданный Пул, включая блочное хранилище и файловое хранилище.

```sh
$ kubectl delete -n rook-ceph cephblockpool replicapool
$ kubectl delete -n rook-ceph cephfilesystem myfs
```

- Очистите StorageClass:

```sh
$ kubectl delete sc rook-ceph-block rook-cephfs
```

- Очистка кластера Ceph:

```
kubectl -n rook-ceph delete cephcluster rook-ceph
```

- 
Удаление ресурсов Rook:

```sh
$ kubectl delete -f operator.yaml
$ kubectl delete -f common.yaml
$ kubectl delete -f crds.yaml
```

1.Если вы не знаете что делать, обратитесь к документации Rook.[troubleshooting](https://rook.io/docs/rook/v1.6/ceph-teardown.html#troubleshooting)

```sh
for CRD in $(kubectl get crd -n rook-ceph | awk '/ceph.rook.io/ {print $1}');
do
	kubectl get -n rook-ceph "$CRD" -o name |   xargs -I {} kubectl patch {} --type merge -p '{"metadata":{"finalizers": [null]}}' -n rook-ceph;
done
```

2. Очистите каталог данных и диск

Справочная ссылка: https://rook.io/docs/rook/v1.6/ceph-teardown.html#delete-the-data-on-hosts.

Справочная ссылка: https://rook.io/docs/rook/v1.6/ceph-teardown.html

```sh
kubectl -n rook-ceph patch configmap rook-ceph-mon-endpoints --type merge -p '{"metadata":{"finalizers": [null]}}'
kubectl -n rook-ceph patch secrets rook-ceph-mon --type merge -p '{"metadata":{"finalizers": [null]}}'
```

#### Удаление пула хранения пула ceph

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

Ссылка

[4.12. Удаление файловой системы Ceph с помощью интерфейса командной строки Red Hat Ceph Storage 4 | Портал клиентов Red Hat](https://access.redhat.com/documentation/zh-cn/red_hat_ceph_storage/4/html/file_system_guide/removing-a-ceph-file-system-using-the-command-line-interface_fs# doc-wrapper)

#### Удалить жесткий диск rbd

```sh
bash-4.4$ rbd ls -p replicapool
csi-vol-5e4e1cd5-d889-4705-9575-c65f0e0b4d01

bash-4.4$ rbd rm replicapool/csi-vol-5e4e1cd5-d889-4705-9575-c65f0e0b4d01
Removing image: 100% complete...done.
```

#### Кластер ceph сообщает, что daemons вышли из строя, обработка проблем

Причина этой проблемы в том, что при балансировке или откате данных daemon выходит из строя и не архивируется вовремя, вызывая аварийные сигналы в кластере.



1. Решение

```sh
$ ceph crash ls
$ ceph crash archive <id>
OR
$ ceph crash archive-all
```

2. Проверка статуса кластера

```sh
$ ceph -s
```



Справочная документация

Адрес rook на GitHub: https://github.com/rook/rook

[Краткий старт — документация Rook Ceph](https://rook.io/docs/rook/latest/Getting-Started/quickstart/#create-a-ceph-cluster)

[Руководство по развертыванию Rook 1.13: Развертывание и управление Ceph с помощью Rook 1.13 (Reef)

[Автоматическое развертывание и управление кластером Ceph с помощью Rook | Frognew (frognew.com)](https://blog.frognew.com/2023/06/rook-quick-start.html)

"[Rook Облачное хранилище - Layzer - Blog Park (cnblogs.com)](https://www.cnblogs.com/layzer/articles/rook_notes.html)"

Развертывание кластера Ceph в приложении kubernetes-rook - coke without ice (isekiro.com)

Kubernetes: установка Rook-ceph 1.3.11 - Flowing Year Dizzy Time - Blog Park

«Развертывание кластера Ceph с помощью Rook в существующем кластере Kubernetes (https://www.cnblogs.com/bixiaoyu/p/16135309.html)"

[K8S использует RBD постоянного хранилища ceph-csi. - wsjhk - Blog Park (cnblogs.com)](https://www.cnblogs.com/wsjhk/p/13710569.html)

[Продвинутый Kubernetes: Rook для облачного хранилища - Skyflask - Cnblogs (cnblogs.com)](https://www.cnblogs.com/skyflask/p/16844097.html#_caption_8)

Установите rook-ceph в кластер k8s - Hello Hello 111111 - Blog Park (cnblogs.com)

Helm3 установка Ceph кластера через Rook | Блог Mr.Pu (putianhui.cn)](https://www.putianhui.cn/posts/07bbf6bfd606/)

Объяснение команды Ceph- Блог Mr.Pu

[Развертывание Ceph с помощью оператора Rook v1.11.2 - (jianshu.com)](https://www.jianshu.com/p/87a006bca19b)

Практическое использование облачных решений Kubernetes. Часть шестая: создание кластера Ceph с помощью Rook - Сообщество разработчиков Alibaba Cloud (aliyun.com)