# redis

## 1.Установка

```sh
root@gitee-postgresql1:~# apt -y install redis
```



## 2.Настройка основных параметров для Redis

```sh
root@gitee-postgresql1:~# vi /etc/redis/redis.conf
# строка 68 : интерфейс прослушивания
# по умолчанию только localhost
# если вы хотите подключаться с других хостов,
# измените на собственный IP-адрес или установите значение [0.0.0.0]
bind 127.0.0.1 ::1
# строка 91 : порт прослушивания
port 6379
# строка 224 : настройка daemonize
# если вы используете Redis в качестве демона сервиса, установите значение [yes]
daemonize yes
# строка 275 : количество баз данных
# ID базы данных назначается от 0 до (значение настройки - 1)
databases 16
# строка 307: сохранить кэшированную базу данных на диске
# настройки по умолчанию ниже означают следующее
# через 900 секунд, если изменился хотя бы 1 ключ
# через 300 сек, если изменилось не менее 10 ключей
# через 60 сек, если изменено не менее 10000 ключей
# если вы хотите отключить эту функцию, закомментируйте все строки до "save ***" или укажите [save ""]
save 900 1
save 300 10
save 60 10000
# строка 791 : пароль аутентификации
requirepass oschina123
# строка 1094 : альтернативный режим персистентности ("да" означает включено)
# если включено, Redis теряет высокую производительность, но получает большую безопасность
appendonly no
# строка 1123 : если включено [appendonly yes] при записи данных на диск
# [no] означает, что не нужно выполнять fsync в Redis (просто позвольте ОС промыть данные)
# appendfsync always
appendfsync everysec
# appendfsync no

root@gitee-postgresql1:~# systemctl restart redis
```



## 3.Настройка репликации

### 3.1 Конфигурация главного узла

```sh
root@gitee-postgresql1:~# vi /etc/redis/redis.conf
# строка 68 : изменить на собственный IP-адрес или [0.0.0.0]
bind 0.0.0.0 ::1
# строка 224 : изменить (запуск как daemon)
daemonize yes
# строка 602 : при необходимости добавьте следующее
# min-replicas-to-write : если количество Replica Hosts онлайн, Primary Hosts принимает запросы на запись
# min-replicas-max-lag : время принятия решения (сек) для онлайна, если Replica Hosts возвращают ответ в течение указанного времени
min-replicas-to-write 1
min-replicas-max-lag 10
# строка 792 : пароль аутентификации
requirepass oschina123

root@gitee-postgresql1:~# systemctl restart redis
```

### 3.2 Конфигурация ведомого узла

```sh
root@gitee-postgresql1:~# vi /etc/redis/redis.conf
# строка 68 : изменить на собственный IP-адрес или [0.0.0.0]
bind 0.0.0.0
# строка 224 : изменить (запуск как daemon)
daemonize yes
# строка 389 : добавьте IP-адрес и порт основного хоста
replicaof 10.4.145.105 6379
# строка 407 : добавить пароль аутентификации, установленный на основном хосте
masterauth oschina123
# строка 437 : проверить параметр (установить Replica Hosts только для чтения)
replica-read-only yes

root@gitee-postgresql1:~# systemctl restart redis
```



### 3.3 Проверка статистической информации на хостах-репликах



#### Представление с главного узла

```sh
root@gitee-postgresql1:/home/ubuntu# redis-cli -a oschina123
127.0.0.1:6379> info Replication
# Репликация
role:master
connected_slaves:1
min_slaves_good_slaves:1
slave0:ip=10.4.145.35,port=6379,state=online,offset=28,lag=0
master_replid:e1b05cbef9fa9226769342eb505358642c28c398
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:28
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:28
```

#### Представление с узла

```sh
root@gitee-postgresql2:/home/ubuntu# redis-cli -a oschina123
127.0.0.1:6379> info Replication
# Replication
role:slave
master_host:10.4.145.105
master_port:6379
master_link_status:up
master_last_io_seconds_ago:5
master_sync_in_progress:0
slave_repl_offset:84
slave_priority:100
slave_read_only:1
connected_slaves:0
master_replid:e1b05cbef9fa9226769342eb505358642c28c398
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:84
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:84
```
