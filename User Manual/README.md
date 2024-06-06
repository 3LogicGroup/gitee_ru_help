# Справочный центр Gitee

## Структура ключевых каталогов и файлы

```bash
├── website                  # Исходный код справочного центра
│   ├── crowdin.yml          # Конфигурация Crowdin , будет использоваться для интернализации позже
│   ├── docs                 # Директория документации справочного центра (генерируется программно, не меняйте ничего в ней)
│   ├── docusaurus.config.js # Глобальные конфигурационные файлы справочного центра (включая состав панели навигации)
│   ├── sidebar              # Конфигурационные файлы боковой панели
│   └── sidebars.js          # Исполняемый файл боковой панели
└── docs                     # Директория документации справочного центра
```

## Настройка среды

Рекомендуется использовать LTS-версию `nodejs`.

### Используйте для настройки собственную среду

> Установите `nvm` для управления локальным окружением `Node.js`, см. документацию: https://github.com/nvm-sh/nvm#installing-and-updating
> 
> Чтобы загрузить и установить `Node.js`, посетите сайт: https://nodejs.org/zh-cn/

Установите `nvm`

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Установите `Node.js LTS` и назначьте версией по умолчанию

```bash
nvm install lts/gallium
nvm use lts/gallium --default
```

Установите зависимости среды и запустите предварительный просмотр

```bash
cd website && cp .env.example .env
npm install
npm run start
```

Установите зависимости среды и запустите предварительный просмотр

```bash
cd website
npm clear
```

Для предварительного просмотра результата зайдите на сайт http://127.0.0.1:3000/ 

### Перевод в Crowdin
```bash
# cli 
npm install @crowdin/cli@3 -g

# token
export CROWDIN_PERSONAL_TOKEN=<your-token>

# Export JSON
cd website  && docusaurus write-translations

# sync
cd .. && crowdin upload && crowdin download
```

### Сборка с помощью Docker

> Найдите на Baidu файлы для установки `Docker` и `docker-compose`.

Сборка образов Docker

```bash
docker-compose build
```

Сборка образов Docker

```bash
docker-compose build
```

Запуск образа

```bash
docker-compose up -d
```

Для предварительного просмотра результата зайдите на сайт http://127.0.0.1:3000/

## Как принять участие в разработку документации