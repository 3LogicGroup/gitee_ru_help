# postgresql

## 1. Установка

```sh
postgres@gitee-postgresql1:~# apt -y install postgresql-12
```

По умолчанию к серверу PostgreSQL можно подключаться только с Localhost с аутентификацией [peer].

```sh
# по умолчанию слушает только localhost
postgres@gitee-postgresql1:~# grep listen_addresses /etc/postgresql/12/main/postgresql.conf
# listen_addresses = 'localhost' # какой IP-адрес(а) прослушивать;
# методы аутентификации по умолчанию
root@dlp:~# grep -v -E "^#|^$" /etc/postgresql/12/main/pg_hba.conf
local   all             postgres                                peer
local   all             all                                     peer
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
```

Для аутентификации [peer] требуется пользователь PostgreSQL с таким же именем пользователя ОС для подключения к серверу PostgreSQL.

```sh
# Добавьте пользователя PostgreSQL и его базу данных с помощью администратора PostgreSQL
Switch to postgres user
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~$ createuser root
postgres@gitee-postgresql1:~$ createdb testdb -O root
View users and databases
postgres@gitee-postgresql1:~$ psql -c "select usename from pg_user;"
 usename
----------
 postgres
 root
(2 rows)

postgres@gitee-postgresql1:~$ psql -l
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges
-----------+----------+----------+---------+---------+-----------------------
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 testdb    | root     | UTF8     | C.UTF-8 | C.UTF-8 |
(4 rows)
```

```sh
# Подключитесь к базе данных testdb
postgres@gitee-postgresql1:~$ psql testdb
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
Type "help" for help.

# Просмотр разрешений пользователя
testdb=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 root      |                                                            | {}

# Просмотр базы данных
testdb=# \l
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges
-----------+----------+----------+---------+---------+-----------------------
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 testdb    | root     | UTF8     | C.UTF-8 | C.UTF-8 |
(4 rows)

Create table
testdb=# create table test_table (no int, name text);
CREATE TABLE

View table
testdb=# \dt
           List of relations
 Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
 public | test_table | table | postgres
(1 row)

# Вставить данные в таблицу
testdb=# insert into test_table (no,name) values (01,'Ubuntu');
INSERT 0 1

# Подтвердить данные
testdb=# select * from test_table;
 no |  name
----+--------
  1 | Ubuntu
(1 row)

# Удалить таблицу базы данных
testdb=# drop table test_table;
DROP TABLE
testdb=# \dt
Did not find any relations.
testdb=# \q
postgres@gitee-postgresql1:~$

# Удалить базу данных
ubuntu@dlp:~$ dropdb testdb
ubuntu@dlp:~$ psql -l
                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 template0 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres

# Удалить пользователя
postgres@gitee-postgresql1:~$ dropuser  harbor
postgres@gitee-postgresql1:~$  psql -c "select usename from pg_user;"
```

## 2.Удаленное подключение

```sh
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~# vi /etc/postgresql/12/main/postgresql.conf
# строка 59: откомментировать и изменить
listen_addresses = '*'
postgres@gitee-postgresql1:~# vi /etc/postgresql/12/main/pg_hba.conf
# добавить в конец
# ТИП  БАЗА ДАННЫХ        ПОЛЬЗОВАТЕЛЬ            АДРЕС                 МЕТОД

# "local" только для сокетных соединений с доменом Unix
local   all             all                                     peer
# Локальные соединения IPv4:
host    all             all             127.0.0.1/32            md5
# Локальные соединения IPv6:
host    all             all             ::1/128                 md5
# Разрешите соединения для репликации с localhost пользователю с
# привилегией репликации.
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
# укажите диапазон сетей, к которым разрешено подключаться на участке [ADDRESS]
# если разрешено все, укажите [0.0.0.0/0]
host    all             all             10.4.145.0/24           md5

postgres@gitee-postgresql1:~# systemctl restart postgresql
```

