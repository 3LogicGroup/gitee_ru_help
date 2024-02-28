FROM jenkins/inbound-agent:4.11-1

COPY bin/* /usr/bin/
COPY --chown=1000:1000 .kube /home/jenkins/.kube
COPY --chown=1000:1000 .docker /home/jenkins/.docker
