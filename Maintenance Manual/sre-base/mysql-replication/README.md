# Высокая доступность MySQL master-slave



Онлайн-установка

## 1. Установите источник для mysql5.7

```sh
root@gitee-mysql-master:/home/ubuntu/workdir # wget https://repo.mysql.com//mysql-apt-config_0.8.12-1_all.deb
--2022-12-09 17:05:27--  https://repo.mysql.com//mysql-apt-config_0.8.12-1_all.deb
Resolving host repo.mysql.com (repo.mysql.com)... 96.16.68.238
Connecting to repo.mysql.com (repo.mysql.com)|96.16.68.238|:443... Connected.
HTTP request sent, awaiting response... 200 OK
Length: 36306 (35K) [application/x-debian-package]
Saving to: 'mysql-apt-config_0.8.12-1_all.deb'
 
mysql-apt-config_0.8.1 100%[=========================>]  35.46K   187KB/s    Time taken 0.2s
 
2022-12-09 17:05:28 (187 KB/s) - Saved "mysql-apt-config_0.8.12-1_all.deb" [36306/36306]
 
root@gitee-mysql-master:/home/ubuntu/workdir # sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb 
Selecting previously unselected package mysql-apt-config.
(Reading database ... Currently installed 187436 files and directories.)
Preparing to unpack mysql-apt-config_0.8.12-1_all.deb ...
Unpacking mysql-apt-config (0.8.12-1)...
Setting up mysql-apt-config (0.8.12-1) ...
 
```



```sh
root@gitee-mysql-master:/home/ubuntu/workdir # apt update
Hit:1 http://mirrors.aliyun.com/ubuntu focal InRelease
Fetching: 2 http://mirrors.aliyun.com/ubuntu focal-updates InRelease [114 kB]
Fetching:3 http://repo.mysql.com/apt/ubuntu bionic InRelease [20.0 kB]
Error:3 http://repo.mysql.com/apt/ubuntu bionic InRelease
  Unable to verify the following signatures because there is no public key: NO_PUBKEY 467B942D3A79BD29
Get:4 http://mirrors.aliyun.com/ubuntu focal-backports InRelease [108 kB]
Fetching: 5 http://mirrors.aliyun.com/ubuntu focal-security InRelease [114 kB]
Get: 6 http://mirrors.aliyun.com/ubuntu focal-updates/main i386 Packages [761 kB]
Get:7 focal-updates/main amd64 Packages
Get:8 http://mirrors.aliyun.com/ubuntu focal-updates/main amd64 DEP-11 Metadata [275 kB]
Get:9 http://mirrors.aliyun.com/ubuntu focal-updates/universe amd64 Packages [1,009 kB]
Fetching:10 http://mirrors.aliyun.com/ubuntu focal-updates/universe i386
Get:11 http://mirrors.aliyun.com/ubuntu focal-updates/universe amd64 DEP-11 Metadata [408 kB]
Get:12 http://mirrors.aliyun.com/ubuntu focal-updates/multiverse amd64
  DEP-11 Metadata [940 B]
Fetching: 13 http://mirrors.aliyun.com/ubuntu focal-backports/main amd64 DEP-11 Metadata [7,940 B]
Get:14 http://mirrors.aliyun.com/ubuntu focal-backports/universe amd64 DEP-11 Metadata [30.5 kB]
Get: 15 http://mirrors.aliyun.com/ubuntu focal-security/main amd64 DEP-11
Get:16 http://mirrors.aliyun.com/ubuntu focal-security/universe amd64 DEP-11 Metadata [93.9 kB]
Get:17 http://mirrors.aliyun.com/ubuntu focal-security/multiverse amd64 DEP-11 Metadata [940 B]
Reading package list... Done
W: GPG error: http://repo.mysql.com/apt/ubuntu bionic InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 467B942D3A79BD29
E: Repository 'http://repo.mysql.com/apt/ubuntu bionic InRelease' does not have a valid signature.
N: Unable to update from this source securely, so it is disabled by default.
 
 
root@gitee-mysql-master:/home/ubuntu/workdir # sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
Executing: /tmp/apt-key-gpghome.6S4Xo2qxW8/gpg.1.sh --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
gpg: key 467B942D3A79BD29: public key "MySQL Release Engineering <mysql-build@oss.oracle.com>" imported
gpg: Total processed: 1
gpg: Imported: 1
```



