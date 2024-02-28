# Deploying the sre jump server service

## 1. Initialize SRE Server

[sre-base-initialization](./README-base.md)

## 2. Deployment Manifest

| Service Name | Deployment Method | Detailed Steps |
| ------------------- | -------- | -------------------------------------------------- |
| keepalived          | binary   | [keepalived](./keepalived/README.md) |
| coredns             | docker   | [coredns](./coredns-dcoker/README.md)              |
| nginx-prod          | docker   | [nginx-pro](./nginx-prod/README.md)                |
| mailcat             | docker   | [mailcat](./mailcat/README.md)                     |
| configcenter        | docker   | [configcenter](./configcenter/README.md)           |
| ansible             | docker   | [ansible](./ansible-docker/README.md)              |
| Jenkins             | docker   | [jenkins](./simple-jenkins/README.md)              |
| redis-cache         | docker   | [redis-cache](./redis/redis-cache/README.md)       |
| redis-cratos        | docker   | [redis-cratos](./redis/redis-cratos/README.md)     |
| redis-public        | docker   | [redis-public](./redis/redis-public/README.md)     |
| harbor-ha           | docker   | [harbor-ha](./harbor-ha/README.md)                 |
| nfs                 | docker   | [nfs](./nfs/README.md)                             |
| ntp                 | binary   | [ntp](./ntp-server/README.md) |
| elasticsearch-gitee | docker   | [elasticsearch-gitee](./es-single-node/README.md)  |
| fileserver-docker   | docker   | [fileserver-docker](./fileserver-docker/README.md) |
| vaultwarden         | docker   | [vaultwarden](./vaultwarden/README.md)             |

## 3. rsync Synchronize Important Directories from sre2 to sre1

[rsync](./rsync/README.md)

## 4. Deploying harbor-ha common components

[redis replication](./redis-replication/README.md)

"[PostgreSQL Master-Slave](./postgresql/README.md)"

nfs master-slave