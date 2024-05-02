# docker-keepalived

основано на alpine 3.11

окружение и значение по умолчанию:
Привязка сетевой карты
KEEPALIVED_BIND_INTERFACE=ens33
# Номер маршрута (одинаковый для обоих узлов)
KEEPALIVED_ROUTER_ID=100
Префикс узла
KEEPALIVED_NODE_PREFIX=node
Статус узла
KEEPALIVED_NODE_STATES=BACKUP,BACKUP
# Приоритет узла
KEEPALIVED_NODE_PRIORITYS=100,90
Адрес узла
KEEPALIVED_NODE_IPS=192.168.8.161,192.168.8.162
# Виртуальный адрес (dev:ip,dev:ip)
KEEPALIVED_VIRTUAL_IPS=ens33:192.168.8.160/24,ens33:192.168.9.160/24
# Пароль аутентификации (одинаковый для обоих узлов)
KEEPALIVED_AUTH_PASS=abcd1234
# Параметры запуска (config-id=node01,node02)
KEEPALIVED_COMMAND_LINE_ARGUMENTS=--log-detail --dump-conf --config-id node1

docker run -it --rm --network=host --name=keepalived \
-e "KEEPALIVED_BIND_INTERFACE=ens33" \
-e "KEEPALIVED_ROUTER_ID=100" \
-e "KEEPALIVED_NODE_PREFIX=node" \
-e "KEEPALIVED_NODE_STATES=BACKUP,BACKUP" \
-e "KEEPALIVED_NODE_PRIORITYS=100,90" \
-e "KEEPALIVED_NODE_IPS=192.168.8.176,192.168.8.177" \
-e "KEEPALIVED_VIRTUAL_IPS=ens33:192.168.8.160/24,ens33:192.168.9.160/24" \
-e "KEEPALIVED_AUTH_PASS=abcd1234" \
-e "KEEPALIVED_COMMAND_LINE_ARGUMENTS=--log-detail --dump-conf --config-id node1"  \
--cap-add=NET_RAW \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
keepalived:2.0.20.6