FROM ubuntu:20.04
LABEL auther="hjl"
LABEL email="coder.hjl@gmail.com"
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ENV DEBIAN_FRONTEND=noninteractive
ENV LANG C.UTF-8



RUN set -eux;\
  sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list \
  && apt update \
  && apt-get -qq install -y --no-install-recommends ca-certificates \
  && apt-get -y autoremove --purge \
  && rm -rf /var/lib/apt/lists/* \
  && useradd -m -s $(which bash) -G sudo git 


COPY . /home/

WORKDIR /home

RUN set -eux;\
  bash lfsoss-linux-amd64-1.3.4.sh --prefix=/home/git/oscbin \
  && mkdir -p /home/git/oscbin/log \
  && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \ 
  && echo "Asia/Shanghai" > /etc/timezone 


EXPOSE 8002

ENTRYPOINT ["/home/docker-entrypoint.sh"]

CMD [ "/home/git/oscbin/bin/lfsserve"]