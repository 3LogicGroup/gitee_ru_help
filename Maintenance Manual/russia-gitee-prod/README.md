## Список основных компонентов Gitee

### Список служб зависимостей с открытым исходным кодом

{"Сервисное имя"=>"Redis_cluster", "Метод развертывания"=>"Контейнер", "Ссылка"=>"Официальный сайт", "Версия"=>"5.0", "Описание сервиса"=>"Используется для контроля содержимого с помощью кластера Redis"}
| ------------- | -------- | ----------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| MySQL | Двоичный | [Официальный сайт](https://www.mysql.com)
  \ | 5,7 | Gitee использует реляционную базу данных |
  Один master и один worker, разделение чтения и записи                             |
{"Сервисное имя"=>"PostgreSQL", "Метод развертывания"=>"Бинарный", "Ссылка"=>"[Официальный веб-сайт](https://www.postgresql.org)", "Версия"=>"12.17", "Описание сервиса"=>"Используется для общего доступа для uda, praefect и grms к реляционной базе данных"}
| Minio | Бинарный | [Официальный веб-сайт](https://min.io)
  \ |RELEASE.2023-12-13T23-28-55Z |MinIO — высокопроизводительное объектное хранилище |
| Haproxy | Бинарный  | [Официальный веб-сайт](https://haproxy.org) | 2.6.16 | 2-узловой DNS Round Robin | Ветка разработки HAProxy Load Balancer (зеркало git.haproxy.org) |
Varnish
Redis
| Redis_cluster | Контейнер | [Официальный веб-сайт](https://redis.io)
  \|5.0|Кластер redis, используемый для проверки контента
  три master и три slave |
| Kafka | Контейнер | [Официальный веб-сайт](https://kafka.apache.org)
  \ |3.6.1 |События вебхука |
  Кластер из 3 узлов <br /> Развернут на том же сервере, что и Elasticsearch |
Elasticsearch

### Список общедоступных компонентов Gitee

| Имя службы | Метод развертывания | URL-адрес репозитория | Ветка | Метки узлов развертывания | Описание службы | Примечания |
| ------------------ | -------- | ------------------------------------------------------------- | ------- | ------------- | ------------------------------------------------------------------ | --------------------------------------------------------- |
| gitee-http-pilot | Диаграмма | [Репозиторий Gitee](https://gitee.com/oscstudio/pilot)
  | master | giteeFrontend | Git через HTTP-интерфейсную службу
  | Предоставляет службу аутентификации для загрузки и отправки репозитория git по протоколу HTTPS |
gitee-ssh-pilot
| gitee-svnsbz | Диаграмма | [Репозиторий Gitee](https://gitee.com/oscstudio/svnsbz) | master | giteeFrontend | Динамический прокси-сервер SVN | Прокси-сервер Svn Frontend |
| Gitaly | Двоичный | [Репозиторий Gitee](https://gitee.com/oscstudio/gitaly)
  \ | выпуск | 3 физических узла | Серверная служба Git grpc
Служба хранения репозитория Git, предоставляет интерфейс работы Git.
  |Gitaly, gitee-GNK и Sserver рекомендуется развертывать на одном сервере. |
| gitee-praefect | Диаграмма | [Репозиторий Gitee](https://gitee.com/oscstudio/gitaly)
  \ |релиз |giteePubcomm |Gitaly маршрутизация и репликация трафика
  Зависимости промежуточного программного обеспечения:<br />PG <br /> и Gitaly должны находиться в одной ветке репозитория |
| gitee-GNK | Двоичный | Репозиторий Gitee https://gitee.com/oscstudio/gitee-hook | master | 3 физических узла | Собственные перехватчики Git | Рекомендуется развернуть Gitaly, gitee-GNK и Sserver на одном сервере |
| Sserver-binary | Двоичный | Gitee Repository https://gitee.com/oscstudio/sserver-binary | master | 3 физических узла | Серверная служба Svn | Рекомендуется развернуть Gitaly, gitee-GNK и Sserver на одном сервере |
| Lfsoss | Контейнер | Репозиторий Gitee https://gitee.com/oscstudio/lfsoss |
{"gitee-ums-admin"=>{"repo"=>"chart", "url"=>"Репозиторий Gitee", "external_url"=>"https://gitee.com/oschina/gitee-ums" }}
{"branch"=>"зеркало git.haproxy.org", "description"=>"2 DNS-опрос", "gitee-ums-review"=>{"repo"=>"chart", "url "= >"Репозиторий Gitee", "external_url"=>"https://gitee.com/oschina/gitee-ums"}, "зависимости"=>{"промежуточное ПО"=>["MySQL", "Kafka", "Redis -UMS"]}}
gitee-rollingbox
gitee-foruda
| gitee-foruda-admin | Диаграмма | [Репозиторий Gitee](https://gitee.com/oscstudio/foruda-admin.git)
  | master | giteeInternal | Служба хранения объектов — веб-конец
  |Зависимость промежуточного программного обеспечения:<br />PG MinIO |
| gitee-grms | Диаграмма | [Репозиторий Gitee](https://gitee.com/oscstudio/grms)
  | master | giteePubcomm | Служба управления серверной частью репозитория
  |Зависимость промежуточного программного обеспечения:<br />PG |
| gitee-pages | docker | | | Развертывание одного контейнера | | |

### Список серверных служб Gitee

|Имя службы |Метод развертывания |Метки узлов развертывания |Описание службы |
| -------------------- | -------- | ------------ | ------ -------------------------------------------------- - |
| gitee-webunicorn | Диаграмма | giteeRuby | Основная служба сообщества Gitee |
| gitee-graphqlunicorn | Диаграмма | giteeRuby |
  Внутренняя система Gitee предоставляет сервис gitee Rails с интерфейсом Graphql |
| gitee-gitecron |Диаграмма | giteePubcomm | Сервис Gitee для выполнения одноразовых и запланированных скриптов в gitee Rails |
gitee-authunicorn
gitee-sidekiq

### Список услуг внешнего интерфейса Gitee

|Имя сервиса |Метод развертывания |Метка узла развертывания |Описание сервиса |
| ------------------- | -------- | ------------- | ------ -------------------------------------------------- -------- |
| gitee-community-web | Диаграмма | giteeInternal
| gitee-ent-web | Диаграмма | giteeInternal
  Интерфейс Gitee для корпоративной версии |
| gitee-assets | Диаграмма | giteeFrontend | Служба обратного прокси-сервера с динамической маршрутизацией HTTP |



## Развертывание основных компонентов Gitee

### Развертывание серверного проекта Gitee

Создавайте и развертывайте серверные проекты для всех общих репозиториев на Gitee.

- gitee-gitecron
- gitee-webunicorn
- gitee-graphqlunicorn
- gitee-authunicorn
- gitee-sidekiq

> Предварительное условие: создать пространство имен и ключи доступа к частному хранилищу.

````sh
# Provide Credentials on the Command Line to Create a Secret, Name: gitee

```shell
kubectl create ns gitee-prod
kubectl -n gitee-prod create secret docker-registry gitee \
  --docker-server=hub.gitee.com \
  --docker-username=gitee \
  --docker-password=Oschina123 \
  --docker-email=gitee@gitee.com
```
````

Добавьте собственное разрешение доменных имен в Kubernetes CoreDNS.

```sh
$ kubectl get cm/coredns -o yaml -n kube-system
apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . 10.4.145.142 {
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

> Обратите внимание, что после «forward» стоит точка.
>
> 10.4.145.142 — это внутренний сервер Coredns дата-центра.

Вы также можете добавить записи хоста A следующим образом:

```
hosts {  # Add custom domain name resolution
  192.168.31.x git.k8s.local
  192.168.31.x jenkins.k8s.local
  192.168.31.x harbor.k8s.local
  fallthrough
}
```

Вы можете добавить следующее содержимое в Corefile, чтобы настроить разрешение домена с подстановочными знаками и записи A:

```
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

Директива rewrite используется для разрешения домена с подстановочными знаками, разрешая все доменные имена, заканчивающиеся на .internal.example.com, во внутренний.example.com. Директива hosts используется для настройки разрешения записи, разрешая указанное доменное имя для соответствующего IP-адреса. 

Не забудьте изменить путь к Corefile и перезагрузить файл конфигурации, чтобы конфигурация вступила в силу.

#### Список рабочих образов Dockerfile

##### gitee-gitecron

##### gitee-webunicorn

##### gitee-graphqlunicorn

##### gitee-authunicorn

##### gitee-sidekiq

#### Список сервисов по развертыванию диаграмм

```sh
# gitee-giteecron
# 2C2G replicaCount: 2 node_role: giteePubcomm
helm -n gitee-prod upgrade gitee-giteecron -f ./gitee-giteecron/values.yaml ./gitee-giteecron --install

# gitee-webunicorn
# 2C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-webunicorn -f ./gitee-webunicorn/values.yaml ./gitee-webunicorn --install

# gitee-graphqlunicorn
# 2C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-graphqlunicorn -f ./gitee-graphqlunicorn/values.yaml ./gitee-graphqlunicorn --install

# gitee-authunicorn
# 2C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-authunicorn -f ./gitee-authunicorn/values.yaml ./gitee-authunicorn --install

# gitee-sidekiq
# 4C4G replicaCount: 3 node_role: giteeRuby
helm -n gitee-prod upgrade gitee-sidekiq -f ./gitee-sidekiq/values.yaml ./gitee-sidekiq --install
```

### Развертывание проекта Gitee Pub-Comm

Создайте и разверните общие компоненты для всех общих репозиториев gitee.

- gitee-http-pilot
- gitee-ssh-pilot
- gitee-svnsbz
- gitee-praefect
- gitee-ums-admin
- gitee-ums-consumer
- ~~gitee-ums-review~~
- gitee-rollingbox
- gitee-foruda
- gitee-foruda-admin
- gitee-grms
- ~~git-pages~~
- gitee-lfsoss



#### Список рабочих образов Dockerfile

Образы находятся в каталоге репозитория. Найдите файл Dockerfile или Dockerfile-base в каталоге репозитория.

##### gitee-http-pilot

##### gitee-ssh-pilot

##### gitee-svnsbz

##### gitee-praefect

##### gitee-ums-admin

##### gitee-ums-consumer

##### ~~gitee-ums-review~~

##### gitee-rollingbox

##### gitee-foruda

##### gitee-foruda-admin

##### gitee-grms

##### gitee-lfsoss

##### ~~git-pages~~



#### Список сервисов по развертыванию диаграмм

```sh
# gitee-http-pilot
# 4C4G replicaCount: 1 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-http-pilot -f ./gitee-http-pilot/values.yaml ./gitee-http-pilot --install

# gitee-ssh-pilot
# 4C4G replicaCount: 1 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-ssh-pilot -f ./gitee-ssh-pilot/values.yaml ./gitee-ssh-pilot --install

# gitee-svnsbz
# 4C4G replicaCount: 1 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-svnsbz -f ./gitee-svnsbz/values.yaml ./gitee-svnsbz --install

# gitee-praefect
# 2C2G replicaCount: 3 node_role: giteePubcomm
helm -n gitee-prod upgrade gitee-praefect -f ./gitee-praefect/values.yaml ./gitee-praefect --install

# gitee-ums-admin
# 2C2G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-ums-admin -f ./gitee-ums-admin/values.yaml ./gitee-ums-admin --install

# gitee-ums-consumer
# 4C4G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-ums-consumer -f ./gitee-ums-consumer/values.yaml ./gitee-ums-consumer --install

# gitee-ums-review Not ready for delivery
#helm -n gitee-prod upgrade gitee-ums-review -f ./gitee-ums-review/values.yaml ./gitee-ums-review --install

# gitee-rolling-box
# 4C4G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-rolling-box -f ./gitee-rolling-box/values.yaml ./gitee-rolling-box  --install

# gitee-foruda
# 4C4G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-foruda -f ./gitee-foruda/values.yaml ./gitee-foruda --install
Health Check Interface
#https://foruda.autom.studio/health

# gitee-foruda-admin
# 2C2G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-foruda-admin -f ./gitee-foruda-admin/values.yaml ./gitee-foruda-admin --install
Modify the .env.build configuration as follows
# https://foruda.autom.studio

# gitee-lfsoss
# 2C2G replicaCount: 1 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-lfsoss -f ./gitee-lfsoss/values.yaml ./gitee-lfsoss --install
```



> Примечание: gitee-lfsoss необходимо изменить политику утилизации pv на режим Retain, изменить удаление Helm, чтобы сохранить pvc.
>
> Ссылка: https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/change-pv-reclaim-policy/
>
> [Удаление постоянных томов · Задача #1875 · helm/helm (github.com)](https://github.com/helm/helm/issues/1875)



### Развертывание фронтенд-проекта Gitee

Создавайте и развертывайте проекты внешнего интерфейса для всех общих репозиториев на gitee.

- gitee-community-web
- ~~gitee-edu-api~~
- ~~gitee-edu-web~~
- gitee-ent-web
- gitee-активы

#### Список рабочих образов Dockerfile

##### gitee-community-web

##### gitee-ent-web

##### gitee-активы

#### Список сервисов по развертыванию диаграмм

```sh
# gitee-community-web
# 2C2G replicaCount: 3 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-community-web -f gitee-community-web/values.yaml ./gitee-community-web --install

# gitee-edu-api not delivered yet
# helm -n gitee-prod upgrade gitee-edu-api -f ./gitee-edu-api/values.yaml ./gitee-edu-api --install

# gitee-edu-web not delivered yet
# helm -n gitee-prod upgrade gitee-edu-web -f ./gitee-edu-web/values.yaml ./gitee-edu-web --install

# gitee-ent-web
# 2C2G replicaCount: 2 node_role: giteeInternal
helm -n gitee-prod upgrade gitee-ent-web -f ./gitee-ent-web/values.yaml ./gitee-ent-web --install

# gitee-assets
# 2C4G replicaCount: 3 node_role: giteeFrontend
helm -n gitee-prod upgrade gitee-assets -f ./gitee-assets/values.yaml ./gitee-assets --install
```

## Непрерывная интеграция и непрерывное развертывание (CICD) на основе Jenkins в Kubernetes

Обновление вручную

Фронтенд

- gitee-assets

```sh
# Build frontend image
OSC_GIT_COMMIT=$(git rev-parse --short HEAD | cut -c 1-7)
docker build --pull --build-arg USERPASS=admin:P@ssw0rd --build-arg VERSION="${OSC_GIT_COMMIT}" -f Dockerfile.assets -t hub.gitee.com/gitee/assets:${OSC_GIT_COMMIT} .

Deploy front-end
helm upgrade -i --wait --atomic  --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-assets gitee-assets
```

- gitee-community-web

```shell
OSC_GIT_COMMIT=$(git rev-parse --short HEAD | cut -c 1-7)
sed 's@NEXT_PUBLIC_ENT_SITE_URL=.*@NEXT_PUBLIC_ENT_SITE_URL=https://enterprise.gitee.ru@g' -i packages/gitee-community-web/.env
sed 's@GRAPHQL_SCHEMA_API_URL=.*@GRAPHQL_SCHEMA_API_URL=https://gitee.ru/graphql@g' -i packages/gitee-community-web/.env
docker build --pull --build-arg GITEE_APP_VERSION=${OSC_GIT_COMMIT} -f docker/community.Dockerfile -t hub.gitee.com/gitee-frontend/gitee-community-web:${OSC_GIT_COMMIT} .

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-community-web gitee-community-web
```

Бекэнд

- unicorn

```sh
helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-webunicorn gitee-webunicorn

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-graphqlunicorn gitee-graphqlunicorn

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-giteecron gitee-giteecron

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-authunicorn gitee-authunicorn

helm upgrade -i --wait --atomic --set podAnnotations.rllme=\\"`date +%Y%m%d%s`\\" -n gitee-prod gitee-sidekiq gitee-sidekiq
```

Откат

```sh
Roll back to the previous version
Befor_versio=$(helm history gitee-assets -n gitee-prod | grep -v REVISION | awk '{print $1}' | tail -n 2 | head -n 1)
helm rollback gitee-assets ${Befor_versio} -n gitee-prod


# Roll back to a specific version
Designation_version=$(helm history gitee-assets | grep 993544f| awk '{print $1}')
helm rollback gitee-assets ${Designation_version} -n gitee-prod
```



[Полезные функции оптимизации в Jenkins | Блог мистера Пу (putianhui.cn)](https://www.putianhui.cn/posts/f5b12f59c480/)

«[Автоматическое развертывание служб среды dev-uat-preprd-prd с использованием Jenkins и реализация отката в случае сбоя развертывания.| Личный блог мистера Пу (putianhui.cn)](https://www.putianhui.cn/posts/7041616304b2 /)"

[Объяснение Jenkinsfile | Личный блог мистера Пу (putianhui.cn)](https://www.putianhui.cn/posts/fa563716f116/)



Процесс выпуска и обслуживание конвейера

https://gitee.com/autom-studio/std/blob/master/ Программа эксплуатации / обслуживание служб облачной среды / процесс выпуска и обслуживание конвейера.md



## Справочные материалы

Развертывание k8s 1.26.3 (с контейнером в качестве среды выполнения контейнера) с помощью Kubeadm в Ubuntu 22.04 LTS

[Установите кластер k8s-v1.25.x в Ubuntu 22.04 (yuque.com)](https://www.yuque.com/longfc/k8s/mq3iyw#Y2unZ)

[Установите кластер Kubernetes высокой доступности в Ubuntu 20.04 | Cifangzi — Найдите меня, чтобы принести овощи (cifangzi.club)](http://cifangzi.club/2021/06/k8s_installation/)

Руководство по установке Kubeadm - DevOps Development