# redis

## 1.Install 

```sh
root@gitee-postgresql1:~# apt -y install redis
```



## 2.Configure basic settings for Redis

```sh
root@gitee-postgresql1:~# vi /etc/redis/redis.conf
# line 68 : listening interface
# localhost only by default
# if you'd like to connect from other Hosts,
# change to the own IP address or set to [0.0.0.0]
bind 127.0.0.1 ::1
# line 91 : listening port
port 6379
# line 224 : daemonize setting
# if you use Redis as service daemon, turn to [yes]
daemonize yes
# line 275 : number of Databases
# database ID is assigned from 0 to (setting value - 1)
databases 16
# line 307 : save caching Database on Disk
# the default settings below means like follows
# after 900 sec if at least 1 key changed
# after 300 sec if at least 10 keys changed
# after 60 sec if at least 10000 keys changed
# if you'd like to disable this function, comment out all lines to "save ***" or specify [save ""]
save 900 1
save 300 10
save 60 10000
# line 791 : authentication password
requirepass oschina123
# line 1094 : alternative persistence mode ("yes" means enabled)
# if enabled, Redis loses high performance but get more safety
appendonly no
# line 1123 : if enabled [appendonly yes] when writing data on Disk
# [no] means do not fsync by Redis (just let the OS flush the data)
# appendfsync always
appendfsync everysec
# appendfsync no

root@gitee-postgresql1:~# systemctl restart redis
```



## 3.Configure Replication

### 3.1 Master Node Configuration

```sh
root@gitee-postgresql1:~# vi /etc/redis/redis.conf
# line 68 : change to own IP address or [0.0.0.0]
bind 0.0.0.0 ::1
# line 224 : change (run as daemon)
daemonize yes
# line 602 : add follows if need
# min-replicas-to-write : if number of Replica Hosts are online, Primary Host accepts write requests
# min-replicas-max-lag : decision time(sec) for online if Replica Hosts return answer within specified time
min-replicas-to-write 1
min-replicas-max-lag 10
# line 792 : authentication password
requirepass oschina123

root@gitee-postgresql1:~# systemctl restart redis
```

### 3.2 Slave Node Configuration

```sh
root@gitee-postgresql1:~# vi /etc/redis/redis.conf
# line 68 : change to own IP address or [0.0.0.0]
bind 0.0.0.0
# line 224 : change (run as daemon)
daemonize yes
# line 389 : add Primary Host IP address and port
replicaof 10.4.145.105 6379
# line 407 : add authentication password set on Primary Host
masterauth oschina123
# line 437 : verify parameter (set Replica Hosts read-only)
replica-read-only yes

root@gitee-postgresql1:~# systemctl restart redis
```



### 3.3 Verify the statistics information on Replica Hosts



#### View from Master Node

```sh
root@gitee-postgresql1:/home/ubuntu# redis-cli -a oschina123
127.0.0.1:6379> info Replication
# Replication
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

#### View from Node

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
