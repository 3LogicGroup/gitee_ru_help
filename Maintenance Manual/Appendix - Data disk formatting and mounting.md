# Format and mount data disk

Disk partition

```sh
fdisk /dev/vdb

Welcome to fdisk (util-linux 2.34).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xd1e1c968.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-1048575999, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-1048575999, default 1048575999):

Created a new partition 1 of type 'Linux' and of size 500 GiB.

Command (m for help): t
Selected partition 1
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'.

Command (m for help): w
```

Create pv and vg

```

root@gitee-git-service1:/home/ubuntu# pvcreate /dev/vdb1
  Physical volume "/dev/vdb1" successfully created.


root@gitee-git-service1:/home/ubuntu# vgcreate vg_git_server /dev/vdb1
  Volume group "vg_git_server" successfully created
root@gitee-git-service1:/home/ubuntu# vgdisplay
  --- Volume group ---
  VG Name               vg_git_server
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <500.00 GiB
  PE Size               4.00 MiB
  Total PE              127999
  Alloc PE / Size       0 / 0
  Free  PE / Size       127999 / <500.00 GiB
  VG UUID               EE9XNp-GRa4-GZLm-jDTv-scVy-ovZm-Gfj4aR
```

Create lvm

```sh
# Created a logical volume named lvm_git_server using all available space of the volume group vg_git_server
root@gitee-git-service1:/home/ubuntu# lvcreate -n lvm_git_server -l 100%FREE vg_git_server
## Or allocate a specified size as follows
# lvcreate -n lvm_git_server -L 499.9G vg_git_server
  Rounding up size to full physical extent 499.90 GiB
  Logical volume "lvm_git_server" created.
root@gitee-git-service1:/home/ubuntu# lvdisplay
  --- Logical volume ---
  LV Path                /dev/vg_git_server/lvm_git_server
  LV Name                lvm_git_server
  VG Name                vg_git_server
  LV UUID                08Fx0H-QYQE-26YL-rlI2-3mCI-eAc4-OKp8wi
  LV Write Access        read/write
  LV Creation host, time gitee-git-service1, 2023-12-08 09:40:43 +0000
  LV Status              available
  # open                 0
  LV Size                499.90 GiB
  Current LE             127975
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0

```

Format mounting

```sh

root@gitee-git-service1:/home/ubuntu# lsblk
NAME                             MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0                              7:0    0  63.3M  1 loop /snap/core20/1822
loop1                              7:1    0  91.9M  1 loop /snap/lxd/24061
loop2                              7:2    0  49.8M  1 loop /snap/snapd/17950
loop3                              7:3    0  40.9M  1 loop /snap/snapd/20290
loop4                              7:4    0  63.5M  1 loop /snap/core20/2015
vda                              252:0    0   500G  0 disk
├─vda1                           252:1    0 499.9G  0 part /
├─vda14                          252:14   0     4M  0 part
└─vda15                          252:15   0   106M  0 part /boot/efi
vdb                              252:16   0   500G  0 disk
└─vdb1                           252:17   0   500G  0 part
  └─vg_git_server-lvm_git_server 253:0    0 499.9G  0 lvm
root@gitee-git-service1:/home/ubuntu# mkfs.xfs /dev/vg_git_server/lvm_git_server
meta-data=/dev/vg_git_server/lvm_git_server isize=512    agcount=4, agsize=32761600 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1
data     =                       bsize=4096   blocks=131046400, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=63987, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0


root@gitee-git-service1:/home/ubuntu# blkid
.....
/dev/vdb1: UUID="3RLoDW-Usxc-ddFT-ZkwV-WSmk-Qkhz-3M3RIw" TYPE="LVM2_member" PARTUUID="d1e1c968-01"
/dev/mapper/vg_git_server-lvm_git_server: UUID="630ea5a8-6612-46f6-ae08-a973fd71deb8" TYPE="xfs"
root@gitee-git-service1:/home/ubuntu# mkdir /data
root@gitee-git-service1:/home/ubuntu# echo 'UUID="630ea5a8-6612-46f6-ae08-a973fd71deb8" /data     xfs    defaults  0  0 ' >> /etc/fstab
root@gitee-git-service1:/home/ubuntu# mount -a
root@gitee-git-service1:/home/ubuntu# lsblk
NAME                             MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0                              7:0    0  63.3M  1 loop /snap/core20/1822
loop1                              7:1    0  91.9M  1 loop /snap/lxd/24061
loop2                              7:2    0  49.8M  1 loop /snap/snapd/17950
loop3                              7:3    0  40.9M  1 loop /snap/snapd/20290
loop4                              7:4    0  63.5M  1 loop /snap/core20/2015
vda                              252:0    0   500G  0 disk
├─vda1                           252:1    0 499.9G  0 part /
├─vda14                          252:14   0     4M  0 part
└─vda15                          252:15   0   106M  0 part /boot/efi
vdb                              252:16   0   500G  0 disk
└─vdb1                           252:17   0   500G  0 part
  └─vg_git_server-lvm_git_server 253:0    0 499.9G  0 lvm  /data
```