---
title: Установка Git
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4106
---

Изначально Git был разработан для Linux, и долгое время он мог работать только на системах Linux/Unix. По мере роста популярности Git некоторые разработчики начали переносить его на платформу Windows. В настоящее время Git является кроссплатформенным инструментом, который может работать на Windows/macOS/Linux/Unix.

Как скачать

Вы можете получить установочные пакеты Git для операционных систем Windows/macOS/Linux с сайта [https://git-scm.com/](https://git-scm.com/). Кроме того, вы можете установить его следующими способами.

### Установка в Windows

Загрузите Windows-версию клиента с сайта <http://git-scm.com/download>, запустите ее от имени администратора и выберите Next для установки. Обратите внимание, что, если вы не знаете значения каждой опции, следует сохранить опции по умолчанию.

### Установка на Ubuntu

```bash
Выполните команду 'apt-get install git' в терминале.
```

### Установка Centos/Redhat

```bash
Выполните команду yum install git в терминале
```

### Установка Fedora23

```bash
Выполните команду 'dnf install git' или 'yum install git' в терминале.
```

### Установка Fedora22/21

```bash
Выполните команду yum install git в терминале
```

### Установка SUSE/OPENSUSE

```bash
Выполните команду sudo zypper install git в терминале
```

### Установка Mac OS X

```bash
Выполните команду 'brew install git' в терминале (Примечание: решите проблемы с переменными окружения и инструментом Brew самостоятельно).
```

### Компиляция и установка (Примечание: подходит для всех систем, кроме Windows)

Выберите версию из <https://github.com/git/git/releases> для загрузки, затем распакуйте и войдите в каталог Git для последовательного выполнения следующего кода:

```bash
make configure
./configure
make all
sudo make install
```

Примечание: В случае возникновения проблем с компиляцией, самостоятельно найдите необходимые Git зависимости.

Если все в порядке, откройте терминал (в Windows откройте bash, который был установлен вместе с Git) и введите 'git --version'. Должна появиться следующая информация:

```bash
git version 2.5.0
```