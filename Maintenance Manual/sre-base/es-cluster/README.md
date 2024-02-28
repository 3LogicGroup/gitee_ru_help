# Deploy ES cluster

## 1. Environment description

elasticsearch: 7.16.3

Set up an ES cluster with three nodes.

| Node Role | Hostname | Architecture | Operating System | Specification | IP | Remarks |
| --------- | ---------------- | --------- | ---------------- | ------------------------------------------------------------------ | ------------ | ---- |
| es-master | gitee-es-kakfak1 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.18  |      |
| es-node1  | gitee-es-kakfak2 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.130 |      |
| es-node2  | gitee-es-kakfak3 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.151 |      |

Architecture as follows:

![img](https://cdn.nlark.com/yuque/0/2023/png/1570245/1692588871552-27c73247-c9f9-4bcf-866f-7a22015afc48.png)

One master node, other two nodes only store data

2. Preparation

The following operations are performed on three hosts respectively:

```sh
# Create directories to store data and logs
# Grant permission to the admin user for data and log directories
mkdir /data/elasticsearch/{config,data,logs} -pv

## Create Kibana Configuration Directory
mkdir /data/kibana/config -pv

## Modify the directory permissions of es, otherwise the container startup will fail. The es container is started using the es user with user ID 1000.
chown 1000:1000 /data/elasticsearch/* -R

# Disable firewall and swap partitions
systemctl stop ufw
systemctl disable ufw
# ufw allow 9200
# ufw allow 9300
sudo swapoff -a
sudo sed -i '/swap/ s/^\(.*\)$/#\1/g' /etc/fstab

## ElasticSearch startup error, bootstrap checks failed
## max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
cat >> /etc/sysctl.conf<<EOF
vm.max_map_count=655360
vm.swappiness=1
EOF

sudo sysctl -p
## Reference Document: https://blog.csdn.net/feng12345zi/article/details/80367907
```

## 3. Start ES instances using docker-compose

Now, you need to configure the `docker-compose.yml` file on three hosts, and then use the `docker-compose up -d` command to create and run the containers (user needs to have root permissions).

### 3.1 Deploy `es-master` Node

> `10.4.145.18` Host

Edit docker-compose file

```yaml
version: "3"
services:
  es-master:
    image: elasticsearch:7.16.3
    container_name: es-master
    restart: always
    dns: 10.4.145.142
    environment:
      - "ES_JAVA_OPTS=-Xms4096m -Xmx4096m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - /data/elasticsearch/config/es.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro
      - /data/elasticsearch/data:/usr/share/elasticsearch/data:rw
      - /data/elasticsearch/logs:/usr/share/elasticsearch/log:rw
    ports:
      - 9200:9200
      - 9300:9300
    extra_hosts:
      - "es-master:10.4.145.18"
      - "es-node1:10.4.145.130"
      - "es-node2:10.4.145.151"
  kibana:
    image: kibana:7.16.3
    container_name: kibana
    restart: always
    dns: 10.4.145.142
    environment:
      - TZ="Asia/Shanghai"
    ports:
      - 5601:5601
    volumes:
      - /data/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml:ro
    depends_on:
      - es-master
```

Edit `elasticsearch.yml` configuration

`vim /data/elasticsearch/config/es.yml`

```yml
cluster.name: elasticsearch-cluster
node.name: es-master
network.bind_host: 0.0.0.0
network.publish_host: 10.4.145.18
http.port: 9200
transport.tcp.port: 9300
http.cors.enabled: true
http.cors.allow-origin: "*"
node.master: true
node.data: true
discovery.seed_hosts: ["es-master:9300", "es-node1:9300", "es-node2:9300"]
discovery.zen.minimum_master_nodes: 2
indices.query.bool.max_clause_count: 10240
bootstrap.memory_lock: true
action.destructive_requires_name: true
cluster.initial_master_nodes: ["es-master"]
```

Edit `kibana.yml` configuration file

` vim /data/kibana/config/kibana.yml`

```yml
server.name: kibana
server.host: "0.0.0.0"
# The master address for Elasticsearch
elasticsearch.hosts: "http://es-master:9200"
xpack.monitoring.ui.container.elasticsearch.enabled: true
```

Start the service

```shell
docker-compose up -d
```

### 3.2 Deploy `es-node1` node

> `10.4.145.130` host

Edit docker-compose file

```yaml
version: "3"
services:
  es-node1:
    image: elasticsearch:7.16.3
    container_name: es-node1
    environment:
      - "ES_JAVA_OPTS=-Xms4096m -Xmx4096m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - /data/elasticsearch/config/es.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro
      - /data/elasticsearch/data:/usr/share/elasticsearch/data:rw
      - /data/elasticsearch/logs:/usr/share/elasticsearch/log:rw
    ports:
      - 9200:9200
      - 9300:9300
    extra_hosts:
      - "es-master:10.4.145.18"
      - "es-node1:10.4.145.130"
      - "es-node2:10.4.145.151"
```

Edit 'es.yml' configuration file

`vim /data/elasticsearch/config/es.yml`

```yaml
cluster.name: elasticsearch-cluster
node.name: es-node1
node.master: false
node.data: true

network.bind_host: 0.0.0.0
network.publish_host: 10.4.145.130
http.port: 9200
transport.tcp.port: 9300
http.cors.enabled: true
http.cors.allow-origin: "*"

discovery.zen.ping.unicast.hosts:
  ["es-master:9300", "es-node1:9300", "es-node2:9300"]
discovery.zen.minimum_master_nodes: 2
discovery.zen.ping_timeout: 5s

bootstrap.memory_lock: true
action.destructive_requires_name: true
cluster.initial_master_nodes: ["es-master"]
```

Start the service

```shell
docker-compose up -d
```

### 3.3 Deploy `es-node2` node

> `10.4.145.151` host

Edit docker-compose file

```yaml
version: "3"
services:
  es-node1:
    image: elasticsearch:7.16.3
    container_name: es-node2
    environment:
      - "ES_JAVA_OPTS=-Xms4096m -Xmx4096m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - /data/elasticsearch/config/es.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro
      - /data/elasticsearch/data:/usr/share/elasticsearch/data:rw
      - /data/elasticsearch/log:/usr/share/elasticsearch/log:rw
    ports:
      - 9200:9200
      - 9300:9300
    extra_hosts:
      - "es-master:10.4.145.18"
      - "es-node1:10.4.145.130"
      - "es-node2:10.4.145.151"
```

Edit 'es.yml' configuration file

`vim /data/elasticsearch/config/es.yml`

```yaml
cluster.name: elasticsearch-cluster
node.name: es-node1
node.master: false
node.data: true

network.bind_host: 0.0.0.0
network.publish_host: 10.4.145.151
http.port: 9200
transport.tcp.port: 9300
http.cors.enabled: true
http.cors.allow-origin: "*"

discovery.zen.ping.unicast.hosts:
  ["es-master:9300", "es-node1:9300", "es-node2:9300"]
discovery.zen.minimum_master_nodes: 2
discovery.zen.ping_timeout: 5s

bootstrap.memory_lock: true
action.destructive_requires_name: true
cluster.initial_master_nodes: ["es-master"]
```

Start the service

```shell
docker-compose up -d
```

### 3.4 Verification

Access any address:

- [10.4.145.18:9200/\_cat/health?v](http://10.4.145.18:9200/_cat/health?v)
- [10.4.145.130:9200/\_cat/health?v](http://10.4.145.130:9200/_cat/health?v)
- [10.4.145.151:9200/\_cat/health?v](http://10.4.145.151:9200/_cat/health?v)

## 4. Start 'es_xpack' authentication

Cluster authentication needs to configure keys first, otherwise an error will occur when creating keys for built-in users.

### 4.1 Generate Certificates

```sh
## Log in to one of the node nodes to execute the command, generate the certificate and transfer it to other nodes in the cluster.
docker exec -it es-master bash
/usr/share/elasticsearch/bin/elasticsearch-certutil ca
/usr/share/elasticsearch/bin/elasticsearch-certutil cert --ca elastic-stack-ca.p12
## Both commands can be executed by pressing Enter all the way, no need to add password to the key again.

## After the certificate is created, it is by default in the data directory of ES. Here, we uniformly copy it to the host directory.
mv elastic-* /usr/share/elasticsearch/data/
## Exit the container
exit

## Copy certificates under /data/elasticsearch/data/ to the config directory
cd /data/elasticsearch/config/
cp /data/elasticsearch/data/elastic-*  ./
chmod 644 elastic-*
chown 1000:10000 elastic*

## Copy certificate files to other nodes

# scp /data/elasticsearch/config/elastic-* 10.4.145.130:/data/elasticsearch/config/
# scp /data/elasticsearch/config/elastic-* 10.4.145.151:/data/elasticsearch/config/
```

Add `es.yml` configuration

```yaml
## The following configurations are added to the three machines:

......
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.keystore.path: /usr/share/elasticsearch/config/elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: /usr/share/elasticsearch/config/elastic-certificates.p12
```

Modify the `docker-compose.yml` file

```
version: '3'
services:
  es-master:
    image: elasticsearch:7.16.3
    container_name: es-master
    restart: always
    dns: 10.4.145.142
    environment:
      - "ES_JAVA_OPTS=-Xms4096m -Xmx4096m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - /data/elasticsearch/config/es.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro
      - /data/elasticsearch/data:/usr/share/elasticsearch/data:rw
      - /data/elasticsearch/log:/usr/share/elasticsearch/log:rw
## Mount SSL certificates into the container
      - /data/elasticsearch/config/elastic-certificates.p12:/usr/share/elasticsearch/config/elastic-certificates.p12:ro
      - /data/elasticsearch/config/elastic-stack-ca.p12:/usr/share/elasticsearch/config/elastic-stack-ca.p12:ro
    ports:
      - 9200:9200
      - 9300:9300
    extra_hosts:
      - "es-master:10.4.145.18"
      - "es-node1:10.4.145.130"
      - "es-node2:10.4.145.151"
  kibana:
    image: kibana:7.9.0
    container_name: kibana
    restart: always
    dns: 10.4.145.142
    environment:
      - TZ="Asia/Shanghai"
    ports:
      - 5601:5601
    volumes:
      - /data/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml:ro
    depends_on:
      - es-master
```

Create an account and add a password for the built-in account

`ES` comes with several built-in accounts for managing other integrated components, namely `apm_system`, `beats_system`, `elastic`, `kibana`, `logstash_system`, `remote_monitoring_user`. Before using them, you need to add passwords for these accounts.

```sh
root@gitee-es-kakfak1:/home/ubuntu/workdir/docker-compose/elasticsearch# docker exec -it es-master bash
root@5da05fdec339:/usr/share/elasticsearch# /usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive
Initiating the setup of passwords for reserved users elastic,apm_system,kibana,kibana_system,logstash_system,beats_system,remote_monitoring_user.
You will be prompted to enter passwords as the process progresses.
Please confirm that you would like to continue [y/N]y


Enter password for [elastic]:
Reenter password for [elastic]:
Enter password for [apm_system]:
Reenter password for [apm_system]:
Passwords do not match.
Try again.
Enter password for [apm_system]:
Reenter password for [apm_system]:
Enter password for [kibana_system]:
Reenter password for [kibana_system]:
Enter password for [logstash_system]:
Reenter password for [logstash_system]:
Enter password for [beats_system]:
Reenter password for [beats_system]:
Enter password for [remote_monitoring_user]:
Reenter password for [remote_monitoring_user]:
Changed password for user [apm_system]
Changed password for user [kibana_system]
Changed password for user [kibana]
Changed password for user [logstash_system]
Changed password for user [beats_system]
Changed password for user [remote_monitoring_user]
Changed password for user [elastic]
```

After the configuration is complete, you can access the `es` service in the following way

```sh
curl -XGET -u elastic 'localhost:9200/_xpack/security/user?pretty'
```

Add `es` account password in `kibana` configuration file

`/data/kibana/config/kibana.yml`

```yaml
server.name: kibana
server.host: "0.0.0.0"
Set Language to Chinese
i18n.locale: "zh-CN"
# The master address for Elasticsearch
elasticsearch.hosts: "http://es-master:9200"
elasticsearch.username: "elastic"
elasticsearch.password: "oschina123"
xpack.monitoring.ui.container.elasticsearch.enabled: true
```

Reference blog

[Docker 部署 3 节点 ES 集群 - evescn - 博客园 (cnblogs.com)](https://www.cnblogs.com/evescn/p/16175547.html)

[Elasticsearch Cluster Management (yuque.com)](https://www.yuque.com/wfzx/ninzck/cg7ws3agpud2gix2)