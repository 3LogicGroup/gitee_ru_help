# Запланированное резервное копирование базы данных

## 1. Сделайте резервную копию и загрузите в Mino

1. Скайчате клиент minIO

```sh
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/mc
```



2. Настройте клиент mc

```sh
$ mc config host add minio http://10.4.145.142:9000 "u5C4unUfImuOQrfMp9OU" "dZGu9loZ6xJNguXP9aKjA0cW9fIQFzh8BpMjMSPn"

# View Storage Bucket
$ mc ls minio
[0001-01-01 00:00:00 UTC]     0B data/
[2023-12-21 10:59:34 UTC]     0B gitee-foruda/
[2023-12-19 09:56:09 UTC]     0B gitee-lfs/

# Delete Storage Bucket
$ mc rb --force minio/gitee-mysql-backup/
```

Документация: https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc.html



3. Добавьте скрипт резервной копии

```sh
#!/bin/sh
MYSQL_HOST="10.4.145.132"
MYSQL_USER="root"
MYSQL_PASS="oschina123"
DB_NAME="gitee_production"

BUCKET="russia-mysql-backup"
BACKUP_BUCKET="minio/${BUCKET}"

Target directory name
BACKUP_DIRECTORY=mysql_$(date "+%Y-%m-%d")
Date and Time
DATA_TIME=$(date "+%Y-%m-%d_%H-%M-%S")

if ! $(sudo mc ls minio | grep -q ${BUCKET}); then
Create target directory
  sudo mc mb "${BACKUP_BUCKET}/${BACKUP_DIRECTORY}"
fi

sudo docker exec mysql-rc-master mysqldump -h ${MYSQL_HOST} -u ${MYSQL_USER} -p${MYSQL_PASS} ${DB_NAME} --single-transaction | gzip | sudo mc pipe --attr "Artist=mysql" "${BACKUP_BUCKET}/${BACKUP_DIRECTORY}/${DB_NAME}-$(date "+%Y-%m-%d_%H-%M-%S").sql.gz"

# Delete backups from 10 days ago
sudo mc rm --older-than=10d --force --recursive "${BACKUP_BUCKET}/${BACKUP_DIRECTORY}/"
```





4. Добавьте запланированную задачу

```sh
crontab -e
30 4 * * * /root/backup-mysql.sh>/root/backup-mysql.log 2>&1 &
```



5. Запланированные задачи Jenkins можно использовать для создания резервной копии и графического представления результатов

```
pipeline{
    agent {label 'agent01'}

    triggers {
        cron('0 6,12,0 * * *')
    }
    environment {
        SRE_SERVER = "10.4.145.142"
        SSH_PORT = 2222

    }

   options {
      parallelsAlwaysFailFast()
      disableResume()
      disableConcurrentBuilds()
      skipDefaultCheckout()
      quietPeriod(1)
      timestamps()
      buildDiscarder(logRotator(numToKeepStr: '100'))
      timeout(time: 20, unit: 'MINUTES')
    }

    stages {
      stage("backup mysql databases"){
          steps {
              sh '''#!/bin/bash
                    set +x
                    ssh -o StrictHostKeyChecking=no -i ${AGENT_WORKDIR}/k8s/gitee_ru_p -p ${SSH_PORT} ubuntu@${SRE_SERVER} bash /home/ubuntu/workdir/docker-compose/confcenter-docker/data/conf/projects/gitee/k8s/scripts/backup_mysql/backup_mysql.sh
                    set -x
                '''
          }
      }
    }
  }
```







## 2. Полное резервное копирование базы данных и таблиц

[mysql-Detailed-backup: Backup of MySQL database for sharding and partitioning. (gitee.com)](https://gitee.com/oschina/mysql-detailed-backup)







Справочная документация

eback Enterprise Snapshot, MySQL Full Backup

192.168.3.131:222

Идентификатор учетной записи/Пароля: git/eback

Развертывание/Обновление:

```sh
Enterprise Snapshot Service
The script is deployed in /app/enterprise-backup
Repository address: https://gitee.com/autom-studio/enterprise-backup
Repository URL: https://e.gitee.com/oschina/repos/oscstudio/git-snapshot
Depends on /app/git-snapshot
Dependent on the running environment on 192.168.3.110 with gitee, used for remote execution of rake tasks, exporting the list of paid repositories that need to be snapshot, requires SSH keyless login
Scheduled tasks are located in: /etc/crontab

# MySQL full backup
The script is deployed at /app/mysql-detailed-backup
Repository URL: https://gitee.com/oschina/mysql-detailed-backup.git
Depend on mysql-client
Scheduled tasks are located in: /etc/crontab
```

https://www.treesir.pub/post/k8s-cronjob-backup-mysql/

Резервное копирование данных баз данных MySQL по расписанию и загрузка в minIO - JoyLau's Blog 