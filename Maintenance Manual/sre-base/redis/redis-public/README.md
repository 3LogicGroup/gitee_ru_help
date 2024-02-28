Container deployment



`docker-compose.yaml`

```yaml
version: '3.1'

services:
  redis-public:
    container_name: redis-public
    image: redis:6
    ports:
      - 6381:6379
    volumes:
      - ./data:/data
    command: redis-server --appendonly yes
    environment:
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
    networks:
      - proxy

networks:
  proxy:
    external: true
    name: nginx_proxy
```