## 2. Установите MySQL-5.7

В это время в каталоге /etc/apt/source.list.d/ создается файл mysql.list, и система обновляется. Мы можем проверить, что источник mysql5.7 появился, используя apt-cache policy mysql-server.

```sh
root@gitee-mysql-master:/home/ubuntu/workdir # apt-cache policy mysql-server
mysql-server:
  Installed: (none)
  Candidate: 8.0.35-0ubuntu0.20.04.1
  Version table:
     8.0.35-0ubuntu0.20.04.1 500
        500 http://nova.clouds.archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages
        500 http://security.ubuntu.com/ubuntu focal-security/main amd64 Packages
     8.0.19-0ubuntu5 500
        500 http://nova.clouds.archive.ubuntu.com/ubuntu focal/main amd64 Packages
     5.7.42-1ubuntu18.04 500
        500 http://repo.mysql.com/apt/ubuntu bionic/mysql-5.7 amd64 Packages
```



### 2.1 Установите mysql-клиент

```sh
root@gitee-mysql-master:/home/ubuntu/workdir# sudo apt install mysql-client=5.7.42-1ubuntu18.04
Reading package lists... Done
Analyzing the dependency tree of the software package
Reading state information... Done
The following software will be installed simultaneously:
  libaio1 libtinfo5 mysql-community-client
The following NEW packages will be installed:
  libaio1 libtinfo5 mysql-client mysql-community-client
Upgraded 0 packages, installed 4 new packages, uninstalled 0 packages, 87 packages remaining to be upgraded.
Downloading archive of size 15.4 MB
Unzipping will consume an additional 98.9 MB of space.
Do you want to continue? [Y/n]
Get: 1 http://mirrors.aliyun.com/ubuntu focal/main amd64 libaio1 amd64 0.3.112-5 [7,184 B]
Get:2 http://mirrors.aliyun.com/ubuntu focal/universe amd64 libtinfo5 amd64 6.2-0ubuntu2 [83.0 kB]
Get:3 http://repo.mysql.com/apt/ubuntu bionic/mysql-5.7 amd64 mysql-community-client amd64 5.7.40-1ubuntu18.04 [15.2 MB]
Get:4 http://repo.mysql.com/apt/ubuntu bionic/mysql-5.7 amd64 mysql-client amd64 5.7.40-1ubuntu18.04 [69.6 kB]
Downloaded 15.4 MB, took 4 seconds (3,539 kB/s)
Selecting the unselected package libaio1:amd64.
(Reading database ... Currently installed with 187441 files and directories.)
Preparing to unpack .../libaio1_0.3.112-5_amd64.deb ...
Unpacking libaio1:amd64 (0.3.112-5) ...
Selecting previously unselected package libtinfo5:amd64.
Preparing to unzip .../libtinfo5_6.2-0ubuntu2_amd64.deb ...
Unpacking libtinfo5:amd64 (6.2-0ubuntu2) ...
Selecting previously unselected package mysql-community-client.
Preparing to extract .../mysql-community-client_5.7.40-1ubuntu18.04_amd64.deb
Unpacking mysql-community-client (5.7.40-1ubuntu18.04) in progress...
Selecting previously unselected package mysql-client.
Preparing to unpack .../mysql-client_5.7.40-1ubuntu18.04_amd64.deb  ...
Unpacking mysql-client (5.7.40-1ubuntu18.04) ...
Setting up libaio1:amd64 (0.3.112-5) ...
Setting up libtinfo5:amd64 (6.2-0ubuntu2) ...
Setting up mysql-community-client (5.7.40-1ubuntu18.04) ...
Setting up mysql-client (5.7.40-1ubuntu18.04) ...
Processing triggers for man-db (2.9.1-1)...
Processing triggers for libc-bin (2.31-0ubuntu9.7) ...
root@zgk-Ubuntu-T01:~# sudo apt install mysql-community=5.7.40-1ubuntu18.04
Reading package lists... Done
Analyzing the dependency tree of the software package
Reading status information... Complete

```



### 2.2 Установите mysql-community-server

