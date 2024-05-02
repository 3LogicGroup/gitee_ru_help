---
title: Знакомство с инструментами Repo
origin-url: https://gitee.ru/help/articles/4316
---

### **Введение в процесс использования**

Примечание: Содержимое с {*} в следующих инструкциях представляет переменные

1. Настройте файл manifest.xml
2. Загрузите команду начальной загрузки репозитория
3. Инициализация repo init
4. Синхронизация репозитория repo sync
5. Запустите репозиторий {ВЕТКА} [project1, project2] для пакетного переключения ветки, чтобы начать разработку...
6. repo stage/repo forall -c git add .  или отправьте его вручную
7. Конфигурация репозитория repo.token {ACCESS_TOKEN} настраивает личный токен API Gitee
8. Конфигурация репозитория repo.pullrequest {True/False} определяет, следует ли включать функцию отправки запроса на слияние в указанную ветку после нажатия.
9. Отправка репозитория -p --br={BRANCH} --d={DEST_BRANCH} --new_branch использует указанную локальную ветвь для отправки и связывания с удаленной ветвью, а после успешной отправки отправляет массово в указанную ветвь
10. repo sync или repo forall -c git pull для пакетной синхронизации кода

### **Пример конфигурации манифеста**

Создайте файл default.xml в репозитории с именем "manifest" в качестве основы для инициализации репозитория
Ниже приведена команда инициализации repo init, которая должна использовать параметр -u для указания репозитория git для манифеста.

```bash
repo init -u git@gitee.ru:{namespace}/manifest.git
```

default.xml Подборка файлов

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <remote  name="gitee"
           fetch="git@gitee.ru:{namespace}"     
'autodotgit="true" /> <!--fetch=".." represents using the relative path specified by repo init -u can also use the complete path, for example: https://gitee.ru/MarineJ/manifest_example/blob/master/default.xml-->'
  <default revision="master"
<!--revision is the default pull branch, and subsequent pull requests will also target the revision as the default target branch-->

<project path="repo_test1" name="repo_test1" /> <!--git@gitee.ru:{namespace}/{name}.git name item is related to the clone URL-->
  <project path="repo_test2" name="repo_test2" /> 

</manifest>
```

1. Атрибут revision по умолчанию должен быть указан как целевая ветка для последующих отправок запросов на слияние
2. Разные проекты также могут иметь разные редакции, что означает, что целевые ветки для отправки запроса на слияние также могут быть разными. Приоритет изменений - от низкого до высокого.
3. Команда fetch в настоящее время поддерживает только ssh gitee

### **1. Установка Repo Bootstrap**

```bash
# Python3 version backward compatible
curl https://gitee.ru/oschina/repo/raw/fork_flow/repo-py3 > /usr/local/bin/repo
# Grant executable permission to the script
chmod a+x /usr/local/bin/repo
"# Install the requests dependency, or automatically install it according to the prompt when executing the command"
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

# If the installation is successful but you still get an error message, it is recommended to use PyEnv for Python environment management.
https://gitee.ru/mirrors/pyenv
```

### **2. Инициализация репозитория и синхронизация начального репозитория**

```bash
mkdir your_project && cd your_project
repo init -u git@gitee.ru:{namespace}/manifest.git
repo sync
```

### **3. Repo + Процесс локальной разработки Gitee**

```bash
repo start {branch} --all # Switch to the development branch. When specifying certain repositories, it will trigger the pre-fork of the repository.

Branch development........

repo forall -c git add ./git add/repo stage # Batch add to staging area or add individually
Batch or individual submission with 'repo forall -c git commit/git commit'

repo config --global repo.token {TOKEN} # Configure Gitee access_token, access_token acquisition link https://gitee.ru/profile/personal_access_tokens
  
'repo config repo.pullrequest {True/False}' - Configures whether to trigger a PR.
repo push --br={BRANCH} --d={DEST_BRANCH}  # Push and create a PR and review. After execution, the projects available for push will be displayed. Uncommented branches will be pushed in the next step.

repo gitee-pr --br={BRANCH} # Get the list of PRs for the specified branch after project push
```

Знакомство с параметрами отправки repo

![Описание изображения](./assets/191114_41c2e24f_1332572.webp)

1. Следуетт отметить параметры --dest_branch и --br. Если соответствующие ветки не указаны, операции будут проводиться на основе ветки по умолчанию. --br будет использовать для отправки текущую ветку, а --dest_branch будет использовать версию по умолчанию в manifest.xml в качестве целевой ветки по умолчанию.
2. При отправке в репозиторий с помощью repo push по умолчанию он будет отправляться в репозиторий в личном пространстве имен пользователя, связанном с токеном. Если ветка не была разветвлена заранее, то в случае сбоя отправки репозитория она снова разветвит вышестоящий репозиторий, используя пользователя, связанного с токеном, а затем снова отправит запрос.
3. Команда repo push по умолчанию отправит репозиторий в пространство имен пользователя, используя связанный с токеном метод ssh. Если вы хотите изменить его на https, вы можете настроить repo.pushurl на адрес пространства имен пользователя, как, например, [https://gitee.ru/xxxx].

подробные сведения о результатах repo 

![Описание изображения](./assets/153908_dcd3f625_1332572.webp)

Знакомство с параметрами gitee-pr в репозитории

![Описание изображения](./assets/230859_93627600_1332572.webp)

Возвращает указанную ветку, которая уже была отправлена на платформу Gitee с параметром --br={BRANCH}