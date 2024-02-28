# NFS



## 1.  Configure NFS Server

``` sh
root@gitee-postgresql1:~# apt -y install nfs-kernel-server

root@gitee-postgresql1:~# vi /etc/idmapd.conf
# line 5 : uncomment and change to your domain name
# Domain = srv.world

root@gitee-postgresql1:~# vi /etc/exports
# Example for NFSv2 and NFSv3:
# /srv/homes       hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
#
# Example for NFSv4:
# /srv/nfs4        gss/krb5i(rw,sync,fsid=0,crossmnt,no_subtree_check)
# /srv/nfs4/homes  gss/krb5i(rw,sync,no_subtree_check)
/data/nfs          *(rw,fsid=0,async,no_subtree_check,no_auth_nlm,insecure,no_root_squash)

root@gitee-postgresql1:~# mkdir /data/nfs
root@gitee-postgresql1:~# systemctl restart nfs-server

# Reload NFS server configuration:
root@gitee-postgresql1:~ sudo exportfs -a
# Check NFS server status
root@gitee-postgresql1:~ sudo systemctl status  nfs-server
```



## 2. Configure NFS Client

```sh
root@gitee-postgresql2:~# apt -y install nfs-common

root@gitee-postgresql2:~# vi /etc/idmapd.conf
# line 5 : uncomment and change to your domain name
# Domain = srv.world

root@gitee-postgresql2:~# mount -t nfs 10.4.145.105:/data/nfs /mnt

root@gitee-postgresql2:~# df -Th
Filesystem                               Type      Size  Used Avail Use% Mounted on
udev                                     devtmpfs   32G     0   32G   0% /dev
tmpfs                                    tmpfs     6.3G  1.4M  6.3G   1% /run
/dev/vda1                                ext4      194G  2.2G  192G   2% /
tmpfs                                    tmpfs      32G   16K   32G   1% /dev/shm
tmpfs                                    tmpfs     5.0M     0  5.0M   0% /run/lock
tmpfs                                    tmpfs      32G     0   32G   0% /sys/fs/cgroup
/dev/loop0                               squashfs   64M   64M     0 100% /snap/core20/1822
/dev/loop1                               squashfs   50M   50M     0 100% /snap/snapd/17950
/dev/loop2                               squashfs   92M   92M     0 100% /snap/lxd/24061
/dev/vda15                               vfat      105M  6.1M   99M   6% /boot/efi
/dev/loop3                               squashfs   41M   41M     0 100% /snap/snapd/20290
/dev/loop4                               squashfs   64M   64M     0 100% /snap/core20/2015
tmpfs                                    tmpfs     6.3G     0  6.3G   0% /run/user/1000
/dev/mapper/vg_nfs_server-lvm_nfs_server xfs       500G  3.6G  497G   1% /data/nfs
10.4.145.105:/data/nfs                   nfs       500G  3.6G  497G   1% /mnt


# if mount with NFSv3, add [-o vers=3] option
root@gitee-postgresql2:~# mount -t nfs -o vers=3 dlp.srv.world:/home/nfsshare /mnt
```