```sh
root@gitee-mysql-master:/home/ubuntu/workdir# sudo apt install mysql-community-server=5.7.42-1ubuntu18.04
Reading package lists... Done
Analyzing the dependency tree of the software package
Reading state information... Done
The following software will be installed simultaneously:
  libmecab2
The following NEW packages will be installed:
  libmecab2 mysql-community-server
Upgraded 0 packages, installed 2 new packages, uninstalled 0 packages, 88 packages remaining to be upgraded.
Need to download 40.1 MB of archive.
Unzipping will consume an additional 229 MB of space.
Do you want to continue? [Y/n]
Get:1 http://mirrors.aliyun.com/ubuntu focal/main amd64 libmecab2 amd64 0.996-10build1 [233 kB]
Get:2 http://repo.mysql.com/apt/ubuntu bionic/mysql-5.7 amd64 mysql-community-server amd64 5.7.40-1ubuntu18.04 [39.8 MB]
Downloaded 40.1 MB in 5 seconds (8,313 kB/s)
Preparing software package...
```



### 2.3 Установите mysql-сервер

```sh
root@zgk-Ubuntu-T01:~# sudo apt install mysql-server=5.7.42-1ubuntu18.04
Reading package lists... Done
Analyzing the dependency tree of the software package
Reading state information... Done
The following NEW packages will be installed:
  mysql-server
Upgraded 0 packages, installed 1 new package, uninstalled 0 packages, 88 packages remaining to be upgraded.
Need to download 69.6 kB of archive.
Unzipping will consume an additional 79.9 kB of space.
Get:1 http://repo.mysql.com/apt/ubuntu bionic/mysql-5.7 amd64 mysql-server amd64 5.7.40-1ubuntu18.04 [69.6 kB]
Downloaded 69.6 kB, took 1 second (98.2 kB/s)
Selecting previously unselected package mysql-server.
(Reading database ... Currently installed 187685 files and directories.)
Preparing to unpack .../mysql-server_5.7.40-1ubuntu18.04_amd64.deb  ...
Unpacking mysql-server (5.7.40-1ubuntu18.04)...
Setting up mysql-server (5.7.40-1ubuntu18.04)...
```



## 3. Проверка и тестирование

После установки вы можете увидеть версию MySQL как 5.7.40 с помощью команды 'dpkg -l | grep mysql'.



```SH
root@gitee-mysql-master:/home/ubuntu/workdir# dpkg -l | grep mysql
ii  mysql-apt-config                0.8.12-1                          all          Auto configuration for MySQL APT Repo.
ii  mysql-client                    5.7.42-1ubuntu18.04               amd64        MySQL Client meta package depending on latest version
ii  mysql-common                    5.8+1.0.5ubuntu2                  all          MySQL database common files, e.g. /etc/mysql/my.cnf
ii  mysql-community-client          5.7.42-1ubuntu18.04               amd64        MySQL Client
ii  mysql-community-server          5.7.42-1ubuntu18.04               amd64        MySQL Server
ii  mysql-server                    5.7.42-1ubuntu18.04               amd64        MySQL Server meta package depending on latest version
```

После ввода пароля с помощью команды 'mysql -u root -p' вы сможете нормально войти в базу данных

```sh
root@gitee-mysql-master:/home/ubuntu/workdir# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.42 MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> quit
Bye
```

Проверьте, правильно ли функционирует база данных, и измените права на вход в систему с правами root.

```sh
root@gitee-mysql-slave:/home/ubuntu/workdir# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.42 MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select user,host from user;
+---------------+-----------+
| user          | host      |
+---------------+-----------+
| mysql.session | localhost |
| mysql.sys     | localhost |
| root          | localhost |
+---------------+-----------+
3 rows in set (0.00 sec)

mysql> update user set host='%' where user='root';
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select user,host from user;
+---------------+-----------+
| user          | host      |
+---------------+-----------+
| root          | %         |
| mysql.session | localhost |
| mysql.sys     | localhost |
+---------------+-----------+
3 rows in set (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> quit;
Bye
```



Настройте разрешение доступа с других IP

