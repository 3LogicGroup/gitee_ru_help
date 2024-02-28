# rsync

For example, Configure Rsync to copy files and directories under the [/data/nfs] on  nfs1-server to [/data/nfs] on nfs2-server.



```
+----------------------+          |          +----------------------+
|     nfs1-server    |10.4.145.35 | 10.4.145.1051|   nfs2-server   |
|                      +----------+----------+                      |
|     /root/work/*     |   ------------->    |     /home/backup/*   |
+----------------------+        copy         +----------------------+
```



## 1. nfs2-server

```sh
nfs2-server:~# apt -y install rsync
nfs2-server:~# vi /etc/rsync_exclude.lst
# specify files or directories you'd like to exclude to copy
test
test.txt
```



## 2. nfs1-server

```sh
nfs1-server:~# apt -y install rsync
nfs1-server:~# vi /etc/rsyncd.conf
max connections = 4
strict modes = yes
log file = /var/log/rsyncd.log
pid file = /var/run/rsyncd.pid

[workdir]
    path = /home/ubuntu/workdir
    hosts allow = 10.4.145.135
    hosts deny = *
    uid = root
    gid = root
    comment = Rsync Share
    read only = no
    list = yes

[data]
    path = /root/work
    hosts allow = 10.4.145.135
    hosts deny = *
    uid = root
    gid = root
    comment = Rsync Share
    read only = no
    list = yes

nfs1-server:~# mkdir /home/backup
nfs1-server:~# systemctl start rsync
nfs1-server:~# systemctl enable --now rsync
```



## 3. Set scheduled tasks

```sh
nfs2-server:~# crontab -l

*/2 * * * * rsync -avzrtopgHu --delete --bwlimit=8192 --exclude-from=/etc/rsync_exclude.lst 10.4.145.75::backup /data/nfs
```



## Reference

Linux Remote Data Sync Tool (yuque.com)
