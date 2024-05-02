# sre-base-initialization

## 1. Спецификация установочного пакета

```sh
dockerfile: ~/workdir/dockerfile

docker-compose file: ~/workdir/docker-compose

Binary: ~/workdir/<servicename>/bin/
 
Configuration: ~/workdir/<servicename>/conf/
 
Logs: ~/workdir/<servicename>/logs/
 
Daemon process hosting: systemd
```



## 2. Установка kubectl и helm

```
# kubectl 
$ sudo curl -SL https://dl.k8s.io/release/v1.22.5/bin/linux/amd64/kubectl -o /usr/bin/kubectl
$ sudo chmod 755 /usr/bin/kubectl

$ kubectl get nodes
NAME             STATUS   ROLES    AGE    VERSION
192.168.240.10   Ready    <none>   42m    v1.22.5
192.168.240.11   Ready    <none>   42m    v1.22.5
....

# kubectl Completion
$ source <(kubectl completion bash)
$ echo "source <(kubectl completion bash)" >> ~/.bashrc

# Shortcuts
cat >> ~/.bashrc <<EOF
alias k=kubectl
complete -o default -F __start_kubectl k
EOF

# helm
$ wget -c https://repo.huaweicloud.com/helm/v3.8.0/helm-v3.8.0-linux-386.tar.gz
$ tar -zxvf helm-v3.8.0-linux-386.tar.gz
$ sudo cp linux-386/helm /usr/local/bin/
$ sudo chmod a+x  /usr/local/bin/helm
$ sudo chmod 600 ~/.kube/config
$ helm list -A
NAME    NAMESPACE       REVISION        UPDATED STATUS  CHART   APP VERSION

Helm Completion
$ helm completion bash > /etc/bash_completion.d/helm

$ echo "helm completion bash > /etc/bash_completion.d/helm" >>  ~/.bashrc
```
