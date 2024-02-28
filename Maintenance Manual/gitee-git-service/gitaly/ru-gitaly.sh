#!/bin/bash

########################### gitaly #####################
# 每台机器都需要执行
########################################################

#=> ubuntu 用户

# 安装编译 ruby 依赖
sudo apt install \
    build-essential cmake libjemalloc-dev libgdbm-dev libreadline-dev libssl-dev zlib1g-dev bison \
    libicu-dev pkg-config libpcre2-dev libcurl4-openssl-dev

mkdir oscsrc
cd oscsrc

# 安装 golang
wget https://dl.google.com/go/go1.21.1.linux-amd64.tar.gz
sudo tar -C /usr/local/ -xzf go1.21.1.linux-amd64.tar.gz

# 安装 git
sudo apt remove git
sudo apt install gettext
bash <(curl -fsSL https://gitee.com/oscstudio/git-dist/raw/master/git-dist-kernel.sh)
sudo ln -sf /usr/local/bin/git* /usr/bin/

#=> git 用户

sudo adduser git --disabled-login --gecos 'git'
sudo chown git:git /data/
sudo su - git
mkdir /data/repositories
ln -s /data/repositories /home/git/repositories

mkdir oscsrc
cd oscsrc

# 编译 ruby
wget http://cache.ruby-china.com/pub/ruby/2.7/ruby-2.7.6.tar.gz
tar -zxf ruby-2.7.6.tar.gz
cd ruby-2.7.6
./configure --prefix=/home/git/ruby276 --enable-rpath --enable-shared --disable-install-doc --disable-install-rdoc --with-jemalloc
make -j4
make install

export PATH="/home/git/ruby276/bin:/usr/local/go/bin:$PATH"

# 编译 gitaly
git clone -b release https://gitee.com/oscstudio/gitaly.git
cd gitaly/ruby
bundle config set path 'vendor/bundle'
bundle config set deployment 'true'
bundle install --path vendor/bundle --deployment
cd ..
make install
cp config.toml.example config.toml
#-> 之后修改配置文件

#=> ubuntu 用户

sudo cp /home/git/gitaly/systemd/gitaly.service /lib/systemd/system/
sudo vim /lib/systemd/system/gitaly.service
# 根据需要修改 systemd 文件中 ruby 路径
# Environment="PATH=/home/git/ruby276/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

sudo systemctl daemon-reload
sudo systemctl start gitaly.service
sudo systemctl enable gitaly.service

#################### gitee-hook ####################
# 1. gitee-git-service1 机器上打包
# 2. 将产物分发到其他机器部署
####################################################

#=> git 用户

########## 编译、打包

export PATH="/usr/local/go/bin:$PATH"

# 安装 bali 打包工具
cd oscsrc
git clone https://gitee.com/ipvb/baligo.git
cd baligo
./script/bootstrap.sh
export PATH="/home/git/oscsrc/baligo/build/bin:$PATH"

# gitee-hook 打包
git clone -b master https://gitee.com/oscstudio/gitee-hook.git
cd gitee-hook
make stg
#-> 产物 gitee-hook-linux-amd64-1.1.0.sh

########## 部署

#
scp gitee-hook-linux-amd64-1.1.0.sh gitee-git-service1:oscsrc/gitee-hook-linux-amd64-1.1.0.sh
scp gitee-hook-linux-amd64-1.1.0.sh gitee-git-service2:oscsrc/gitee-hook-linux-amd64-1.1.0.sh
scp gitee-hook-linux-amd64-1.1.0.sh gitee-git-service3:oscsrc/gitee-hook-linux-amd64-1.1.0.sh
scp gitee-hook-linux-amd64-1.1.0.sh gitee-git-service4:oscsrc/gitee-hook-linux-amd64-1.1.0.sh

# git 用户
/home/ubuntu/oscsrc/gitee-hook-linux-amd64-1.1.0.sh --prefix=/home/git/gitee-hook

./gitee-hook-linux-amd64-1.1.0.sh
cd /home/git/gitee-hook

mv post-receive.yml.example post-receive.yml
mv pre-receive.yml.example pre-receive.yml
mv proc-receive.yml.example proc-receive.yml
mv update.yml.example update.yml

git config --global core.hookspath /home/git/gitee-hook/bin
# 检查
git config --global --list