Чтобы подключиться к базе данных PostgreSQL с паролем MD5, задайте пароль для каждого пользователя PostgreSQL.

```sh
postgres@gitee-postgresql1:~$ psql -d testdb
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
Type "help" for help.

# Установите или измените пароль для postgres
testdb=# \password
Enter new password for user "postgres":
Enter it again:

# Вы также можете установить или изменить пароль для любого пользователя с правами суперпользователя PostgreSQL
testdb-# \q
postgres@gitee-postgresql1:~$ psql -c "alter user root with password 'oschina123';"
ALTER ROLE
```

Проверьте настройку использования пароля MD5 для подключения к базе данных PostgreSQL с удаленного узла.

```sh
Passwordless authentication
# PGPASSWORD=oschina123 psql -h 10.4.145.105 -d testdb -U root
root@gitee-postgresql2:/home/ubuntu# psql -h 10.4.145.105 -d testdb -U root
Password for user root:		 # password
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.
# подключено
testdb=>
```

## 3.Потоковая репликация

### 3.1 Настройка главного узла

```sh
postgres@gitee-postgresql1:~$ vi /etc/postgresql/12/main/postgresql.conf
# строка 59: раскомментировать и изменить
listen_addresses = '*'
# строка 192: раскомментировать
wal_level = replica
# строка 197: раскомментировать
synchronous_commit = on
# строка 285: раскомментировать (максимальное количество одновременных соединений от потоковых клиентов)
max_wal_senders = 10
# строка 287: раскомментировать и изменить (минимальное количество прошлых сегментов файла журнала)
wal_keep_segments = 10
# строка 300: раскомментировать и изменить
synchronous_standby_names = '*'

postgres@gitee-postgresql1:~# vi /etc/postgresql/12/main/pg_hba.conf
# добавляем в конец
# репликация хоста [пользователь репликации] [разрешенная сеть] [метод аутентификации]
host    replication     rep_user        10.4.145.105/32            md5
host    replication     rep_user        10.4.145.35/32             md5


# создаем пользователя для репликации
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~$ createuser --replication -P rep_user
Enter password for new role:			# set any password
Enter it again:
postgres@gitee-postgresql1:~$ exit
logout
root@gitee-postgresql1:/home/ubuntu# systemctl restart postgresql
```

### 3.2 Настройка ведомого узла

```sh
root@gitee-postgresql2:/home/ubuntu# systemctl stop postgresql
root@gitee-postgresql2:/home/ubuntu# rm -rf /var/lib/postgresql/12/main/*
root@gitee-postgresql2:/home/ubuntu# su - postgres
postgres@gitee-postgresql2:~$ pg_basebackup -R -h 10.4.145.105 -U rep_user -D /var/lib/postgresql/12/main -P
Password:
32522/32522 kB (100%), 1/1 tablespace
postgres@gitee-postgresql2:~$ exit
logout

root@gitee-postgresql2:~# vi /etc/postgresql/12/main/postgresql.conf
# строка 59: раскомментировать и изменить
listen_addresses = '*'
# строка 315: раскомментировать
hot_standby = on

root@gitee-postgresql2:~# vi /var/lib/postgresql/12/main/postgresql.auto.conf
# Не редактируйте этот файл вручную!
# Он будет перезаписан командой ALTER SYSTEM.
primary_conninfo = 'user=rep_user password=oschina123 host=10.4.145.105 port=5432 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any application_name=gitee-postgresql2'

root@gitee-postgresql2:~# systemctl start postgresql
```

Если результат выполнения следующих команд на главном узле выглядит так, как показано ниже, его можно принять. Убедитесь, что настройки работают правильно для создания баз данных или вставки данных на главном узле.

```sh
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~$
postgres@gitee-postgresql1:~$ psql -c "select usename, application_name, client_addr, state, sync_priority, sync_state from pg_stat_replication;"
 usename  | application_name  | client_addr |   state   | sync_priority | sync_state
----------+-------------------+-------------+-----------+---------------+------------
 rep_user | gitee-postgresql2 | 10.4.145.35 | streaming |             1 | sync
(1 row)
```