```sh
root@gitee-mysql-slave:/home/ubuntu/workdir# cat /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
log-error       = /var/log/mysql/error.log

port = 3306
# По умолчанию мы принимаем соединения только с localhost
#bind-address   = 127.0.0.1
bind-address    = 0.0.0.0
# Отключение символических ссылок рекомендуется для предотвращения различных рисков безопасности
symbolic-links=0

root@gitee-mysql-master:/home/ubuntu/workdir# /etc/init.d/mysql restart
Restarting mysql (via systemctl): mysql.service.
```



## 4. Репликация



### 4.1 master

```sh
root@gitee-mysql-master:/home/ubuntu/workdir# cat /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
log-error       = /var/log/mysql/error.log

port = 3306
# По умолчанию мы принимаем соединения только с localhost
#bind-address   = 127.0.0.1
bind-address    = 0.0.0.0
# Отключение символических ссылок рекомендуется для предотвращения различных рисков безопасности
symbolic-links=0

# Конфигурация набора символов
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

Slow query log configuration
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2

# Конфигурация буфера
key_buffer_size = 256M
thread_cache_size = 128
table_open_cache = 4096
table_definition_cache = 4096
query_cache_type = 1
query_cache_size = 64M

Connection configuration
max_connections = 4096
max_allowed_packet = 64M
max_connect_errors = 100

# Конфигурация InnoDB
default_storage_engine = InnoDB
innodb_buffer_pool_size = 16G
innodb_flush_log_at_trx_commit = 2
innodb_buffer_pool_instances = 8
innodb_log_buffer_size = 16M
innodb_file_per_table = 1
innodb_log_file_size = 1G
innodb_flush_method = O_DIRECT
innodb_io_capacity = 2000
innodb_buffer_pool_instances = 4
innodb_stats_on_metadata = 0
innodb_read_io_threads = 4
innodb_write_io_threads = 4
innodb_thread_concurrency = 0

# Копирование конфигурации (если используется копирование)
server-id = 101
log_bin = /var/log/mysql/mysql-bin.log

# Другая конфигурация
tmp_table_size = 256M
max_heap_table_size = 256M
open_files_limit = 65535

root@gitee-mysql-master:/home/ubuntu/workdir# systemctl restart mysql
root@gitee-mysql-master:/home/ubuntu/workdir# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.42-log MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> grant replication slave on *.* to replica@'%' identified by 'oschina';
Query OK, 0 rows affected, 1 warning (0.01 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)

mysql> exit
Bye
```



### 4.2 slave

```sh
root@gitee-mysql-slave:/home/ubuntu/workdir# cat /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
log-error       = /var/log/mysql/error.log

port = 3306
# По умолчанию мы принимаем соединения только с localhost
#bind-address   = 127.0.0.1
bind-address    = 0.0.0.0
# Отключение символических ссылок рекомендуется для предотвращения различных рисков безопасности
symbolic-links=0

# Конфигурация набора символов
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

Slow query log configuration
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2

# Конфигурация буфера
key_buffer_size = 256M
thread_cache_size = 128
table_open_cache = 4096
table_definition_cache = 4096
query_cache_type = 1
query_cache_size = 64M

Connection configuration
max_connections = 4096
max_allowed_packet = 64M
max_connect_errors = 100

# Конфигурация InnoDB
default_storage_engine = InnoDB
innodb_buffer_pool_size = 16G
innodb_flush_log_at_trx_commit = 2
innodb_buffer_pool_instances = 8
innodb_log_buffer_size = 16M
innodb_file_per_table = 1
innodb_log_file_size = 1G
innodb_flush_method = O_DIRECT
innodb_io_capacity = 2000
innodb_buffer_pool_instances = 4
innodb_stats_on_metadata = 0
innodb_read_io_threads = 4
innodb_write_io_threads = 4
innodb_thread_concurrency = 0

# Копирование конфигурации
server-id = 102
log_bin = /var/log/mysql/mysql-bin.log
read_only=1

# Другая конфигурация
tmp_table_size = 256M
max_heap_table_size = 256M
open_files_limit = 65535
root@gitee-mysql-slave:/home/ubuntu/workdir# systemctl restart mysql
```



### 4.3 Настройка синхронизации

Операции на хосте

