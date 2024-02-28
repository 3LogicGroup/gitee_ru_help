#!/bin/bash

set -e

# exec keepalived-setup.sh
if [ -x "/keepalived-setup.sh" ]; then
    . "/keepalived-setup.sh"
fi

# exec keepalived-clean.sh
if [ -x "/keepalived-clean.sh" ]; then
    . "/keepalived-clean.sh"
fi

# current user is root
if [ "$(id -u)" = "0" ]; then
    # recombine command line parameters
    command_line_all="--dont-fork --log-console"
    command_line_arg="${KEEPALIVED_COMMAND_LINE_ARGUMENTS}"
    command_line_arg=$(echo ${command_line_arg} | sed "s/\"//g")
    command_line_arg=$(echo ${command_line_arg} | sed "s/'//g")
    command_line_arg=$(echo ${command_line_arg} | sed "s/,/ /g")
    command_line_arg_array=(${command_line_arg})
    for cmd in ${command_line_arg_array[@]}; do
        command_line_all="${command_line_all} ${cmd}"
    done
    echo "command line parameters : ${command_line_all}"
    # start keepalived
    exec /usr/local/sbin/keepalived -f /etc/keepalived/keepalived.conf ${command_line_all}
fi

# exec some command
exec "$@"
