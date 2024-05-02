## Развертывание nginx

### Создание сети docker

```
docker network create nginx_proxy -d bridge
```

### Подготовка SSL-сертификатов, xxx_ssl.conf, conf.d/xxx.conf

1. Файл ssl-сертификата соответствует `ssl.d/certs/xxx.crt` в xxx_ssl.conf.
2. conf.d/xxx.conf - это точка входа сервера, см. пример
3. Создайте файл dhparams.pem

```
cd ssl.d/certs
openssl dhparam -out dhparams.pem 2048
```

### Запуск nginx

```
docker-compose up -d
```