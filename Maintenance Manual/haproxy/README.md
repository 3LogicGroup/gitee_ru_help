# HAProxy

1. Развертывание

```sh
$ sudo apt upgrade -y
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:vbernat/haproxy-2.6 -y
$ sudo apt update
$ sudo apt -y install vim wget net-tools
$ sudo apt install haproxy -y
$ haproxy -v

# When the concurrent access is large enough to exhaust the ports on the server where HAProxy is running, subsequent TCP connections cannot be established to the backend, resulting in load balancing failure.
# Use the following command to add a port number
$ echo 1024 61000 > /proc/sys/net/ipv4/ip_local_port_range
```



```sh
# Modify SSH port number
sudo sed -i 's^#Port 22^Port 2222^' /etc/ssh/sshd_config
sudo systemctl restart sshd
```



Создание файлов сертификатов SSL

```
Multiple Certificates in One
cat gitee_ru_2025_01_14.crt intermediate_pem_globalsign_ssl_dv_wildcard_1.crt root_pem_globalsign_ssl_dv_wildcard_1.crt privatekey.txt  > haproxy_gitee_ru_ssl.pem

cp -rf haproxy_gitee_ru_ssl.pem ../
```

Справочные материалы:

[Объединение цепочек сертификатов — momingliu11 — cnblogs.com](https://www.cnblogs.com/dreamer-fish/p/7479294.html)





`haproxy.cfg`

```
global
        maxconn 20480
        ulimit-n 82000
        log /var/log/haproxy.log    local0
        log /var/log/haproxy.log    local1 notice
        chroot /var/lib/haproxy
        stats socket /run/haproxy/admin.sock mode 660 level admin
        stats timeout 30s
        user haproxy
        group haproxy
        tune.ssl.default-dh-param 2048
        tune.maxrewrite 4096
        tune.bufsize 32768
        daemon

defaults
        mode                    http
        log                     global
        option                  httplog
        option                  dontlognull
        option http-server-close
        option                  redispatch
        retries                 3
        timeout http-request    10s
        timeout queue           1m
        timeout connect         10s
        timeout client          1m
        timeout server          1m
        timeout http-keep-alive 10s
        timeout check           10s
        maxconn                 30000



# haproxy dashboard
listen stats
        bind *:8009
        stats enable
        mode http
        stats auth      admin:oschina123
        stats refresh   10s
        stats show-node
        stats admin if TRUE
        stats hide-version
        stats realm     HAProxy\ Statistics
        stats uri       /admin?stats

# gitee_assets
frontend gitee_assets_http
        bind *:80
        mode http
        # Redirect HTTP requests to HTTPS
        redirect scheme https if !{ ssl_fc }


# gitee_assets
frontend gitee_assets_https
        bind    *:443 ssl crt /etc/haproxy/haproxy_gitee_ru_ssl.pem
        mode http
        # send X-Forwarded-For header
        option        forwardfor except 127.0.0.0/8
        default_backend  gitee_assets_server


backend gitee_assets_server
        # balance with roundrobin
        mode http
        balance            leastconn
        http-request       set-header X-Forwarded-Port %[dst_port]
        http-request       add-header X-Forwarded-Proto https if { ssl_fc }
        # HAProxy redirect traffic to NGINX getting error "The plain HTTP request was sent to HTTPS port"
        # https://serverfault.com/questions/701580
        server assets1 10.4.145.107:31443 weight 1 maxconn 8192 check ssl verify none
        server assets2 10.4.145.32:31443 weight 1 maxconn 8192 check ssl verify none
        server assets3 10.4.145.79:31443 weight 1 maxconn 8192 check ssl verify none
        server assets4 10.4.145.37:31443 weight 1 maxconn 8192 check ssl verify none
        server assets5 10.4.145.168:31443 weight 1 maxconn 8192 check ssl verify none
        server assets6 10.4.145.113:31443 weight 1 maxconn 8192 check ssl verify none
        server assets7 10.4.145.34:31443 weight 1 maxconn 8192 check ssl verify none
        server assets8 10.4.145.25:31443 weight 1 maxconn 8192 check ssl verify none
        server assets9 10.4.145.57:31443 weight 1 maxconn 8192 check ssl verify none
        server assets10 10.4.145.116:31443 weight 1 maxconn 8192 check ssl verify none
        server assets11 10.4.145.26:31443 weight 1 maxconn 8192 check ssl verify none
        server assets12 10.4.145.123:31443 weight 1 maxconn 8192 check ssl verify none



# ssh_pilot
frontend ssh_pilot_frontend
        mode tcp
        bind :22
        option tcplog
        default_backend ssh_pilot_servers


backend ssh_pilot_servers
        mode tcp
        #balance       leastconn
        balance         source
        option          tcp-check
        server ssh_pilot_servers1 10.4.145.107:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers2 10.4.145.32:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers3 10.4.145.79:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers4 10.4.145.37:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers5 10.4.145.168:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers6 10.4.145.113:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers7 10.4.145.34:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers8 10.4.145.25:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers9 10.4.145.57:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers10 10.4.145.116:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers11 10.4.145.26:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
        server ssh_pilot_servers12 10.4.145.123:30022 weight 1 check inter 2s rise 2 fall 3 send-proxy
```



Включить ведение журнала haproxy

```sh
# vim /etc/haproxy/haproxy.cfg

log /var/log/haproxy.log    local0
log /var/log/haproxy.log    local1 notice

# Restart haproxy service for changes to take effect

# Next, make sure the /var/log/haproxy.log file exists and is writable
sudo touch /var/log/haproxy.log
sudo chown syslog:adm /var/log/haproxy.log

# Update the rsyslog configuration to redirect haproxy logs to the specified log file. Edit the file /etc/rsyslog.d/49-haproxy.conf:
vim /etc/rsyslog.d/49-haproxy.conf
local0.* /var/log/haproxy.log
local1.* /var/log/haproxy.log

sudo service rsyslog restart
sudo service haproxy restart

# Now, haproxy will start outputting logs to the /var/log/haproxy.log file. You can use the tail command to view and monitor the contents of the log file:
sudo tail -f /var/log/haproxy.log

Enable at startup
sudo systemctl enable --now haproxy
```






## 2. Мониторинг

"[3.26 Сбор данных HAProxy · Заметки Прометея (erdong.site)](https://erdong.site/prometheus-notes/chapter03-Exporter/3.26-haproxy-exporter.html)"



[【Cloud Native | Kubernetes Series】---Prometheus Monitoring Haproxy(Haproxy-exporter)-Блог CSDN](https://blog.csdn.net/qq_29974229/article/details/126697996)



Ранее был выпущен haproxy 2.0, обеспечивающий прямое внутреннее раскрытие метрик Prometheus, что позволяет удобно и быстро отслеживать состояние системы.

Мониторинг состояния системы с помощью метрик haproxy 2.0 prometheus