```sh
root@gitee-mysql-master:/home/ubuntu/workdir# mysql -uroot -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.42-log MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> flush tables with read lock;
Query OK, 0 rows affected (0.01 sec)

mysql> show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000002 |      15414 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)
root@gitee-mysql-master:/home/ubuntu/workdir# mysqldump -u root -p --all-databases --lock-all-tables --events > mysql_dump.sql
Enter password:
root@gitee-mysql-master:/home/ubuntu/workdir# mysql -uroot -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 6
Server version: 5.7.42-log MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> unlock tables;
Query OK, 0 rows affected (0.00 sec)

mysql> exit
Bye
ubuntu@gitee-mysql-master:~/workdir$ sudo scp -i gitee_ru_p mysql_dump.sql ubuntu@10.4.145.133:/home/ubuntu/
The authenticity of host '10.4.145.133 (10.4.145.133)' can't be established.
ECDSA key fingerprint is SHA256:bOEbvbozBdVR2zBOd64bryUbNU6FihqCXUs3KB6Hcl0.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.4.145.133' (ECDSA) to the list of known hosts.
mysql_dump.sql                                                                                                100%  867KB  64.8MB/s   00:00
```



Операции на резервной машине

```sh
root@gitee-mysql-slave:/home/ubuntu# mysql -u root -p < /home/ubuntu/mysql_dump.sql
Enter password:
root@gitee-mysql-slave:/home/ubuntu# mysql -uroot -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.42-log MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> change master to master_host='10.4.145.132',master_user='replica', master_password='oschina', master_log_file='mysql-bin.000002',master_log_pos=15414;
Query OK, 0 rows affected, 2 warnings (0.10 sec)

mysql> start slave;
Query OK, 0 rows affected (0.01 sec)

mysql> show slave status\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: 10.4.145.132
                  Master_User: replica
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000001
          Read_Master_Log_Pos: 864
               Relay_Log_File: gitee-mysql-slave-relay-bin.000002
                Relay_Log_Pos: 320
        Relay_Master_Log_File: mysql-bin.000001
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
              Replicate_Do_DB:
          Replicate_Ignore_DB:
           Replicate_Do_Table:
       Replicate_Ignore_Table:
      Replicate_Wild_Do_Table:
  Replicate_Wild_Ignore_Table:
                   Last_Errno: 0
                   Last_Error:
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 864
              Relay_Log_Space: 539
              Until_Condition: None
               Until_Log_File:
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File:
           Master_SSL_CA_Path:
              Master_SSL_Cert:
            Master_SSL_Cipher:
               Master_SSL_Key:
        Seconds_Behind_Master: 0
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error:
               Last_SQL_Errno: 0
               Last_SQL_Error:
  Replicate_Ignore_Server_Ids:
             Master_Server_Id: 101
                  Master_UUID: 1550ddb0-97ef-11ee-9743-fa163ed275e7
             Master_Info_File: /var/lib/mysql/master.info
                    SQL_Delay: 0
          SQL_Remaining_Delay: NULL
      Slave_SQL_Running_State: Slave has read all relay log; waiting for more updates
           Master_Retry_Count: 86400
                  Master_Bind:
      Last_IO_Error_Timestamp:
     Last_SQL_Error_Timestamp:
               Master_SSL_Crl:
           Master_SSL_Crlpath:
           Retrieved_Gtid_Set:
            Executed_Gtid_Set:
                Auto_Position: 0
         Replicate_Rewrite_DB:
                 Channel_Name:
           Master_TLS_Version:
1 row in set (0.00 sec)
```



### 4.4 Проверка базы данных



Создайте базу данных на master-сервере следующим образом

```sh
mysql> create database hujianlidb charset=utf8;
Query OK, 1 row affected (0.02 sec)

mysql>
```

Проверьте, синхронизирована ли база данных с ведомым устройством

```sh
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hujianlidb         |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```



### 4.5 Включите полусинхронную репликацию

Установите плагин полусинхронной репликации и включите полусинхронную репликацию в основной базе данных

