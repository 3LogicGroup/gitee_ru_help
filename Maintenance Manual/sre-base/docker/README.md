Install Docker and Docker Compose

## 1.docker

```sh
$ sudo apt-get update
$ sudo apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common vim git sudo
$ sudo wget https://download.docker.com/linux/static/stable/x86_64/docker-23.0.4.tgz
$ sudo tar zxf docker-23.0.4.tgz
$ sudo cp docker/* /usr/bin
$ sudo cat >/etc/systemd/system/docker.service <<EOF
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target
[Service]
Type=notify
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=infinity
LimitNPROC=infinity
TimeoutStartSec=0
Delegate=yes
KillMode=process
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s
[Install]
WantedBy=multi-user.target
EOF

# Add executable permissions
$ sudo chmod +x /etc/systemd/system/docker.service
# Reload the configuration file
$ sudo systemctl daemon-reload

# Starting containers and setting up auto-start
$ sudo systemctl enable --now docker.service
Check the status
$ sudo systemctl status docker

$ docker version
# Configure image accelerator
$ mkdir /etc/docker/
$ cat > /etc/docker/daemon.json <<'EOF'
{
  "data-root": "/data/docker",
  "storage-driver": "overlay2",
  "insecure-registries": ["http://hub.gitee.com"],
  "registry-mirrors": ["https://25bxwt20.mirror.aliyuncs.com"],
  "live-restore": true,
  "default-shm-size": "128M",
  "max-concurrent-downloads": 10,
  "oom-score-adjust": -1000,
  "bip": "172.16.130.2/24",
  "exec-opts": ["native.cgroupdriver=systemd"],
  "hosts": ["tcp://0.0.0.0:2375", "unix:///var/run/docker.sock"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size":"100M",
    "max-file":"3"
  }
}
EOF

Enable buildx in Docker
$ mkdir -pv ~/.docker/cli-plugins/
$ wget -O ~/.docker/cli-plugins/docker-buildx \
    https://github.com/docker/buildx/releases/download/v0.10.0/buildx-v0.10.0.linux-amd64

$ chmod a+x ~/.docker/cli-plugins/docker-buildx 

# Set experimental parameters
$ vim ~/.docker/config.json
Add
{
        "aliases": {
                "builder": "buildx"
        }
}


# If the environment variable DOCKER_CLI_EXPERIMENTAL does not take effect on some systems (such as
$ export DOCKER_BUILDKIT=1
$ docker build --platform=local -o . git://github.com/docker/buildx
$ mkdir -p ~/.docker/cli-plugins && mv buildx ~/.docker/cli-plugins/docker-buildx


$ systemctl restart docker

$ docker buildx ls
NAME/NODE DRIVER/ENDPOINT STATUS  BUILDKIT PLATFORMS
default * docker
  default default         running 23.0.4   linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/amd64/v4, linux/386

# Adding docker user group
sudo groupadd docker
sudo gpasswd -a $USER docker     # Add the login user to the docker user group
Update the user group by running 'newgrp docker'
```



## 2.docker compose v1

```sh
$ curl -L "https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
$ ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

$ docker-compose version
Docker Compose version v2.16.0
```





## 3.docker compose v2
Install Docker Compose v2

Docker officially rewrote Docker Compose in Go language and integrated it as a subcommand of the docker CLI, called Compose V2

```sh
# 1. Download the binary file suitable for your system from the project release page and copy it to $HOME/.docker/cli-plugins as docker-compose to install Compose V2

# Run the following command to download the current stable version of Docker Compose
# This command installs Compose V2 for the user in the $HOME directory.
$ mkdir -p ~/.docker/cli-plugins/
$ curl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
$ chmod +x ~/.docker/cli-plugins/docker-compose


Install Docker Compose for all users in the system
$ mkdir -p /usr/local/lib/docker/cli-plugins
$ curl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
$ chmod +x /usr/local/lib/docker/cli-plugins/docker-compose


# Set docker-compose command compatible with v1
$ sudo ln -s  /usr/local/lib/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose

# 3. Test Installation
$ docker compose version
Docker Compose version v2.16.0
```





## 4. Uninstall docker and docker-compose

```sh
sudo rm -rf /etc/systemd/system/docker.service
sudo rm -rf /usr/bin/{containerd,containerd-shim-runc-v2,ctr,docker,docker-init,docker-proxy,dockerd,runc}
sudo rm -rf /etc/docker/
sudo systemctl daemon-reload
sudo systemctl disable docker.service
sudo rm -rf ~/.docker/cli-plugins/
sudo rm -rf /usr/local/lib/docker/cli-plugins
sudo rm -rf  /usr/local/bin/docker-compose
```
