# Deploy containers for kafka (kraft mode) with 3 nodes

## 1. Environment description

| Hostname | Architecture | Operating System | Specification | IP | Remarks |
| ---------------- | --------- | ---------------- | ------------------------------------------------------------------ | ------------ | ---- |
| gitee-es-kakfak1 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.18  |      |
| gitee-es-kakfak2 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.130 |      |
| gitee-es-kakfak3 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.151 |      |

Kafka [Authentication](https://so.csdn.net/so/search?q= Authentication&spm=1001.2101.3001.7020) methods, the authentication categories supported by Kafka are

References

"[Deploying a Kafka cluster in KRaft mode with docker-compose on multiple servers - Zhihu](URL-6b9b0b2b7d)"

[CentOS 7 Kafka 2.6 Single-node Installation and Dynamic Authentication SASL SCRAM Configuration - CSDN Blog](https://blog.csdn.net/manwufeilong/article/details/134134110)

Practical guide - Building a secure and reliable Kafka cluster and configuring SASL/PLAIN authentication - Zhihu

"[Kafka deployment with SASL/SCRAM dynamic authentication - MoTianLun (modb.pro)](https://www.modb.pro/db/152468)"

## spring boot +nacos client access link and account password

Access cluster configuration: 10.4.145.18:9092,10.4.145.130:9092,10.4.145.151:9092

> // KAFKA_CFG_SASL_ENABLED_MECHANISMS=PLAIN
>
> Username/Password: oschina/oschina123