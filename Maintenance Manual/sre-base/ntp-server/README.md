

# NTP Server (Chrony)



## 1.NTP Server

### 1.1 Install and Configure Chrony.

```sh
root@dlp:~# apt -y install chrony
root@dlp:~# vi /etc/chrony/chrony.conf
# line 17: comment out default settings and add NTP Servers for your timezone
pool ntp.ubuntu.com        iburst maxsources 4
pool 0.ubuntu.pool.ntp.org iburst maxsources 1
pool 1.ubuntu.pool.ntp.org iburst maxsources 1
pool 2.ubuntu.pool.ntp.org iburst maxsources 2

# add to the end : add network range you allow to receive time syncing requests from clients
allow 10.4.145.0/24

root@dlp:~# systemctl restart chrony
root@dlp:~# systemctl enable --now chrony

# show status
root@dlp:~# chronyc sources
210 Number of sources = 14
MS Name/IP address         Stratum Poll Reach LastRx Last sample
===============================================================================
^? alphyn.canonical.com          2   6     1     1  +3715us[+3715us] +/-   81ms
^? prod-ntp-4.ntp4.ps5.cano>     2   6     1     1  +2112us[+2112us] +/-   27ms
^? prod-ntp-3.ntp1.ps5.cano>     2   6     1     3  +1259us[+1259us] +/-   24ms
^? prod-ntp-5.ntp4.ps5.cano>     2   6     1     4  +1452us[+1452us] +/-   28ms
^? 99-119-214-210.lightspee>     1   6     1     3   -944us[ -944us] +/-   66ms
^? 65-100-46-164.dia.static>     1   6     1     3  -3277us[-3277us] +/-  101ms
^? 155.248.196.28                2   6     1     1  +3766us[+3766us] +/-  107ms
^? 104.194.8.227                 2   6     1     1   -701us[ -701us] +/-  110ms
```





## 2.NTP Client

```sh
root@client:~# systemctl status systemd-timesyncd
*  systemd-timesyncd.service - Network Time Synchronization
     Loaded: loaded (/lib/systemd/system/systemd-timesyncd.service; enabled; ve>
     Active: active (running) since Mon 2020-04-27 01:20:36 UTC; 2min 6s ago
       Docs: man:systemd-timesyncd.service(8)
   Main PID: 662 (systemd-timesyn)
     Status: "Initial synchronization to time server 91.189.94.4:123 (ntp.ubunt>
      Tasks: 2 (limit: 4621)
     Memory: 1.5M
     CGroup: /system.slice/systemd-timesyncd.service
             +- 662 /lib/systemd/systemd-timesyncd

root@client:~# vi /etc/systemd/timesyncd.conf
# add to the end : set NTP server for your timezone
NTP=10.4.145.142

root@client:~# systemctl restart systemd-timesyncd

root@client:~# timedatectl timesync-status
       Server: 10.4.145.142 (10.4.145.142)
Poll interval: 1min 4s (min: 32s; max 34min 8s)
         Leap: normal
      Version: 4
      Stratum: 3
    Reference: B97DBE38
    Precision: 1us (-23)
Root distance: 30.089ms (max: 5s)
       Offset: +2.472ms
        Delay: 2.881ms
       Jitter: 0
 Packet count: 1
    Frequency: +35.907ppm
```



Set timezone

```sh
# Set Moscow Timezone
sudo timedatectl set-timezone Europe/Moscow

# Set China Timezone
[root@tianyi backups]# timedatectl list-timezones |grep Shanghai
Asia/Shanghai
[root@tianyi backups]# timedatectl set-timezone Asia/Shanghai
```
