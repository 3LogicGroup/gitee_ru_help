FROM jenkinsci/blueocean:1.25.7

LABEL author="1879324"

USER root

# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk update
RUN apk upgrade
RUN apk add --no-cache ca-certificates tzdata && rm -rf /var/cache/apk/*
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
RUN apk add --no-cache bash curl wget nano && rm -rf /var/cache/apk/*
# Jenkins通过war包手动升级
# https://mirrors.tuna.tsinghua.edu.cn/jenkins/war/
COPY jenkins.war /usr/share/jenkins/jenkins.war

USER jenkins

COPY executors.groovy /usr/share/jenkins/ref/init.groovy.d/executors.groovy
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
# ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false -Djenkins.CLI.disabled=true"
