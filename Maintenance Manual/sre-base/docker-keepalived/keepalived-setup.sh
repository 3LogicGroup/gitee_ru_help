#!/bin/bash

set -e

echo "run the script keepalived-setup.sh"

KEEPALIVED_TMPL="/etc/keepalived/keepalived.tmpl"
KEEPALIVED_YAML="/etc/keepalived/keepalived.yaml"
KEEPALIVED_CONF="/etc/keepalived/keepalived.conf"

# automatically generated when keepalived.conf does not exist
if [ ! -e "${KEEPALIVED_CONF}" ]; then
    echo "the container first start."
    # check and set default values
    if [ -z "${KEEPALIVED_BIND_INTERFACE}" ]; then
        KEEPALIVED_BIND_INTERFACE="ens33"
    fi
    if [ -z "${KEEPALIVED_ROUTER_ID}" ]; then
        KEEPALIVED_ROUTER_ID="100"
    fi
    if [ -z "${KEEPALIVED_NODE_PREFIX}" ]; then
        KEEPALIVED_NODE_PREFIX="node"
    fi
    if [ -z "${KEEPALIVED_NODE_STATES}" ]; then
        KEEPALIVED_NODE_STATES="BACKUP,BACKUP"
    fi
    if [ -z "${KEEPALIVED_NODE_PRIORITYS}" ]; then
        KEEPALIVED_NODE_PRIORITYS="100,90"
    fi
    if [ -z "${KEEPALIVED_AUTH_PASS}" ]; then
        KEEPALIVED_AUTH_PASS="abcd1234"
    fi
    if [ -z "${KEEPALIVED_NOTIFY}" ]; then
        KEEPALIVED_NOTIFY="/keepalived-notify.sh"
    fi
    OLD_IFS="$IFS" && IFS="," && STAS_ARR=(${KEEPALIVED_NODE_STATES}) && STAS_LEN=${#STAS_ARR[@]} && IFS="$OLD_IFS"
    OLD_IFS="$IFS" && IFS="," && PRIS_ARR=(${KEEPALIVED_NODE_PRIORITYS}) && PRIS_LEN=${#PRIS_ARR[@]} && IFS="$OLD_IFS"
    OLD_IFS="$IFS" && IFS="," && NIPS_ARR=(${KEEPALIVED_NODE_IPS}) && NIPS_LEN=${#NIPS_ARR[@]} && IFS="$OLD_IFS"
    OLD_IFS="$IFS" && IFS="," && VIPS_ARR=(${KEEPALIVED_VIRTUAL_IPS}) && VIPS_LEN=${#VIPS_ARR[@]} && IFS="$OLD_IFS"
    # echo ${STAS_LEN} ${PRIS_LEN} ${NIPS_LEN} ${VIPS_LEN}
    # nips's length < 1
    if [ ${NIPS_LEN} -lt 1 ]; then
        echo "the length of KEEPALIVED_NODE_IPS must be greater than or equal to 1, and separated by commas. eg:192.168.1.11,192.168.1.12"
        exit 1
    fi
    # vips's length < 1
    if [ ${VIPS_LEN} -lt 0 ]; then
        echo "the length of KEEPALIVED_VIRTUAL_IPS must be greater than or equal to 0, and separated by commas. eg:ens33:192.168.8.160/24,ens33:192.168.9.160/24"
        exit 1
    fi

    # generate ${KEEPALIVED_YAML}
    mkdir -p /tmp
    touch ${KEEPALIVED_YAML}
    printf ""                                                                                     > ${KEEPALIVED_YAML}
    printf "keepalived:\n"                                                                       >> ${KEEPALIVED_YAML}
    printf "  bindInterface: '${KEEPALIVED_BIND_INTERFACE}'\n"                                   >> ${KEEPALIVED_YAML}
    printf "  routerId: '${KEEPALIVED_ROUTER_ID}'\n"                                             >> ${KEEPALIVED_YAML}
    printf "  states:\n"                                                                         >> ${KEEPALIVED_YAML}
    for ((i=0;i<${#STAS_ARR[@]};i++)); do
        ((ii=i+1))
        printf "  - '@node${ii} state ${STAS_ARR[$i]}'\n"                                        >> ${KEEPALIVED_YAML}
    done
    printf "  prioritys:\n"                                                                      >> ${KEEPALIVED_YAML}
    for ((i=0;i<${#PRIS_ARR[@]};i++)); do
        ((ii=i+1))
        printf "  - '@node${ii} priority ${PRIS_ARR[$i]}'\n"                                     >> ${KEEPALIVED_YAML}
    done
    printf "  localIps:\n"                                                                       >> ${KEEPALIVED_YAML}
    for ((i=0;i<${#NIPS_ARR[@]};i++)); do
        ((ii=i+1))
        printf "  - '@node${ii} unicast_src_ip ${NIPS_ARR[$i]}'\n"                               >> ${KEEPALIVED_YAML}
    done
    printf "  peerIps:\n"                                                                        >> ${KEEPALIVED_YAML}
    for ((i=0;i<${#NIPS_ARR[@]};i++)); do
        ((ii=i+1))
        printf "  - '@^node${ii} ${NIPS_ARR[$i]}'\n"                                             >> ${KEEPALIVED_YAML}
    done
    printf "  vips:\n"                                                                           >> ${KEEPALIVED_YAML}
    for idx in ${!VIPS_ARR[@]}; do
        OLD_IFS="$IFS" && IFS=":" && DEV_IP=(${VIPS_ARR[${idx}]}) && DEV_LEN=${#DEV_IP[@]} && IFS="$OLD_IFS"
        if [ ${DEV_LEN} -ne 2 ]; then
            continue;
        fi
        ((ii=idx+1))
        printf "  - '${DEV_IP[1]} dev ${DEV_IP[0]} label ${DEV_IP[0]}:vip:${ii}'\n"              >> ${KEEPALIVED_YAML}
    done
    printf "  pass: '${KEEPALIVED_AUTH_PASS}'\n"                                                 >> ${KEEPALIVED_YAML}
    printf "  notify: 'notify ${KEEPALIVED_NOTIFY}'\n"                                           >> ${KEEPALIVED_YAML}

    echo "generate ${KEEPALIVED_YAML} success."
    cat ${KEEPALIVED_YAML}
    echo ""

    # generate ${KEEPALIVED_CONF}
    gotmpl --template="f:${KEEPALIVED_TMPL}" --yamldata="f:${KEEPALIVED_YAML}" --outfile="${KEEPALIVED_CONF}"
    # important
    chmod 644 ${KEEPALIVED_CONF}
    echo "generate ${KEEPALIVED_CONF} success."
    cat ${KEEPALIVED_CONF}
    #echo "remove temp file"
    #\rm -rf ${KEEPALIVED_TMPL}
    #\rm -rf ${KEEPALIVED_YAML}
    echo ""
fi
