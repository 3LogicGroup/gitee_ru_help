# Appendix - Configuring internal DNS and NTP for all server nodes

## DNS

```sh
# setting dns
sudo sed -i 's/^#DNS=.*/DNS=10.4.145.142/g' /etc/systemd/resolved.conf
sudo sed -i 's/^#DNSStubListener=.*/DNSStubListener=no/g' /etc/systemd/resolved.conf
sudo systemctl daemon-reload

sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
sudo systemctl restart systemd-resolved
```

## NTP

```sh
sudo apt-get -y install --reinstall systemd-timesyncd
sed -i s@#NTP=@NTP=10.4.145.142@  /etc/systemd/timesyncd.conf
systemctl restart systemd-timesyncd
timedatectl timesync-status
```