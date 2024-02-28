# from registry.cn-hangzhou.aliyuncs.com/rancococ/alpine:3.13.1
FROM registry.cn-hangzhou.aliyuncs.com/rancococ/alpine:3.13.1

# maintainer
MAINTAINER "rancococ" <rancococ@qq.com>

# set arg info
ARG KEEPALIVED_VER=2.0.20
ARG KEEPALIVED_URL=https://mirrors.huaweicloud.com/keepalived/keepalived-2.0.20.tar.gz
ARG GOTMPL_URL=https://github.com/rancococ/gotmpl/releases/download/v1.0.2/gotmpl-linux-x86-64

# copy script
COPY docker-entrypoint.sh /
COPY keepalived-setup.sh /
COPY keepalived-clean.sh /
COPY keepalived-notify.sh /
COPY keepalived.tmpl /etc/keepalived/

# install repositories and packages : busybox-suid curl bash bash-completion wget net-tools gettext zip unzip tar tzdata ncurses procps ttf-dejavu
RUN apk update && apk --no-cache add ipset iptables libnftnl libnfnetlink libnl3 openssl && \
    apk --no-cache add --virtual buildpacks autoconf gcc ipset-dev iptables-dev libnftnl-dev libnfnetlink-dev libnl3-dev make musl-dev openssl-dev && \
    curl --create-dirs -fsSLo /tmp/keepalived.tar.gz ${KEEPALIVED_URL} && \
    mkdir -p /tmp/keepalived-sources && \
    tar -xzf /tmp/keepalived.tar.gz --strip 1 -C /tmp/keepalived-sources && \
    cd /tmp/keepalived-sources && \
    ./configure --disable-dynamic-linking && \
    make && make install && \
    cd - && mkdir -p /etc/keepalived && \
    \rm -f /tmp/keepalived.tar.gz && \
    \rm -rf /tmp/keepalived-sources && \
    apk --no-cache del buildpacks && \
    \rm -rf /var/cache/apk/* && \
    curl --create-dirs -fsSLo /usr/local/bin/gotmpl "${GOTMPL_URL}" && \
    chmod +x /usr/local/bin/gotmpl && \
    chmod +x /docker-entrypoint.sh && \
    chmod +x /keepalived-setup.sh && \
    chmod +x /keepalived-clean.sh && \
    chmod +x /keepalived-notify.sh

# set environment
ENV LANG C.UTF-8
ENV TZ "Asia/Shanghai"
ENV TERM xterm

# stop signal
STOPSIGNAL SIGTERM

# entry point
ENTRYPOINT ["/docker-entrypoint.sh"]
