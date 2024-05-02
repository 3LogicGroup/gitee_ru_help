# Разверните кластер Minio

## 1. Описание среды

Для распределенного Minio требуется не менее 4 узлов
- Для производственной среды рекомендуется минимум 4 узла

| Роль узла | Архитектура | Операционная система | Спецификация | IP | Замечания |
| ------------ | --------- | ---------------- | ------------------------------------------------------------------ | ------------ | ---- |
| gitee-minio1 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.159 |      |
| gitee-minio2 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.145 |      |
| gitee-minio3 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.122 |      |
| gitee-minio4 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.97  |      |

## 2. Подготовка окружения

> Примечание: сначала отформатируйте и смонтируйте диск с данными в каталог /data.

```sh
fdisk /dev/vdb
pvcreate /dev/vdb1
vgcreate vg_data_server /dev/vdb1
lvcreate -n lvm_data_server -L 199.9G vg_data_server
lvdisplay
mkfs.xfs /dev/vg_data_server/lvm_data_server
blkid
mkdir /data
echo 'UUID="92f2c85a-7268-4b1e-8ec8-06b78c72badf" /data     xfs    defaults  0  0 ' >> /etc/fstab
mount -a
blkid
```

```sh
# Выполните следующие операции на всех узлах
# Настройте синхронизацию времени, метод синхронизации времени не обсуждается
# Установка обычного программного обеспечения
sudo apt install -y nano vim git unzip wget ntpdate dos2unix net-tools tree htop ncdu nload sysstat psmisc bash-completion fail2ban chrony gcc g++ make jq nfs-common rpcbind libpam-cracklib

# Создать каталог данных
mkdir -p /data/minio
Create program storage path
mkdir -p /usr/local/minio
# Downloading minio package
wget -P /usr/local/minio https://dl.min.io/server/minio/release/linux-amd64/minio

# Изменить максимальное количество файлов в системе
tee -a /etc/security/limits.conf <<'EOF'
# ulimit -HSn 65535
# ulimit -HSu 65535
*  soft  nofile  65535
*  hard  nofile  65535
*  soft  nproc   65535
*  hard  nproc   65535

# Конец файла
EOF
sysctl -p
```

## 3. Настройте сценарий запуска Minio

(Настройте на всех узлах)

```mipsasm
MINIO_ACCESS_KEY: The username, minimum length is 5 characters
MINIO_SECRET_KEY: password, the password should not be set too simple, otherwise minio will fail to start, the minimum length is 8 characters.
–config-dir: Specify the cluster configuration file directory
```

```sh
cat >/usr/local/minio/minio_run.sh<<-EOF
#!/bin/bash
# export MINIO_ACCESS_KEY=Admin
# export MINIO_SECRET_KEY=Admin1234!
The new version uses MINIO_ROOT_USER and MINIO_ROOT_PASSWORD to configure the account password.

export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=oschina123

# --address "192.168.10.107:9000" --console-address
  "192.168.10.107:19001" needs to be modified to the IP of each node
/usr/local/minio/minio server --config-dir /usr/local/minio --address "10.4.145.97:9000" --console-address "10.4.145.97:19001" \
http://10.4.145.159/data/minio \
http://10.4.145.145/data/minio \
http://10.4.145.122/data/minio \
http://10.4.145.97/data/minio
EOF
```

## 4. Настройте службу minio.service

```sh
cat > /usr/lib/systemd/system/minio.service <<EOF
[Unit]
Description=Minio service
Documentation=https://docs.minio.io/

[Service]
WorkingDirectory=/usr/local/minio
ExecStart=/usr/local/minio/minio_run.sh

Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

## 5. Авторизация

```bash
chmod u+x /usr/local/minio/minio
chmod u+x /usr/local/minio/minio_run.sh
chmod u+x /usr/lib/systemd/system/minio.service
```

Запустить сервисы

```sh
systemctl daemon-reload
systemctl enable --now minio
systemctl status minio -l
```

## 7. Проверьте, работает ли служба должным образом.

Доступ к каждому узлу отдельно

- 10.4.145.159:9000
- 10.4.145.145:9000
- 10.4.145.122:9000
- 10.4.145.97:9000

Пароль учетной записи указывается в скрипте 'minio_run.sh'.

Доступ к консоли

- 10.4.145.159:19001
- 10.4.145.145:19001
- 10.4.145.122:19001
- 10.4.145.97:19001

## 8. Прокси-сервер Nginx

В производственной среде Nginx или Haproxy обычно используются для обратного прокси + балансировки нагрузки для использования Minio.

```ini
upstream minio {
    server 10.4.145.159:19001;
    server 10.4.145.145:19001;
    server 10.4.145.122:19001;
    server 10.4.145.97:19001;
    keepalive 32;
}

server {
    listen 80;
    server_name minio.autom.studio;
    access_log /var/log/nginx/minio_302_access.log main;
    error_log /var/log/nginx/minio_302_error.log;
    return 302 https://$server_name$request_uri;
}

server {
    include ssl.d/autom_ssl.conf;
    server_name minio.autom.studio;
    access_log /var/log/nginx/minio_access.log main;
    error_log /var/log/nginx/minio_error.log;

    if ($http_user_agent ~ "MSIE" ) {
        return 303 https://browser-update.org/update.html;
    }

    location / {
        proxy_pass http://minio;
        # Disable cache
        proxy_no_cache 1;
        proxy_cache_bypass 1;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 1000m;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

Ссылки

Развертывание распределенного кластера Minio - Lv Zhenjiang - Cnblogs

[Развертывание кластера объектного хранилища Minio из 4 узлов — Village Uncle Chun — Blog Park (cnblogs.com)](https://www.cnblogs.com/chunjeh/p/17509003.html)

"[Высокопроизводительное распределенное объектное хранилище MinIO (yuque.com)](https://www.yuque.com/fcant/devops/nmcs36#UzUfv)"

[Развертывание кластера MinIO из 3 узлов с помощью Docker](https://www.cnblogs.com/evescn/p/16242019.html)

minio доступ к развертыванию Docker через доменное имя
