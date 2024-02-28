# LFS Server (Cloud Storage)

LFS Server storage backend is OSS, currently implemented support for Alibaba Cloud and implemented abstract interface support for Azure Blob, AWS S3, Tencent Cloud, etc.

## LFS Server

> Repository URL: https://gitee.com/oscstudio/lfsoss.git

## Build Image

- [Dockerfile](./Dockerfile)

```sh
$ docker build -t hub.gitee.com/library/lfsoss:v1.0.0 .
$ docker push hub.gitee.com/library/lfsoss:v1.0.0
```

Create Database

```shell
mysql> create database lfs;
Query OK, 1 row affected (1.46 sec)

mysql> create user gitee@'%' identified by '123456';
Query OK, 0 rows affected (0.29 sec)

mysql> grant all privileges on lfs.* to gitee@'%' with grant option;
Query OK, 0 rows affected (0.33 sec)

mysql> alter user gitee@'%' identified with mysql_native_password by '123456';
Query OK, 0 rows affected (0.27 sec)
```

## Create minio key

```shell
# Access Key
u5C4unUfImuOQrfMp9OU

# Secret Key
dZGu9loZ6xJNguXP9aKjA0cW9fIQFzh8BpMjMSPn

```

## Modify configuration file

- [Configuration file](./config/lfsserve.json)

## Start Container

```sh
$ docker-compose up -d
```

- [docker-copmpose.yaml](./docker-compose.yaml)