```
root@gitee-mysql-master:/home/ubuntu/workdir# mysql -uroot -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 7
Server version: 5.7.42-log MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> install plugin rpl_semi_sync_master soname 'semisync_master.so';
Query OK, 0 rows affected (0.03 sec)

mysql> set global rpl_semi_sync_master_enabled=on;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables like "%semi%";
+-------------------------------------------+------------+
| Variable_name                             | Value      |
+-------------------------------------------+------------+
| rpl_semi_sync_master_enabled              | ON         |
......
6 rows in set (0.01 sec)

mysql> show plugins;
.......
| rpl_semi_sync_master       | ACTIVE   | REPLICATION        | semisync_master.so | GPL     |
| rpl_semi_sync_slave        | ACTIVE   | REPLICATION        | semisync_slave.so  | GPL     |
+----------------------------+----------+--------------------+--------------------+---------+
```

Установите плагин полусинхронной репликации и включите полусинхронную репликацию в ведомом устройстве

```sh
mysql> install plugin rpl_semi_sync_slave soname 'semisync_slave.so';
Query OK, 0 rows affected (0.01 sec)

mysql> set global rpl_semi_sync_slave_enabled=on;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables like "%semi%";
+---------------------------------+-------+
| Variable_name                   | Value |
+---------------------------------+-------+
| rpl_semi_sync_slave_enabled     | ON    |

mysql> show plugins;
| rpl_semi_sync_slave        | ACTIVE   | REPLICATION        | semisync_slave.so | GPL     |
+----------------------------+----------+--------------------+-------------------+---------+

# Restart slave I/O thread to activate semi-synchronous replication
mysql> stop slave io_thread;
Query OK, 0 rows affected (0.00 sec)

mysql> start slave io_thread;
Query OK, 0 rows affected (0.00 sec)
```

Чтобы включить функцию полусинхронной репликации во время запуска, вы можете добавить rpl_semi_sync_slave_enabled=on и rpl_semi_sync_master_enabled=on в конфигурационный файл my.cnf.

Как показано ниже

```sh
root@gitee-mysql-master:/home/ubuntu/workdir# cat /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
log-error       = /var/log/mysql/error.log

port = 3306
# По умолчанию мы принимаем соединения только с localhost
#bind-address   = 127.0.0.1
bind-address    = 0.0.0.0
# Отключение символических ссылок рекомендуется для предотвращения различных рисков безопасности
symbolic-links=0

# Конфигурация набора символов
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

Slow query log configuration
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2

# Конфигурация буфера
key_buffer_size = 256M
thread_cache_size = 128
table_open_cache = 4096
table_definition_cache = 4096
query_cache_type = 1
query_cache_size = 64M

Connection configuration
max_connections = 4096
max_allowed_packet = 64M
max_connect_errors = 100

# Конфигурация InnoDB
default_storage_engine = InnoDB
innodb_buffer_pool_size = 16G
innodb_flush_log_at_trx_commit = 2
innodb_buffer_pool_instances = 8
innodb_log_buffer_size = 16M
innodb_file_per_table = 1
innodb_log_file_size = 1G
innodb_flush_method = O_DIRECT
innodb_io_capacity = 2000
innodb_buffer_pool_instances = 4
innodb_stats_on_metadata = 0
innodb_read_io_threads = 4
innodb_write_io_threads = 4
innodb_thread_concurrency = 0

# Копирование конфигурации (если используется копирование)
server-id = 101
log_bin = /var/log/mysql/mysql-bin.log

# Другая конфигурация
tmp_table_size = 256M
max_heap_table_size = 256M
open_files_limit = 65535

# Полусинхронная репликация
rpl_semi_sync_slave_enabled=on
rpl_semi_sync_master_enabled=on
```

Проверьте, правильно ли работает полусинхронная репликация в основной базе данных.

```sh
mysql> show global status like "%semi%";
Rpl_semi_sync_master_clients 1 # Ведомый уже подключен к ведущему с помощью полусинхронной репликации
Rpl_semi_sync_master_status ON # Указывает, что он уже находится в режиме полусинхронной репликации
Rpl_semi_sync_master_no_tx 0 # Количество неудачных попыток получения ведомых коммитов
Rpl_semi_sync_master_yes_tx 0 # Счетчик успешного получения ответа на транзакцию ведомого
```

Check the semi-synchronous replication status on the replica

```sh
mysql> show global status like "%semi%";
+----------------------------+-------+
| Variable_name              | Value |
+----------------------------+-------+
| Rpl_semi_sync_slave_status | ON    |
+----------------------------+-------+

Rpl_semi_sync_slave_status ON # Enable semi-sync replication on the slave
```



