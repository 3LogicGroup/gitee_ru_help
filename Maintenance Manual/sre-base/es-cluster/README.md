# Развертывание кластера ES

## 1. Описание среды

elasticsearch: 7.16.3

Создайте кластер ES с тремя узлами.

| Роль узла | Имя узла | Архитектура | Операционная система | Спецификация | IP | Заметки |
| --------- | ---------------- | --------- | ---------------- | ------------------------------------------------------------------ | ------------ | ---- |
| es-master | gitee-es-kakfak1 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.18  |      |
| es-node1  | gitee-es-kakfak2 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.130 |      |
| es-node2  | gitee-es-kakfak3 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.151 |      |

Архитектура выглядит следующим образом:

![img](https://cdn.nlark.com/yuque/0/2023/png/1570245/1692588871552-27c73247-c9f9-4bcf-866f-7a22015afc48.png)

Один узел - главный, а два других только хранят данные.

2. Подготовка

Следующие операции выполняются на трех узлах соответственно:

```sh
# Создайте каталоги для хранения данных и журналов.
# Предоставьте права пользователю admin на каталоги данных и журналов
mkdir /data/elasticsearch/{config,data,logs} -pv

## Создание каталога конфигурации Kibana
mkdir /data/kibana/config -pv

## Измените права доступа к каталогу es, иначе запуск контейнера завершится неудачей. Контейнер es запускается с помощью пользователя es с идентификатором пользователя 1000.
chown 1000:1000 /data/elasticsearch/* -R

# Отключите брандмауэр и разделы подкачки
systemctl stop ufw
systemctl disable ufw
# ufw разрешить 9200
# ufw разрешить 9300
sudo swapoff -a
sudo sed -i '/swap/ s/^\(.*\)$/#\1/g' /etc/fstab

## Ошибка запуска ElasticSearch, проверка загрузки не удалась
## максимальное количество виртуальных областей памяти vm.max_map_count [65530] слишком мало, увеличьте по крайней мере до [262144]
cat >> /etc/sysctl.conf<<EOF
vm.max_map_count=655360
vm.swappiness=1
EOF

sudo sysctl -p
## Справочный документ: https://blog.csdn.net/feng12345zi/article/details/80367907
```

## 3. Запуск экземпляров ES с помощью docker-compose

Теперь вам нужно настроить файл `docker-compose.yml` на трех узлах, а затем использовать команду `docker-compose up -d` для создания и запуска контейнеров (пользователь должен иметь права root).

### 3.1 Развертывание узла `es-master`

> Хост `10.4.145.18`

Отредактируйте файл docker-compose

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

Отредактируйте конфигурацию `elasticsearch.yml`.

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

Отредактируйте файл конфигурации `kibana.yml`.

` vim /data/kibana/config/kibana.yml`

```yml
server.name: kibana
server.host: "0.0.0.0"
# The master address for Elasticsearch
elasticsearch.hosts: "http://es-master:9200"
xpack.monitoring.ui.container.elasticsearch.enabled: true
```

Запустить сервис

```shell
docker-compose up -d
```

### 3.2 Развертывание узла `es-node1`

> хост `10.4.145.130`

Отредактируйте файл docker-compose

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

Отредактируйте файл конфигурации 'es.yml'

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

Запустите сервис

```shell
docker-compose up -d
```

### 3.3 Развертывание узла `es-node2`

> хост `10.4.145.151`

Отредактируйте файл docker-compose

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

Отредактируйте файл конфигурации 'es.yml'

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

Запустите сервис

```shell
docker-compose up -d
```

### 3.4 Верификация

Доступ к любому адресу:

- [10.4.145.18:9200/\_cat/health?v](http://10.4.145.18:9200/_cat/health?v)
- [10.4.145.130:9200/\_cat/health?v](http://10.4.145.130:9200/_cat/health?v)
- [10.4.145.151:9200/\_cat/health?v](http://10.4.145.151:9200/_cat/health?v)

## 4. Запустите аутентификацию 'es_xpack'

Для кластерной аутентификации необходимо сначала настроить ключи, иначе при создании ключей для встроенных пользователей возникнет ошибка.

### 4.1 Генерация сертификатов

```sh
## Войдите на один из узлов, чтобы выполнить команду, сгенерировать сертификат и передать его на другие узлы кластера.
docker exec -it es-master bash
/usr/share/elasticsearch/bin/elasticsearch-certutil ca
/usr/share/elasticsearch/bin/elasticsearch-certutil cert --ca elastic-stack-ca.p12
## Обе команды можно выполнить, нажав Enter до конца, не нужно снова добавлять пароль к ключу.

## После создания сертификата он по умолчанию находится в каталоге данных ES. Здесь мы равномерно скопируем его в каталог хоста.
mv elastic-* /usr/share/elasticsearch/data/
## Выходим из контейнера
exit

## Скопируйте сертификаты из каталога /data/elasticsearch/data/ в каталог config
cd /data/elasticsearch/config/
cp /data/elasticsearch/data/elastic-* ./
chmod 644 elastic-*
chown 1000:10000 elastic*

## Скопируйте файлы сертификатов на другие узлы

# scp /data/elasticsearch/config/elastic-* 10.4.145.130:/data/elasticsearch/config/
# scp /data/elasticsearch/config/elastic-* 10.4.145.151:/data/elasticsearch/config/
```

Добавьте конфигурацию `es.yml`.

```yaml
## На три машины добавлены следующие конфигурации:

......
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.keystore.path: /usr/share/elasticsearch/config/elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: /usr/share/elasticsearch/config/elastic-certificates.p12
```

Измените файл `docker-compose.yml`.

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
## Установите SSL-сертификаты в контейнер
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

Создайте учетную запись и добавьте пароль для встроенной учетной записи

В комплект поставки `ES` входит несколько встроенных учетных записей для управления другими интегрированными компонентами, а именно `apm_system`, `beats_system`, `elastic`, `kibana`, `logstash_system`, `remote_monitoring_user`. Перед их использованием необходимо добавить пароли для этих учетных записей.

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

После завершения настройки вы можете получить доступ к службе `es` следующим образом

```sh
curl -XGET -u elastic 'localhost:9200/_xpack/security/user?pretty'
```

Добавьте пароль учетной записи `es` в файл конфигурации `kibana`.

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

Блог справочных материалов

[Развертывание в Docker 3-узлового ES-кластера — evescn — Blog Park (cnblogs.com)](https://www.cnblogs.com/evescn/p/16175547.html)

[Управление кластером Elasticsearch (yuque.com)](https://www.yuque.com/wfzx/ninzck/cg7ws3agpud2gix2)