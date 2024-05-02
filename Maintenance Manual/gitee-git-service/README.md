# Развертывание gitaly

# Развертывание gitaly

Рекомендуется разворачивать gitaly и gitee-GNK на одном сервере.

## 1. Адрес репозитория

Репозиторий gitaly

https://gitee.com/oscstudio/gitaly.git

> Ветка: gitee

## 2. Развертывание gitaly

### 2.1 Установка зависимостей

Зависимости

- Git 2.35+
- Golang 1.17+
- Ruby 2.7+

Операционная система Ubuntu20.04, Baidu Cloud BCC cloud host

| Service Name | Specification | Operating System | IP | Remarks | External Access |
| -------- | --------------------- | ----------- | ---------------------------------------------------------------------------------------- | ---------------------- | ------------ |
| gitaly   | 4C*16G 1*200G 1\*500G | ubuntu20.04
  | gitaly1:172.18.0.85<br>gitaly2:172.18.0.83<br>gitaly3:172.18.0.82<br>gitaly4:172.18.0.84
  | репозиторий git сервер GRPC | мусор           |

#### Установка Git

```shell
$ apt update \
&& apt install -y build-essential \
wget \
openssl  \
libssh-dev  \
zlib1g  \
zlib1g-dev  \
libffi-dev  \
libgdbm-dev  \
libssl-dev \
libedit-dev  \
libgpg-error-dev  \
libmysqlclient-dev  \
libyaml-dev \
libgmp-dev \
libreadline-dev \
automake \
sudo  \
tcl  \
tk  \
gettext  \
openssh-server  \
make  \
cmake  \
libcurl4-gnutls-dev  \
libexpat1-dev \
gettext  \
libz-dev  \
curl \
autoconf \
perl  \
vim \
gcc \
g++  \
pkgconf  \
libicu-dev  \
tree  \
tig \
ca-certificates \
shared-mime-info \
libgpgme-dev \
libjpeg-dev \
libsodium-dev \
libjemalloc-dev \
iproute2 \
libre2-dev \
procps \
--no-install-recommends

$ cd /tmp; \
&& wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.35.1.tar.xz \
&& tar -xJf git-2.35.1.tar.xz \
&& cd git-2.35.1 \
&& make configure \
&& ./configure --prefix=/usr/local \
&& make install \
&& ln -sf /usr/local/bin/git* /usr/bin/ \
&& rm -rf /tmp/git-2.35.1.tar.xz \
&& git --version
```

#### Установка Golang

```shell
$ cd /tmp; \
wget https://golang.google.cn/dl/go1.18.linux-amd64.tar.gz \
&& tar zxvf go1.18.linux-amd64.tar.gz \
&& mv ./go /usr/local/ \
&& mkdir -p /usr/share/go

$ cat >> /etc/profile <<-'EOF'
export GOROOT=/usr/local/go
export GOPATH=/usr/share/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
EOF

$ source /etc/profile \
&& go version
```

#### Установка Ruby

```shell
$ cd /tmp;  \
wget "https://cache.ruby-china.com/pub/ruby/2.7/ruby-2.7.5.tar.xz" \
&& mkdir -p /usr/src/ruby \
&& tar -xJf ruby-2.7.5.tar.xz -C /usr/src/ruby --strip-components=1 \
&& rm ruby-2.7.5.tar.xz \
&& cd /usr/src/ruby \
&& ./configure --prefix=/home/git/ruby2.7.5 --enable-rpath --with-jemalloc --enable-shared --disable-install-doc --disable-install-rdoc \
	&& make -j "$(nproc)" \
&& make install \
&& /home/git/ruby2.7.5/bin/gem install charlock_holmes -N \
&& /home/git/ruby2.7.5/bin/gem install bundler -v 1.17.3 \
&& sudo ln -sf /home/git/ruby2.7.5/bin/* /usr/local/bin/ \
&& apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
  if dpkg -l | grep -i ruby; then exit 1; fi; \
  [ "$(command -v ruby)" = '/usr/local/bin/ruby' ]; \
  # rough smoke test
  ruby --version; \
  gem --version; \
  bundle --version
```

### 2.2 Сборка

```shell
git clone https://gitee.com/oscstudio/gitaly.git
cd gitaly
make install
```

Конфигурация

```shell
cp config.toml.example config.toml
```

- Значение storage.name должно совпадать с projects.storages в базе данных

- В файле конфигурации настройте все пути /home/git/gitaly, если это необходимо.

Пример файла конфигурации:

[config](./config.toml)

### 2.4 Запуск

```shell
/home/git/gitaly/gitaly /home/git/gitaly/config.toml
```

### 2.5 Использование Systemd для управления

```shell
Configuration
$ sudo cp systemd/gitaly.service /lib/systemd/system/
$ sudo systemctl daemon-reload

## Modify the paths in the configuration file as needed
# Start
sudo systemctl start gitaly.service
Smooth restart
sudo systemctl reload gitaly.service
Stop
sudo systemctl restart gitaly.service
```

**FAQ**

1. Перейдите в proxy

```shell
make install GOPROXY="https://goproxy.cn,direct"
```

Не используйте goproxy.io в качестве прокси, это может привести к следующим ошибкам:

```shell
verifying gitlab.com/gitlab-org/labkit@v1.0.0: checksum mismatch
        downloaded: h1:eM1EseVswFkYZxGpWpj3HcRjwRtEXnuh3KDIIhO0WTw=
        go.sum:     h1:t2Wr8ygtvHfXAMlCkoEdk5pdb5Gy1IYdr41H7t4kAYw=
```

## 3. Разверните gitee-GNK

### 3.1 Адрес репозитория

Название проекта: heimdallr. Добавьте серверные хуки Git, чтобы заменить GNK.

https://gitee.com/oscstudio/gitee-hook

> Ветка: master

### 3.2 Сборка и развертывание

Справочное руководство по разработке: DevelopmentGuide

Configure gitee-GNK

Пример конфигурации:

[post-receive.yml](./config/post-receive.yml)

[pre-receive.yaml](./config/pre-receive.yml)

[proc-receive.yml](./config/proc-receive.yml)

[update.yml](./config/update.yml)

### 3.3 Запустите хуки

Необходимо глобально запустить Gitee-Hook. Запустите следующую команду от имени того же пользователя, который запускал Gitaly.

```sh
git config --global core.hooksPath /path/to/gitee-hook/bin
```

## 4. Скрипт записи процесса развертывания

[](./gitaly/ru-gitaly.sh)