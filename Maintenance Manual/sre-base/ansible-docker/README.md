# Ansible

## Execute Ansible ad-hoc commands

```sh
$ docker exec -it ansible bash
$ cd /data/ssh-key
# Distribute Keys in Batch
$ ansible-playbook distribute_keys.yml -e @keys.yml --private-key=/data/ssh-key/gitee_ru_p -f 10 
# Ping Test
$ docker exec ansible ansible all -m ping -u ubuntu
$ docker exec ansible ansible giteePubcomm -m shell -a "sudo mkdir /data/cronout -p" -u ubuntu
$ docker exec ansible ansible k8s -m shell -a "sudo apt update && sudo apt-get install -y vim" -u ubuntu


Enter Container Operation
$ docker exec -it ansible bash
$ ansible k8s -m shell -a  "crictl rmi hub.gitee.com/kube-comm/inbound-agent:alpine-jdk11"
$ ansible k8s -m shell -a  "crictl pull hub.gitee.com/kube-comm/inbound-agent:alpine-jdk11"


# Other operation examples

# If no -m module is specified, the default ansible module command will be used
docker exec ansible ansible russia -a  "sudo crictl rmi --prune"

ansible k8s  -m shell -a  "systemctl stop node_exporter.service"
ansible k8s  -m shell -a  "systemctl disable node_exporter.service"
ansible k8s  -m shell -a  "rm -rf /usr/local/bin/node_exporter && rm -rf /etc/systemd/system/node_exporter.service && systemctl daemon-reload"
```



## Execute ansible-playbook

```sh
# setting dns、ntp
$ ansible-playbook -f 10 setting_dns.yml
$ ansible-playbook -f 10 setting_ntp.yml

# install redis
$ ansible-playbook -f 10 install_redis.yml

# install sserver
$ ansible-playbook -i hosts 0.install-sserver.yml
```





## Execute ansible-role

```
todo
```
