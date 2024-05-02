# Автономный Redis

## Redis Business

- redis-cratos port:6379
- redis-cache port: 6380
- redis-public port: 6381

## Команда запуска

```sh
# Создать эксклюзивную сеть Docker
docker network create nginx_proxy

cd redis-cache
docker-compose -p redis-cache up -d 

cd redis-cratos
docker-compose -p redis-cratos up -d

cd redis-pubilc
docker-compose -p redis-public up -d 
```