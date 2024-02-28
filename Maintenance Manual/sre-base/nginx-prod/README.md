## Deploy nginx

### Create docker network

```
docker network create nginx_proxy -d bridge
```

### Prepare SSL certificates, xxx_ssl.conf, conf.d/xxx.conf

1. The ssl certificate file corresponds to `ssl.d/certs/xxx.crt` in xxx_ssl.conf.
2. conf.d/xxx.conf is the server entry point, see example
3. Create dhparams.pem

```
cd ssl.d/certs
openssl dhparam -out dhparams.pem 2048
```

### Start nginx

```
docker-compose up -d
```