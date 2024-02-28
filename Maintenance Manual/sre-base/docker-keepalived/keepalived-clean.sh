#!/bin/bash

set -e

echo "run the script keepalived-clean.sh"

# try to delete virtual ips from interface
OLD_IFS="$IFS" && IFS="," && VIPS_ARR=(${KEEPALIVED_VIRTUAL_IPS}) && VIPS_LEN=${#VIPS_ARR[@]} && IFS="$OLD_IFS"
for idx in ${!VIPS_ARR[@]}; do
    OLD_IFS="$IFS" && IFS=":" && DEV_IP=(${VIPS_ARR[${idx}]}) && DEV_LEN=${#DEV_IP[@]} && IFS="$OLD_IFS"
    if [ ${DEV_LEN} -ne 2 ]; then
        continue;
    fi
    ip addr del ${DEV_IP[1]} dev ${DEV_IP[0]} || true
done

# try to delete keepalived.pid and vrrp.pid
rm -rf /var/run/keepalived.pid
rm -rf /var/run/vrrp.pid
