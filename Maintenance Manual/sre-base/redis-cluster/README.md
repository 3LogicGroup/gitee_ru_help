Развертывание кластера Docker-Compose Redis-Cluster

Архитектура кластера

![image-20231212095001102](D:\gitee_ru\pro\sre-base\redis-cluster\assets\image-20231212095001102.png)



| Архитектура | Системное окружение | Версия Docker CE | IP-адрес


| --------- | ------------------- | -------------- | ------------ | ------------ | ----------- | ---------- |
| Amd64/X86 | Ubuntu Server 20.04 | 23.0.4         | 10.4.145.144 | gitee-redis1 | 7001        | 7002       |
| Amd64/X86 | Ubuntu Server 20.04 | 23.0.4         | 10.4.145.53  | gitee-redis2 | 7001        | 7002       |
| Amd64/X86 | Ubuntu Server 20.04 | 23.0.4         | 10.4.145.52  | gitee-redis3 | 7001        | 7002       |



Адрес репозитория:

[gitee-redis-cluster: Кластерное решение Gitee Redis](https://gitee.com/autom-studio/gitee-redis-cluster#docker-compose-集群部署-redis-cluster)



## 1. Создайте docker-образ

```sh
cd docker-images/redis
docker build -t hub.gitee.com/library/redis:5.0.10-alpine .
```



Измените файл .env, чтобы указать папку для хранения постоянных данных (по умолчанию: /data/rediscluster).



## 2. Создайте каталог постоянных данных

```sh
source .env
sudo mkdir -p ${DATA_DIR}/{master,slave}/data
sudo mkdir -p ${DATA_DIR}/{master,slave}/cluster

sudo chown -R 999:999 ${DATA_DIR}/{master,slave}
```



## 3. Запустите узел redis

- Последовательность запуска:

1. gitee-redis2
2. gitee-redis3
3. gitee-redis1



- Команда запуска:

```sh
$ docker-compose up -d
```



## 4. Создайте master-узел кластера

```sh
root@gitee-redis1:/home/ubuntu/workdir/docker-compose/gitee-redis-cluster# docker exec -it gitee-redis-cluster-redis-m-1 sh

/data # redis-cli --cluster create 10.4.145.144:7001 10.4.145.53:7001 10.4.145.52:7001
>>> Performing hash slots allocation on 3 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
M: 421c15c9773550ace27d265a2dbc155f0e24d1b0 10.4.145.144:7001
   slots:[0-5460] (5461 slots) master
M: 7bfd9dee44cd6f40d021f4dc3c4171fa62796a13 10.4.145.53:7001
   slots:[5461-10922] (5462 slots) master
M: 8dbbaff49fba137ce9d3b827c3b30ad89d655510 10.4.145.52:7001
   slots:[10923-16383] (5461 slots) master
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join

>>> Performing Cluster Check (using node 10.4.145.144:7001)
M: 421c15c9773550ace27d265a2dbc155f0e24d1b0 10.4.145.144:7001
   slots:[0-5460] (5461 slots) master
M: 8dbbaff49fba137ce9d3b827c3b30ad89d655510 10.4.145.52:7001
   slots:[10923-16383] (5461 slots) master
M: 7bfd9dee44cd6f40d021f4dc3c4171fa62796a13 10.4.145.53:7001
   slots:[5461-10922] (5462 slots) master
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered
```



## 5. Добавьте ведомые узлы кластера и укажите master

- Просмотр идентификаторов master-узла кластера

```sh
/data # redis-cli --cluster check 10.4.145.144:7001
10.4.145.144:7001 (421c15c9...) -> 0 keys | 5461 slots | 0 slaves.
10.4.145.52:7001 (8dbbaff4...) -> 0 keys | 5461 slots | 0 slaves.
10.4.145.53:7001 (7bfd9dee...) -> 0 keys | 5462 slots | 0 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
>>> Performing Cluster Check (using node 10.4.145.144:7001)
M: 421c15c9773550ace27d265a2dbc155f0e24d1b0 10.4.145.144:7001
   slots:[0-5460] (5461 slots) master
M: 8dbbaff49fba137ce9d3b827c3b30ad89d655510 10.4.145.52:7001
   slots:[10923-16383] (5461 slots) master
M: 7bfd9dee44cd6f40d021f4dc3c4171fa62796a13 10.4.145.53:7001
   slots:[5461-10922] (5462 slots) master
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
```



- Добавьте указанный ведомый узел в соответствии с идентификатором master (обязательно проверьте идентификатор! Не добавляйте его неправильно!)

```
# 1
redis-cli --cluster add-node --cluster-slave --cluster-master-id 421c15c9773550ace27d265a2dbc155f0e24d1b0 10.4.145.53:7002 10.4.145.144:7001

# 2
redis-cli --cluster add-node --cluster-slave --cluster-master-id 7bfd9dee44cd6f40d021f4dc3c4171fa62796a13 10.4.145.52:7002 10.4.145.53:7001

# 3
redis-cli --cluster add-node --cluster-slave --cluster-master-id 8dbbaff49fba137ce9d3b827c3b30ad89d655510 10.4.145.144:7002 10.4.145.52:7001
```





## Ссылка

"[Кластер Redis-Cluster · Yuque (yuque.com)](https://www.yuque.com/youngfit/wufeyh/bi1n72#ff7d1bca)"
