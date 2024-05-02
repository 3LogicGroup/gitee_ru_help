# Ansible

## Выполнение специальных команд Ansible

```sh
$ docker exec -it ansible bash
$ cd /data/ssh-key
# Распределение ключей в пакетном режиме
$ ansible-playbook distribute_keys.yml -e @keys.yml --private-key=/data/ssh-key/gitee_ru_p -f 10 
# Пинг-тест
$ docker exec ansible ansible all -m ping -u ubuntu
$ docker exec ansible ansible giteePubcomm -m shell -a "sudo mkdir /data/cronout -p" -u ubuntu
$ docker exec ansible ansible k8s -m shell -a "sudo apt update && sudo apt-get install -y vim" -u ubuntu


Ввод операций с контейнерами
$ docker exec -it ansible bash
$ ansible k8s -m shell -a  "crictl rmi hub.gitee.com/kube-comm/inbound-agent:alpine-jdk11"
$ ansible k8s -m shell -a  "crictl pull hub.gitee.com/kube-comm/inbound-agent:alpine-jdk11"


# Примеры других операций

# Если не указан модуль -m, будет использована команда модуля ansible по умолчанию
docker exec ansible ansible russia -a  "sudo crictl rmi --prune"

ansible k8s  -m shell -a  "systemctl stop node_exporter.service"
ansible k8s  -m shell -a  "systemctl disable node_exporter.service"
ansible k8s  -m shell -a  "rm -rf /usr/local/bin/node_exporter && rm -rf /etc/systemd/system/node_exporter.service && systemctl daemon-reload"
```



## Выполнение ansible-playbook

```sh
# настройка dns、ntp
$ ansible-playbook -f 10 setting_dns.yml
$ ansible-playbook -f 10 setting_ntp.yml

# установить redis
$ ansible-playbook -f 10 install_redis.yml

# установить сервер
$ ansible-playbook -i hosts 0.install-sserver.yml
```





## Выполнение ansible-role

```
todo
```
