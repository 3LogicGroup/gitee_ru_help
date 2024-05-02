 # Установка coredns-docker

> Адрес репозитория: https://gitee.com/autom-studio/coredns-docker



Из-за того, что служба systemd-resolved управляет системой DNS для кэширования DNS в операционной системе Ubuntu, файл /etc/resolv.conf на хосте настроен на адрес 127.0.0.53. Сервер coredns использует эту конфигурацию для пересылки, что приводит к бесконечной пересылке.


Отключите службу облачного хоста `systemd-resolved

```sh
systemctl disable systemd-resolved.service 
systemctl stop systemd-resolved.service 
systemctl mask systemd-resolved.service 
```

Создайте каталог сохранения файла конфигурации и скопируйте файл конфигурации
```sh
$ mkdir -p /data/coredns/zones
$ cd coredns-docker/coredns
$ cp hosts /data/coredns/

# Taking adding zone autom.studio as an example:
$ cp autom.studio /data/coredns/zones/autom.studio
$ cp Corefile.template /data/coredns/Corefile
```

Конфигурационный файл /data/coredns/Corefile имеет следующий вид

[Corefile](./Corefile.template)


- Разбор файла хостов
[hosts](./hosts)


- Разрешение зон
[autom.studio](./autom.studio)



Каталог хостов пуст. Вам нужно добавить сопоставление A-записей хостов в этот файл.

> Примечание: я использую последнюю версию образа coredns/coredns:1.10.1.
> Также возможно создание собственного образа.


- Содержимое файла docker-compose.yml выглядит следующим образом

[docker-compose-host-network.yml](./docker-compose-host-network.yml)


Развертывание coredns
```sh
$ docker-compose -f docker-compose-host-network.yml up -d
```


- Файл тестового хоста
```sh
root@gdc-ci-base:/data/coredns# cat hosts

root@gdc-ci-base:/data/coredns# dig lfs.autom.studio @172.18.0.95
;; ANSWER SECTION:
lfs.autom.studio.       23      IN      CNAME   autom.studio.
autom.studio.           23      IN      A       106.12.45.72
......
```

Файл тестовой зоны
```sh
root@gdc-ci-base:/data/coredns# dig ai.autom.studio @172.18.0.95
.....

;; ANSWER SECTION:
ai.autom.studio.        7       IN      A       172.18.0.96


root@gdc-ci-base:/data/coredns# dig test.autom.studio @172.18.0.95
.....
;; ANSWER SECTION:
test.autom.studio.      30      IN      A       172.18.0.97
......
```


- Тест etcd

```sh
A/CNAME record
## Добавить/изменить резолюцию
$ docker exec -it etcd etcdctl put /devops/com/gitlab/devops/@/1 '{"host":"192.168.100.100","ttl":10}'


# /devops — фиксированный префикс; /com/gitee/devops — это разрешаемое доменное имя: devops.gitee.com;
   /@ — фиксированный конечный идентификатор; /1 представляет значение разрешения, которое может быть любым значением, используемым для представления нескольких значений разрешения для одного и того же доменного имени.

Посмотреть парсинг
$ docker exec -it etcd etcdctl get /devops/com/gitlab/devops --prefix
/devops/com/gitlab/devops/@/1
{"host":"192.168.100.100","ttl":10}


Удалить парсинг
$ docker exec -it etcd etcdctl del /devops/com/gitlab/devops/@/1

# PTR-записи (обратный поиск DNS по IP)
# Добавление/изменение парсинга
$ docker exec -it etcd etcdctl put /gitee/arpa/in-addr/192/168/100/100/@ '{"host":"devops.gitlab.com.","ttl":10,"type":"PTR"}' # 192.168.100.100 -> devops.gitee.com
# Просмотр и удаление, как указано выше

```

```sh
root@gdc-ci-base:/data/coredns# dig devops.gitlab.com @172.18.0.95

.....
;; ANSWER SECTION:
devops.gitlab.com.      10      IN      A       192.168.100.100
....
```


Добавьте пользовательское разрешение доменных имен в CoreDNS в Kubernetes
```sh
$ kubectl get cm/coredns -o yaml -n kube-system

apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health
        log
        kubernetes cluster.local in-addr.arpa ip6.arpa {
            pods insecure
            fallthrough in-addr.arpa ip6.arpa
            ttl 30
        }
        prometheus :9153
        forward . 172.18.0.95 {
            max_fails 3
            max_concurrent 1000
            prefer_udp
        }
        cache 30
        loop
        reload
        loadbalance
    }
kind: ConfigMap

```

> Обратите внимание, что после слова 'forward' стоит точка (.).
>
> 172.18.0.95 - это внутренний сервер Coredns центра обработки данных.





Вы также можете добавить записи хоста A следующим образом:

```sh

        hosts {  # Add custom domain name resolution
          192.168.31.x git.k8s.local
          192.168.31.x jenkins.k8s.local
          192.168.31.x harbor.k8s.local
          fallthrough
        }
```



Вы можете добавить следующее содержимое в Corefile, чтобы настроить разрешение доменов с подстановочными знаками и записи A:

```yaml
.:53 {
    # Other configuration items
    # ...
    
    # Wildcard domain resolution
    rewrite name regex (.*)\.internal\.example\.com internal.example.com
    
    # A Record Resolution
    hosts {
        10.0.0.1 a.internal.example.com
        10.0.0.2 b.internal.example.com
        # Other records
        # ...
    }
}

```



Директива rewrite используется для разрешения доменов с подстановочными знаками, разрешая все доменные имена, заканчивающиеся на .internal.example.com, в internal.example.com. Директива hosts используется для настройки разрешения записи A, разрешая указанное доменное имя в соответствующий IP-адрес.

Не забудьте изменить путь к Corefile и перезагрузить конфигурационный файл, чтобы настройки вступили в силу.





FQA:


Устранение проблемы с непрерывным перезапуском CoreDNS

https://www.zerchin.xyz/2021/08/12/CoreDNS%E4%B8%8D%E6%96%AD%E9%87%8D%E5%90%AF%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5/