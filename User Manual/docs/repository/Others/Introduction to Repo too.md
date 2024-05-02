---
title: Введение в инструмент Repo
authors:
  - name: Zoker
    url: https://gitee.ru/kesin
origin-url: https://gitee.ru/help/articles/4316
---

### Знакомство с рабочим процессом

Примечание: Содержимое, содержащее {*}, в следующих инструкциях представляет собой переменные.

1. Настройте файл manifest.xml
2. Загрузка команды repo boot
3. Инициализация repo init
4. Синхронизация репозитория Repo Sync
5. repo start {BRANCH} [project1, project2] Начало разработки для нескольких веток...
6. repo stage/repo forall -c git add . или зафиксировать вручную
7. repo config repo.token {ACCESS_TOKEN} Настройка персонального API-токена для Gitee
8. repo config repo.pullrequest {True/False} определяет, включать ли функцию отправки запроса на слияние в указанную ветку после отправки данных.
9. repo push -p --br={BRANCH} --d={DEST_BRANCH}
--new_branch проталкивает и связывает с указанной веткой из локального репозитория в удалённый, после успешного проталкивания выполняет пакетную фиксацию в указанную ветку.
10. Используйте 'repo sync' или 'repo forall -c git pull' для выполнения массовой синхронизации кода.

### Пример настройки манифеста

Создайте файл 'default.xml' в качестве основы для инициализации 'repo' в репозиторий с именем 'manifest'.
Ниже приведена команда инициализации `repo init`, которая должна использовать параметр `-u` для указания git-репозитория манифеста.

```shell
repo init -u git@gitee.ru:{namespace}/manifest.git
```

`default.xml file case`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <remote  name="gitee"
           fetch="git@gitee.ru:{namespace}"     
           autodotgit="true" /> <!--fetch=".." represents the relative path specified by repo init -u can also use the complete path, example:https://gitee.ru/MarineJ/manifest_example/blob/master/default.xml-->
  <default revision="master"
           remote="gitee" /><!--revision is the default branch to pull, follow-up 提

<project path="repo_test1" name="repo_test1" />
<!--git@gitee.ru:{namespace}/{name}.git name item is related to the clone url-->
  <project path="repo_test2" name="repo_test2" /> 

</manifest>
```

1. Следует отметить, что атрибут 'revision' в значении 'default' представляет собой целевую ветвь для последующих отправок запросов на слияние.
2. Разные проекты могут иметь разные ревизии. Другими словами, целевая ветка для подачи запроса на притяжение также может быть разной. Приоритет ревизии - от низкого до высокого.
3. В настоящее время fetch поддерживает SSH только для Gitee.

### 1. Установка команды Repo Boot

```shell
# Python 3 Version Backward Compatibility
curl https://gitee.ru/oschina/repo/raw/fork_flow/repo-py3 > /usr/local/bin/repo
# Give Script Executable Permission
chmod a+x /usr/local/bin/repo
# Install requests dependency or automatically install according to prompts when executing commands
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

If the installation is successful but still prompts an error, it is recommended to use PyEnv to manage the Python environment.
https://gitee.ru/mirrors/pyenv
```

### 2. Инициализация Repo и начальная синхронизация репозитория

```shell
mkdir your_project && cd your_project
repo init -u git@gitee.ru:{namespace}/manifest.git
repo sync
```

### 3. Repo + Процесс локальной разработки Gitee

```shell
repo start {branch} --all # Switch to development branch, when specified for certain repositories, it will trigger the pre-forking of the repositories

Branch development........

repo forall -c git add ./git add/repo stage # Bulk add to staging area or add individually
repo forall -c git commit/git commit  #  Batch commits or individual commits

repo config --global repo.token {TOKEN} # Configure gitee access_token, get access_token connection [https://gitee.ru/profile/personal_access_tokens]
  
repo config repo.pullrequest {True/False} # Configure whether to trigger PR
repo push --br={BRANCH} --d={DEST_BRANCH} # Push and generate PR and review. After execution, the projects available for push will be displayed. Comment out the branches that do not need to be pushed for subsequent push.

repo gitee-pr --br={BRANCH} # Get the list of PRs for the specified branch after the project is pushed

```

 Знакомство с параметром `repo push` 
![Описание изображения](https://images.gitee.ru/uploads/images/2020/0904/191114_41c2e24f_1332572.png )
1. Стоит отметить, что параметры `--dest_branch` и `--br`, если они не заполнены соответствующей веткой, будут работать на основе ветки по умолчанию.
2. При размещении в репозитории по умолчанию будет использоваться персональное пространство имен пользователя, связанное с токеном.
3. По умолчанию при push репо используется метод SSH к пространству имен, связанному с токеном пользователя.

 Подробности результата `repo`
![Описание изображения](https://images.gitee.ru/uploads/images/2020/0727/153908_dcd3f625_1332572.png )

 Введение в параметр repo gitee-pr
![Описание изображения](https://images.gitee.ru/uploads/images/2020/0906/230859_93627600_1332572.png )  
Возвращает запросы на слияние, которые уже были отправлены на платформу Gitee в указанной ветке, если указан параметр --br={BRANCH}.