# Redis standalone

## Redis Business

- redis-cratos port:6379
- redis-cache port: 6380
- redis-public port: 6381

## Startup command

```sh
# Create Docker exclusive network
docker network create nginx_proxy

cd redis-cache
docker-compose -p redis-cache up -d 

cd redis-cratos
docker-compose -p redis-cratos up -d

cd redis-pubilc
docker-compose -p redis-public up -d 
```