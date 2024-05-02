# LFS Server (облачное хранилище)

Бэкэнд хранилища LFS Server является OSS, в настоящее время реализована поддержка Alibaba Cloud и реализована поддержка абстрактного интерфейса для Azure Blob, AWS S3, Tencent Cloud и т.д.

## LFS-сервер

> URL репозитория: https://gitee.com/oscstudio/lfsoss.git

## Создайте образ

- [Dockerfile](./Dockerfile)

```sh
$ docker build -t hub.gitee.com/library/lfsoss:v1.0.0 .
$ docker push hub.gitee.com/library/lfsoss:v1.0.0
```

Создайте базу данных

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

## Создайте ключ minio

```shell
# Ключ доступа
u5C4unUfImuOQrfMp9OU

# Секретный ключ
dZGu9loZ6xJNguXP9aKjA0cW9fIQFzh8BpMjMSPn

```

## Измените файл конфигурации

- [Конфигурационный файл](./config/lfsserve.json)

## Запуск контейнера

```sh
$ docker-compose up -d
```

- [docker-copmpose.yaml](./docker-compose.yaml)