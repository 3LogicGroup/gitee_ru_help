 # Install coredns-docker

> Repository address: https://gitee.com/autom-studio/coredns-docker



Due to the systemd-resolved service managing the DNS system for DNS caching in the Ubuntu operating system, the /etc/resolv.conf file on the host is configured with the address 127.0.0.53. coredns uses this configuration for forwarding, resulting in infinite forwarding.


Disable cloud host `systemd-resolved` service

```sh
systemctl disable systemd-resolved.service 
systemctl stop systemd-resolved.service 
systemctl mask systemd-resolved.service 
```

Create configuration file persistence directory and copy configuration file
```sh
$ mkdir -p /data/coredns/zones
$ cd coredns-docker/coredns
$ cp hosts /data/coredns/

# Taking adding zone autom.studio as an example:
$ cp autom.studio /data/coredns/zones/autom.studio
$ cp Corefile.template /data/coredns/Corefile
```

/data/coredns/Corefile configuration file is as follows

[Corefile](./Corefile.template)


- Hosts file parsing
[hosts](./hosts)


- Zone resolution
[autom.studio](./autom.studio)



The host directory is empty. You need to add the host A record mapping to this file.

> Note: I am using the latest version of the coredns/coredns:1.10.1 image.
> Customizing your own image is also possible


- The content of the docker-compose.yml file is as follows

[docker-compose-host-network.yml](./docker-compose-host-network.yml)


Deploy coredns
```sh
$ docker-compose -f docker-compose-host-network.yml up -d
```


- Test Host File
```sh
root@gdc-ci-base:/data/coredns# cat hosts

root@gdc-ci-base:/data/coredns# dig lfs.autom.studio @172.18.0.95
;; ANSWER SECTION:
lfs.autom.studio.       23      IN      CNAME   autom.studio.
autom.studio.           23      IN      A       106.12.45.72
......
```

Test zone file
```sh
root@gdc-ci-base:/data/coredns# dig ai.autom.studio @172.18.0.95
.....

;; ANSWER SECTION:
ai.autom.studio.        7       IN      A       172.18.0.96


root@gdc-ci-base:/data/coredns# dig test.autom.studio @172.18.0.95
.....
;; ANSWER SECTION:
test.autom.studio.      30      IN      A       172.18.0.97
......
```


- Test etcd

```sh
A/CNAME record
## Add/Modify Resolution
$ docker exec -it etcd etcdctl put /devops/com/gitlab/devops/@/1 '{"host":"192.168.100.100","ttl":10}'


# /devops is a fixed prefix; /com/gitee/devops is the domain name to be resolved: devops.gitee.com;
  /@ is a fixed ending identifier; /1 represents the value of the resolution, which can be any value, used to represent multiple resolution values for the same domain name

View parsing
$ docker exec -it etcd etcdctl get /devops/com/gitlab/devops --prefix
/devops/com/gitlab/devops/@/1
{"host":"192.168.100.100","ttl":10}


Remove parsing
$ docker exec -it etcd etcdctl del /devops/com/gitlab/devops/@/1

# PTR Records (reverse DNS lookup based on IP)
# Add/Modify parsing
$ docker exec -it etcd etcdctl put /gitee/arpa/in-addr/192/168/100/100/@ '{"host":"devops.gitlab.com.","ttl":10,"type":"PTR"}' # 192.168.100.100 -> devops.gitee.com
# View and delete as above

```

```sh
root@gdc-ci-base:/data/coredns# dig devops.gitlab.com @172.18.0.95

.....
;; ANSWER SECTION:
devops.gitlab.com.      10      IN      A       192.168.100.100
....
```


Add custom domain name resolution in CoreDNS of Kubernetes
```sh
$ kubectl get cm/coredns -o yaml -n kube-system

apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health
        log
        kubernetes cluster.local in-addr.arpa ip6.arpa {
            pods insecure
            fallthrough in-addr.arpa ip6.arpa
            ttl 30
        }
        prometheus :9153
        forward . 172.18.0.95 {
            max_fails 3
            max_concurrent 1000
            prefer_udp
        }
        cache 30
        loop
        reload
        loadbalance
    }
kind: ConfigMap

```

> Note there is a dot (.) after 'forward'.
>
> 172.18.0.95 is the internal data center Coredns server.





You can also add host A records as follows:

```sh

        hosts {  # Add custom domain name resolution
          192.168.31.x git.k8s.local
          192.168.31.x jenkins.k8s.local
          192.168.31.x harbor.k8s.local
          fallthrough
        }
```



You can add the following content to the Corefile to configure wildcard domain resolution and A records:

```yaml
.:53 {
    # Other configuration items
    # ...
    
    # Wildcard domain resolution
    rewrite name regex (.*)\.internal\.example\.com internal.example.com
    
    # A Record Resolution
    hosts {
        10.0.0.1 a.internal.example.com
        10.0.0.2 b.internal.example.com
        # Other records
        # ...
    }
}

```



The rewrite directive is used for wildcard domain resolution, resolving all domain names ending with .internal.example.com to internal.example.com. The hosts directive is used to configure A record resolution, resolving the specified domain name to the corresponding IP address.

Remember to modify the path of Corefile and reload the configuration file to make the configuration take effect.





FQA:


Troubleshooting CoreDNS continuous restart issue

https://www.zerchin.xyz/2021/08/12/CoreDNS%E4%B8%8D%E6%96%AD%E9%87%8D%E5%90%AF%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5/