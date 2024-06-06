#!/bin/bash

CURRENT_DIR=$(pwd)
VALID_NODES=("node1" "node2")

# Проверка, есть ли файл .env ?
check_env(){
    if [ -f "$CURRENT_DIR/.env" ]; then
        set -a
        source $CURRENT_DIR/.env
        set +a
    else
        echo " ✕ Нет файла *.env , используйте 'cp .env.example .env' или создайте его вручную"
        echo 
        exit 1
    fi
}

# Проверка переменных окружения
check_env_config(){
    if [ -z "${DEPLOY_DIR}" ]; then
        echo " ✕ Нет переменной окружения DEPLOY_DIR , задайте её в файле .env"
        echo 
        exit 1
    else
        echo " ✔ DEPLOY_DIR: $DEPLOY_DIR"
    fi
}

show_help() {
    echo
    echo "Использование: ./init.sh [targetNode]..."
    echo
    echo "Значение параметра targetNode должно бы одним из:"
    echo "    all"
    for node in "${VALID_NODES[@]}"; do
        echo "    $node"
    done
    echo
    echo "Например:"
    echo "    ./init.sh all     Доставить сервисы всех узлов"
    echo "    ./init.sh node1   Доставить сервисы узла node1"
    echo
    exit 1
}

# Проверка, правильно ли задана версия
check_node() {
    for node in "${VALID_NODES[@]}"; do
        if [[ "$1" == "$node" ]]; then
            return 0 # Версия правильная
        fi
    done
    return 1 # Неправильная версия
}

# Проверка, есть ли директория
check_directory() {
    echo
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo " ✔ Создана директория $1"
        echo
    else
        echo " ✔ Есть директория $1"
        echo
    fi
}

sync_resource() {
    check_directory "$1"
    echo " ▶︎ Синхронизирую директорию сайта..."
    echo
    cp -R ./website "$1"
    echo " ▶︎ Синхронизирую директорию документации..."
    echo
    cp -R ./docs "$1"
    echo " ✔ $1 инициализирована"
}

resync_resource() {
    check_directory "$1"
    echo " ▶︎ Очищаю $1..."
    rm -rf "$1"
    echo " ✔ $1 очищена"
    sync_resource "$1"
}

show_success(){
    echo " ▶︎ $1 начата фоном."
    echo " ☞ Нажмите '$2' чтобы отобразить настройки запуска."
    echo
    exit
}

# 主函数
main() {
    if [ $# -ne 1 ]; then
        show_help
    fi
    echo
    echo " ☞ Текущая директория: $CURRENT_DIR"
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
