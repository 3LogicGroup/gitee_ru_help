# keepalived

Install Keepalived that uses VRRP (Virtual Router Redundancy Protocol) in order to build redundant configuration.This example is based on the environment like follows. Configure simply redundant settings for virtual IP address.

```
                            VIP:10.4.145.142
+----------------------+          |          +----------------------+
|  [gitee-sre2]  |10.4.145.75 | 10.4.145.135|  [gitee-sre1]  |
|     Keepalived#1     +----------+----------+     Keepalived#2     |
|                      |                     |                      |
+----------------------+                     +----------------------+
```

## 1. Install

```sh
root@gitee-sre2: ~# apt -y install keepalived
```

## 2. Configure Keepalived

### 2.1 master

`vi /etc/keepalived/keepalived.conf`

```
# create new
global_defs {
    router_id node01
}

vrrp_instance VRRP1 {
    state MASTER
    # if you like disable automatic failback, set this value with [BACKUP]
    # nopreempt
    # network interface that virtual IP address is assigned
    interface enp3s0
    # set unique ID on each VRRP interface
    # on the a VRRP interface, set the same ID on all nodes
    virtual_router_id 101
    # set priority : [Master] > [BACKUP]
    priority 200
    # VRRP advertisement interval (sec)
    advert_int 1
    # virtual IP address
    virtual_ipaddress {
        10.4.145.142/24
    }
}
```

```sh
root@gitee-sre2:/home/ubuntu/workdir/docker-compose/keepalived-docker# systemctl restart keepalived
root@gitee-sre2:/home/ubuntu/workdir/docker-compose/keepalived-docker# ip address show enp3s0
2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9000 qdisc fq_codel state UP group default qlen 1000
    link/ether fa:16:3e:6a:c2:a0 brd ff:ff:ff:ff:ff:ff
    inet 10.4.145.75/24 brd 10.4.145.255 scope global dynamic enp3s0
       valid_lft 24267sec preferred_lft 24267sec
    inet 10.4.145.142/24 scope global secondary enp3s0
       valid_lft forever preferred_lft forever
    inet6 fe80::f816:3eff:fe6a:c2a0/64 scope link
       valid_lft forever preferred_lft forever
```

### 2.2 Backup

`vi /etc/keepalived/keepalived.conf`

```
global_defs {
    router_id node02
    vrrp_skip_check_adv_addr
    #vrrp_strict
    enable_script_security
    script_user root
}

vrrp_instance VRRP1 {
    state BACKUP
    nopreempt
    interface enp3s0
    virtual_router_id 101
    priority 90
    advert_int 1
    authentication {
      auth_type PASS
      auth_pass 123456
    }
    virtual_ipaddress {
        10.4.145.142/24
    }
    notify /etc/keepalived/notify.sh
    notify_master /etc/keepalived/notify.sh VRRP1 MASTER
    notify_backup /etc/keepalived/notify.sh VRRP1 BACKUP
    notify_fault /etc/keepalived/notify.sh VRRP1 FAULT
}
```

```sh
root@gitee-sre2:/home/ubuntu# systemctl start keepalived
root@gitee-sre2:/home/ubuntu# systemctl enable --now keepalived
root@gitee-sre1:/home/ubuntu# systemctl start keepalived
root@gitee-sre1:/home/ubuntu# systemctl enable --now keepalived
root@gitee-sre2:/home/ubuntu# systemctl is-enabled keepalived.service
enabled
root@gitee-sre1:/home/ubuntu# systemctl is-enabled keepalived.service
enabled
```

## 3. Using keepalived for Virtual Machines in Openstack

References:

> [Virtual machine installation Keepalived binding VIP · openstack · See Yun (kancloud.cn)](https://www.kancloud.cn/pshizhsysu/openstack/2297705)

> [Sharing a Floating IP for External Service in OpenStack Cloud Using Keepalived | Coder Home (codenong.com)](https://www.codenong.com/cs106534245/)

> [openstack-虚机-keepalived-vip-配置及问题解决 | 点点滴滴 (tang-lei.com)](http://tang-lei.com/2019/07/30/opesntack-虚机-keepalived-vip-配置及问题解决/)

> [openstack 运维/openstack 运维手册.md - openstak-ceph_doc
  - 开源中国 (gitee.com)](https://e.gitee.com/oschina/repos/oschina/openstak-ceph-doc/blob/master/openstack运维/openstack运维手册.md)