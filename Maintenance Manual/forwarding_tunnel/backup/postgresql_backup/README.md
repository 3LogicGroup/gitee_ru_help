# Резервное копирование данных в PostgresSQL

## 1. Добавьте скрипт резервной копии

```sh
#!/bin/sh
PG_HOST="10.4.145.105"
PG_USER="postgres"

PG_DB_NAMES=("foruda" "grms" "praefect")

BUCKET="russia-pg-backup"
BACKUP_BUCKET="minio/${BUCKET}"

Target directory name
BACKUP_DIRECTORY=pg_$(date "+%Y-%m-%d")
Date and Time
DATA_TIME=$(date "+%Y-%m-%d_%H-%M-%S")


if ! $(sudo mc ls minio | grep -q ${BUCKET}); then
Create target directory
  sudo mc mb "${BACKUP_BUCKET}/${BACKUP_DIRECTORY}"
fi

# Backup individual databases separately
for (( i = 0; i < ${#PG_DB_NAMES[@]}; i++ )); do
  # echo -e "${PG_DB_NAMES[i]"
  sudo -E docker exec -e PGPASSWORD="oschina123" postgresql pg_dump -h ${PG_HOST} -U ${PG_USER} -d ${PG_DB_NAMES[i]} | gzip | sudo mc pipe --attr "Artist=postgresql" "${BACKUP_BUCKET}/${BACKUP_DIRECTORY}/${PG_DB_NAMES[i]}-${DATA_TIME}.sql.gz"
done


# Backup all databases, tables, and global objects (such as roles and settings)
sudo -E docker exec -e PGPASSWORD="oschina123" postgresql pg_dumpall -h ${PG_HOST} -U ${PG_USER} | gzip | sudo mc pipe --attr "Artist=postgresql" "${BACKUP_BUCKET}/${BACKUP_DIRECTORY}/pg_dumpall-${DATA_TIME}.sql.gz"

# Delete backups from 10 days ago
sudo mc rm --older-than=10d --force --recursive "${BACKUP_BUCKET}/${BACKUP_DIRECTORY}/"
```



## 2. Запланированная задача Jenkins

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
                    ssh -o StrictHostKeyChecking=no -i ${AGENT_WORKDIR}/k8s/gitee_ru_p -p ${SSH_PORT} ubuntu@${SRE_SERVER} bash /home/ubuntu/workdir/docker-compose/confcenter-docker/data/conf/projects/gitee/k8s/scripts/backup_postgresql/backup_pg.sh
                    set -x
                '''
          }
      }
    }
  }
```









"[PostgreSQL: Backup and Restore | Geek Tutorial (geek-docs.com)](https://geek-docs.com/postgresql/postgresql-questions/461_postgresql_postgresql_dump_and_restore.html)"
