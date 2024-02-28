#!/bin/bash

CURRENT_DIR=$(pwd)
VALID_NODES=("node1" "node2")

# 检查 .env 文件是否存在
check_env(){
    if [ -f "$CURRENT_DIR/.env" ]; then
        set -a
        source $CURRENT_DIR/.env
        set +a
    else
        echo " ✕ .env file does not exist, please use 'cp .env.example .env' or create it manually"
        echo 
        exit 1
    fi
}

# 环境变量检查
check_env_config(){
    if [ -z "${DEPLOY_DIR}" ]; then
        echo " ✕ The environment variable DEPLOY_DIR does not exist, please set it in the .env file"
        echo 
        exit 1
    else
        echo " ✔ DEPLOY_DIR: $DEPLOY_DIR"
    fi
}

show_help() {
    echo
    echo "Usage: ./init.sh [targetNode]..."
    echo
    echo "The targetNode parameter must be one of:"
    echo "    all"
    for node in "${VALID_NODES[@]}"; do
        echo "    $node"
    done
    echo
    echo "For example:"
    echo "    ./init.sh all     Deploy all node services"
    echo "    ./init.sh node1   Deploy node1 services"
    echo
    exit 1
}

# 检查版本参数是否有效的函数
check_node() {
    for node in "${VALID_NODES[@]}"; do
        if [[ "$1" == "$node" ]]; then
            return 0 # 参数有效
        fi
    done
    return 1 # 参数无效
}

# 检查目录是否存在
check_directory() {
    echo
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo " ✔ The directory $1 was created"
        echo
    else
        echo " ✔ Directory already exists: $1"
        echo
    fi
}

sync_resource() {
    check_directory "$1"
    echo " ▶︎ Syncing website directory..."
    echo
    cp -R ./website "$1"
    echo " ▶︎ Syncing docs directory..."
    echo
    cp -R ./docs "$1"
    echo " ✔ $1 has been initialized"
}

resync_resource() {
    check_directory "$1"
    echo " ▶︎ Cleaning $1..."
    rm -rf "$1"
    echo " ✔ $1 has been cleaned"
    sync_resource "$1"
}

show_success(){
    echo " ▶︎ $1 has started in the background."
    echo " ☞ Use '$2' to view startup details."
    echo
    exit
}

# 主函数
main() {
    if [ $# -ne 1 ]; then
        show_help
    fi
    echo
    echo " ☞ Current directory: $CURRENT_DIR"
    echo
    check_env
    check_env_config

    if [[ "$1" != "all" ]] && ! check_node "$1"; then
        show_help
    else
        if [[ "$1" == "all" ]]; then
            for node in "${VALID_NODES[@]}"; do
                sync_resource "$DEPLOY_DIR/website_$node"
            done
            docker-compose up -d
            show_success "Docker-compose" "docker-compose logs -f"
        elif check_node "$1"; then
            docker-compose stop "docusaurus_$1"
            resync_resource "$DEPLOY_DIR/website_$1"
            docker-compose up -d "docusaurus_$1"
            show_success "docusaurus_$1" "docker-compose logs -f docusaurus_$1"
        else
            show_help
        fi
    fi
}

main "$@"