### 4.6 Создание пользователя

Создать обычного пользователя

```sql
# Создайте gitee на ведущем и ведомом устройствах
create user gitee@'%' identified by 'oschina123';
# предоставить все привилегии на gitlabhq_production.* для gitee@'%' с опцией grant;
GRANT ALL PRIVILEGES ON *.* TO 'gitee'@'%';
FLUSH PRIVILEGES;
```



Создать пользователя, доступного только для чтения

```sql
// Create a readonly user on the slave database
CREATE USER 'readonly'@'%' IDENTIFIED BY 'oschina123';
GRANT SELECT ON gitee_production.* TO 'readonly'@'%';
```

## 5. Просмотр конфигурации MySQL

```sh
# Проверьте максимальное количество соединений для MySQL
mysql> show variables like '%max_connections%';
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 4096  |
+-----------------+-------+
1 row in set (0.01 sec)

# Просмотр максимального количества соединений, которые может обработать сервер:
mysql> show global status like 'Max_used_connections';
+----------------------+-------+
| Variable_name        | Value |
+----------------------+-------+
| Max_used_connections | 56    |
+----------------------+-------+
1 row in set (0.01 sec)

# Просмотр соединений MySQL с этим сервером
# На производственных серверах базу данных нельзя перезапустить легко, поэтому мы должны вручную освободить некоторые неиспользуемые соединения.
mysql> show processlist;

# Вы можете увидеть список соединений с данными MySQL, и у каждого из них будет идентификатор процесса (в первом столбце таблицы). Нам нужно ввести эту команду:
mysql> kill 1180421; (где 1180421 — идентификатор процесса, который нужно уничтожить, найденный в списке процессов)


# Проверьте, включены ли в базе данных медленные запросы, команда выглядит следующим образом, подробности показаны на рисунке 11-9.
mysql> show variables like "%slow%";
mysql> show variables like "%long_query%";
```



Конфигурация разрешений пользователей

```sh
# Проверьте всех пользователей текущей базы данных:
mysql> use mysql;
mysql> select user, host, authentication_string from user;
+---------------+-----------+-------------------------------------------+
| user          | host      | authentication_string                     |
+---------------+-----------+-------------------------------------------+
| root          | %         | *4236565CADB78A2BC29F54F4B9A86CE47A79F3DC |
| mysql.session | localhost | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE |
| mysql.sys     | localhost | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE |
| replica       | %         | *DC9368F8F6FC0339A837E03C9232EC2D2351DAA2 |
| gitee         | %         | *4236565CADB78A2BC29F54F4B9A86CE47A79F3DC |
+---------------+-----------+-------------------------------------------+
5 rows in set (0.00 sec)


# Предоставьте пользователю суперпривилегии (допустимы оба варианта - super и ALL PRIVILEGES):
GRANT super ON *.* TO 'mysql'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'localhost';


# Удалите у пользователя суперпривилегии (допустимы оба варианта - super и ALL PRIVILEGES):
REVOKE super ON *.* FROM 'mysql'@'localhost';
REVOKE ALL PRIVILEGES ON *.* FROM 'mysql'@'localhost';


# Проверьте права, предоставленные пользователю
mysql> SHOW GRANTS FOR 'gitee'@'%';
+----------------------------------------------------------------------------------+
| Grants for gitee@%                                                               |
+----------------------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'gitee'@'%'                                       |
| GRANT ALL PRIVILEGES ON `lfs`.* TO 'gitee'@'%' WITH GRANT OPTION                 |
| GRANT ALL PRIVILEGES ON `gitlabhq_production`.* TO 'gitee'@'%' WITH GRANT OPTION |
+----------------------------------------------------------------------------------+
3 rows in set (0.00 sec)

mysql> SHOW GRANTS FOR 'root'@'%';
+-------------------------------------------------------------+
| Grants for root@%                                           |
+-------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION |
+-------------------------------------------------------------+
1 row in set (0.00 sec)

mysql> SHOW GRANTS FOR 'replica'@'%';
+-------------------------------------------------+
| Grants for replica@%                            |
+-------------------------------------------------+
| GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%' |
+-------------------------------------------------+
1 row in set (0.00 sec)
```
