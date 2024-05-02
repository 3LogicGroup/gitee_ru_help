---
title: Установка Git
origin-url: https://gitee.ru/help/articles/4106
---

Изначально Git был разработан под Linux, и в течение длительного времени он мог работать только в системах Linux/Unix. По мере того, как он становился все более популярным, некоторые разработчики начали портировать его на платформу Windows. В настоящее время Git является кроссплатформенным инструментом, который может работать в Windows/macOS/Linux/Unix.

### Скачать

Вы можете получить установочные пакеты Git для операционных систем Windows/macOS/Linux по адресу [https://git-scm.com/](https://gitee.ru/link?target=https%3A%2F%2Fgit-scm.com%2F). Вы также можете установить его следующим способом.

### **Установка в Windows**

Загрузите версию клиента для Windows с [http://git-scm.com/download](https://gitee.ru/link?target=http%3A%2F%2Fgit-scm.com%2Fdownload), запустите его от имени администратора и продолжайте выбирать "Далее" для установки. Пожалуйста, обратите внимание, что если вы не знакомы со значением каждого параметра, сохраните параметры по умолчанию.

### **Установка в Ubuntu**

Выполните в терминале

```bash
apt-get install git 
```
 
### **Установка в Centos/Red hat**

Выполните в терминале

```bash
yum install git
```

### **Установка в Fedora23**

Выполните в терминале

```bash
dnf install git or yum install git
```

### Установка в Fedora22/21

Выполните в терминале

```bash
yum install git
```

### **Установка в SUSE/OPENSUSE**

Выполните в терминале

```bash
sudo zypper install git
```

### **Установка в Mac OS X**

Выполните в терминале

```bash
brew install git
# Note: Please resolve the issues with environment variables and Brew tool on your own
```

Скомпилируйте и установите (Примечание: Подходит только для систем, отличающихся от Windows)

Выберите версию из [https://github.com/git/git/releases](https://gitee.ru/link?target=https%3A%2F%2Fgithub.com%2Fgit%2Fgit%2Freleases), скачайте и распакуйте ее, затем войдите в каталог Git и выполните следующий код по порядку:

```bash
make configure
./configure
make all
sudo make install
```

Примечание: Если у вас возникли проблемы с компиляцией, самостоятельно найдите необходимые зависимости для Git с помощью поисковой системы.

Если все в порядке, откройте терминал (в Windows откройте bash, установленный вместе с git) и введите 'git --version'. Должна появиться аналогичная информация.

```bash
git version 2.5.0
```