### 3.3 Тест синхронизации ведущего и ведомого узлов

#### Создайте базу данных на ведущем узле

```sh
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~$ createdb testdb2 -O root
postgres@gitee-postgresql1:~$ psql -l
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges
-----------+----------+----------+---------+---------+-----------------------
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 testdb    | root     | UTF8     | C.UTF-8 | C.UTF-8 | =Tc/root             +
           |          |          |         |         | root=CTc/root
 testdb2   | root     | UTF8     | C.UTF-8 | C.UTF-8 |
(5 rows)
```

#### Просмотр базы данных на ведомом узле

```sh
root@gitee-postgresql2:~# su - postgres
postgres@gitee-postgresql2:~$
postgres@gitee-postgresql2:~$ psql -l
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges
-----------+----------+----------+---------+---------+-----------------------
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 testdb    | root     | UTF8     | C.UTF-8 | C.UTF-8 | =Tc/root             +
           |          |          |         |         | root=CTc/root
 testdb2   | root     | UTF8     | C.UTF-8 | C.UTF-8 |
(5 rows)
```

## 4. Создание пользователей и баз данных

Создание пользователей, создание баз данных и предоставление привилегий

```sh
postgres@gitee-postgresql1:~$ psql -U postgres -W
Password:
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
Type "help" for help.
postgres=# \l
                               List of databases
     Name     |  Owner   | Encoding | Collate |  Ctype  |   Access privileges
--------------+----------+----------+---------+---------+-----------------------
 notaryserver | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 notarysigner | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 postgres     | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 praefect     | gitee    | UTF8     | C.UTF-8 | C.UTF-8 |
 registry     | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 template0    | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
              |          |          |         |         | postgres=CTc/postgres
 template1    | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
              |          |          |         |         | postgres=CTc/postgres
 testdb       | root     | UTF8     | C.UTF-8 | C.UTF-8 | =Tc/root             +
              |          |          |         |         | root=CTc/root
(8 rows)

################### Create gitee_grms user and database ###################
postgres=# create user gitee_grms with SUPERUSER password 'oschina123';
CREATE ROLE
postgres=# CREATE DATABASE grms OWNER gitee_grms;
CREATE DATABASE
postgres=# GRANT ALL PRIVILEGES ON DATABASE grms TO gitee_grms;
GRANT

################### Create the foruda user and database ###################
postgres=# create user foruda with SUPERUSER password 'oschina123';
CREATE ROLE                                                     | {}
# Создайте базу данных и назначьте пользователя
postgres=# CREATE DATABASE foruda OWNER foruda;
CREATE DATABASE
# Предоставьте пользователю права доступа к базе данных
postgres=# GRANT ALL PRIVILEGES ON DATABASE foruda TO foruda;
GRANT


################### Create praefect user and database ###################
postgres=# create user praefect with SUPERUSER password 'oschina123';
CREATE ROLE                                                     | {}
# Создайте базу данных и назначьте пользователя
postgres=# CREATE DATABASE praefect OWNER praefect;
CREATE DATABASE
# Предоставьте пользователю права доступа к базе данных
postgres=# GRANT ALL PRIVILEGES ON DATABASE praefect TO praefect;
GRANT
```

```sh
# Чтобы установить пользователя postgres в качестве суперпользователя, выполните следующие действия:
postgres@gitee-postgresql1:~$ psql -U postgres
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
Type "help" for help.

postgres=# ALTER USER postgres WITH SUPERUSER;
ALTER ROLE
postgres=# \q
```

5. Справочные документы

Учебник по PostgreSQL

[Руководство по базовому использованию PostgreSQL | Frognew (frognew.com)](https://blog.frognew.com/2021/11/postgresql-get-started.html)
