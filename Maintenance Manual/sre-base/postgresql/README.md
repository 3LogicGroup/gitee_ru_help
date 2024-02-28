# postgresql

## 1. Install

```sh
postgres@gitee-postgresql1:~# apt -y install postgresql-12
```

By default, only connections from Localhost with the [peer] authentication can be made to the PostgreSQL server.

```sh
# listen only localhost by default
postgres@gitee-postgresql1:~# grep listen_addresses /etc/postgresql/12/main/postgresql.conf
#listen_addresses = 'localhost' # what IP address(es) to listen on;
# authentication methods by default
root@dlp:~# grep -v -E "^#|^$" /etc/postgresql/12/main/pg_hba.conf
local   all             postgres                                peer
local   all             all                                     peer
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
```

For [peer] authentication, it requires a PostgreSQL user with the same OS username to connect to the PostgreSQL Server.

```sh
# Add a PostgreSQL user and its database using the PostgreSQL administrator
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
# Connect to testdb database
postgres@gitee-postgresql1:~$ psql testdb
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
Type "help" for help.

# View user permissions
testdb=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 root      |                                                            | {}

# View the database
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

# Insert Table Data
testdb=# insert into test_table (no,name) values (01,'Ubuntu');
INSERT 0 1

# Confirm Data
testdb=# select * from test_table;
 no |  name
----+--------
  1 | Ubuntu
(1 row)

# Delete database table
testdb=# drop table test_table;
DROP TABLE
testdb=# \dt
Did not find any relations.
testdb=# \q
postgres@gitee-postgresql1:~$

# Remove the database
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

# Delete User
postgres@gitee-postgresql1:~$ dropuser  harbor
postgres@gitee-postgresql1:~$  psql -c "select usename from pg_user;"
```

## 2.Remote Connection

```sh
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~# vi /etc/postgresql/12/main/postgresql.conf
# line 59: uncomment and change
listen_addresses = '*'
postgres@gitee-postgresql1:~# vi /etc/postgresql/12/main/pg_hba.conf
# add to the end
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
# specify network range you allow to connect on [ADDRESS] section
# if allow all, specify [0.0.0.0/0]
host    all             all             10.4.145.0/24           md5

postgres@gitee-postgresql1:~# systemctl restart postgresql
```

To connect to PostgreSQL database with MD5 password, set a password for each PostgreSQL user.

```sh
postgres@gitee-postgresql1:~$ psql -d testdb
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
Type "help" for help.

# Set or change the password for postgres
testdb=# \password
Enter new password for user "postgres":
Enter it again:

# You can also set or change the password for any user with a PostgreSQL superuser
testdb-# \q
postgres@gitee-postgresql1:~$ psql -c "alter user root with password 'oschina123';"
ALTER ROLE
```

Verify the setting of using MD5 password to connect to the PostgreSQL database from a remote host.

```sh
Passwordless authentication
# PGPASSWORD=oschina123 psql -h 10.4.145.105 -d testdb -U root
root@gitee-postgresql2:/home/ubuntu# psql -h 10.4.145.105 -d testdb -U root
Password for user root:		 # password
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.
# connected
testdb=>
```

## 3.Streaming Replication

### 3.1 Configure the master node

```sh
postgres@gitee-postgresql1:~$ vi /etc/postgresql/12/main/postgresql.conf
# line 59: uncomment and change
listen_addresses = '*'
# line 192: uncomment
wal_level = replica
# line 197: uncomment
synchronous_commit = on
# line 285: uncomment (max number of concurrent connections from streaming clients)
max_wal_senders = 10
# line 287: uncomment and change (minimum number of past log file segments)
wal_keep_segments = 10
# line 300: uncomment and change
synchronous_standby_names = '*'

postgres@gitee-postgresql1:~# vi /etc/postgresql/12/main/pg_hba.conf
# add to the end
# host replication [replication user] [allowed network] [authentication method]
host    replication     rep_user        10.4.145.105/32            md5
host    replication     rep_user        10.4.145.35/32             md5


# create a user for replication
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~$ createuser --replication -P rep_user
Enter password for new role:			# set any password
Enter it again:
postgres@gitee-postgresql1:~$ exit
logout
root@gitee-postgresql1:/home/ubuntu# systemctl restart postgresql
```

### 3.2 Configure the slave node

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
# line 59: uncomment and change
listen_addresses = '*'
# line 315: uncomment
hot_standby = on

root@gitee-postgresql2:~# vi /var/lib/postgresql/12/main/postgresql.auto.conf
# Do not edit this file manually!
# It will be overwritten by the ALTER SYSTEM command.
primary_conninfo = 'user=rep_user password=oschina123 host=10.4.145.105 port=5432 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any application_name=gitee-postgresql2'

root@gitee-postgresql2:~# systemctl start postgresql
```

If the result of the following commands on the master node is as shown below, it can be accepted. Make sure the settings work properly to create databases or insert data on the master node.

```sh
root@gitee-postgresql1:/home/ubuntu# su - postgres
postgres@gitee-postgresql1:~$
postgres@gitee-postgresql1:~$ psql -c "select usename, application_name, client_addr, state, sync_priority, sync_state from pg_stat_replication;"
 usename  | application_name  | client_addr |   state   | sync_priority | sync_state
----------+-------------------+-------------+-----------+---------------+------------
 rep_user | gitee-postgresql2 | 10.4.145.35 | streaming |             1 | sync
(1 row)
```

### 3.3 Test Master-Slave Synchronization

#### Create a database on the master node

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

#### View the database on the slave node

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

## 4. Create users and databases

Create users, associate databases, and grant privileges

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
# Create database and associate user
postgres=# CREATE DATABASE foruda OWNER foruda;
CREATE DATABASE
# Grant user database permissions
postgres=# GRANT ALL PRIVILEGES ON DATABASE foruda TO foruda;
GRANT


################### Create praefect user and database ###################
postgres=# create user praefect with SUPERUSER password 'oschina123';
CREATE ROLE                                                     | {}
# Create database and associate user
postgres=# CREATE DATABASE praefect OWNER praefect;
CREATE DATABASE
# Grant user database permissions
postgres=# GRANT ALL PRIVILEGES ON DATABASE praefect TO praefect;
GRANT
```

```sh
# To set the postgres user as a superuser, follow these steps:
postgres@gitee-postgresql1:~$ psql -U postgres
psql (12.17 (Ubuntu 12.17-0ubuntu0.20.04.1))
Type "help" for help.

postgres=# ALTER USER postgres WITH SUPERUSER;
ALTER ROLE
postgres=# \q
```

5. Reference documents

PostgreSQL Tutorial

[PostgreSQL basic usage guide | Frognew (frognew.com)](https://blog.frognew.com/2021/11/postgresql-get-started.html)
