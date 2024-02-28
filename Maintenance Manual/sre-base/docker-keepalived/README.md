# docker-keepalived

base on alpine 3.11

environment and default value:
Bind network card
KEEPALIVED_BIND_INTERFACE=ens33
# Route number (same for both nodes)
KEEPALIVED_ROUTER_ID=100
Node prefix
KEEPALIVED_NODE_PREFIX=node
Node status
KEEPALIVED_NODE_STATES=BACKUP,BACKUP
# Node Priority
KEEPALIVED_NODE_PRIORITYS=100,90
Node address
KEEPALIVED_NODE_IPS=192.168.8.161,192.168.8.162
# Virtual Address (dev:ip,dev:ip)
KEEPALIVED_VIRTUAL_IPS=ens33:192.168.8.160/24,ens33:192.168.9.160/24
# Authentication password (same for both nodes)
KEEPALIVED_AUTH_PASS=abcd1234
# Startup parameters (config-id=node01,node02)
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