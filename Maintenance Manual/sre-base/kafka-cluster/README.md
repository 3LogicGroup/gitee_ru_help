# Развертывание контейнеров для kafka (режим kraft) на 3 узлах.

## 1. Описание среды

| Имя хоста | Архитектура | Операционная система | Спецификация | IP | Замечания |
| ---------------- | --------- | ---------------- | ------------------------------------------------------------------ | ------------ | ---- |
| gitee-es-kakfak1 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.18  |      |
| gitee-es-kakfak2 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.130 |      |
| gitee-es-kakfak3 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.151 |      |

Методы Kafka [Authentication](https://so.csdn.net/so/search?q= Authentication&spm=1001.2101.3001.7020), категории аутентификации, поддерживаемые Kafka, следующие

Ссылки

"[Развертывание кластера Kafka в режиме KRaft с помощью docker-compose на нескольких серверах - Zhihu](URL-6b9b0b2b7d)"

[Установка CentOS 7 Kafka 2.6 на одном узле и конфигурация динамической аутентификации SASL SCRAM — блог CSDN](https://blog.csdn.net/manwufeilong/article/details/134134110)

Практическое руководство - Создание безопасного и надежного кластера Kafka и настройка аутентификации SASL/PLAIN - Zhihu

"[Развертывание Kafka с динамической аутентификацией SASL/SCRAM - MoTianLun (modb.pro)](https://www.modb.pro/db/152468)"

## Ссылка для доступа к клиенту spring boot +nacos и пароль к учетной записи

Конфигурация кластера доступа: 10.4.145.18:9092,10.4.145.130:9092,10.4.145.151:9092

> // KAFKA_CFG_SASL_ENABLED_MECHANISMS=PLAIN
>
> Имя пользователя/пароль: oschina/oschina123