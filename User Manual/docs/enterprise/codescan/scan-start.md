---
title: Инициировать сканирование
---

## Полное сканирование

- Примечание: Ручное сканирование - это полное сканирование, а отправка запроса на слияние или кода запускает режим инкрементного сканирования.

1. Подтвердить создание соответствующего модуля в GiteeScan.

- Если не было создано ни одного проверяемого модуля, нажмите на Настройки репозитория:
![Инициировать сканирование]](./assets/scan-start-1.png)
Настройки репозитория могут быть перенаправлены на страницу создания модуля сканирования. Репозиторий кода по умолчанию является текущим репозиторием и не может быть изменен. Для создания модуля сканирования введите и настройте соответствующий контент.
![Начать сканирование](./assets/scan-start-2.png)

- Администраторы предприятий также могут нажать на навигацию по коду, чтобы войти в меню вспомогательного продукта GiteeScan:
![Инициировать сканирование](./assets/scan-start-3.png)
Чтобы выбрать соответствующий репозиторий для создания соответствующего модуля, выберите модуль, который необходимо проверить, в меню вспомогательного продукта "Сканирование", затем нажмите кнопку "Создать" .
![Инициировать сканирование](./assets/scan-start-4.png)
![Инициировать сканирование](./assets/scan-start-5.png)

2. Как инициировать полное сканирование после создания тестируемого модуля

- В репозитории выберите Новое сканирование (New Scan):
![Инициировать сканирование](./assets/scan-start-6.png)

- В меню вспомогательного продукта "Сканирование" выберите проверяемый модуль, затем нажмите на значок черепашки, чтобы запустить сканирование:
![Начать сканирование](./assets/scan-start-7.png)

Инкрементное сканирование

Шаги по созданию проверяемого модуля см. в описании полного сканирования

- Отправка кода запускает сканирование, поэтому необходимо выбрать отправку кода в качестве метода запуска для создания проверяемого модуля:
![Начать сканирование](./assets/scan-start-8.png)

Создание завершено, тперь отправка кода в соответствующий репозиторий запустит сканирование кода

- Срабатывает при создании обзора кода (запрос на слияние), выберите "Создать триггер просмотра кода для проверяемого модуля":
![Начать сканирование](./assets/scan-start-9.png)

Создание завершено, теперь создание запроса на слияние в соответствующем репозитории запустит сканирование кода

## Сканирование уязвимостей распределённого виртуальноего пространства и анализ соответствия лицензиям

Примечание: Текущая версия поддерживает только полное сканирование на наличие уязвимостей распределенного рабочего пространства и анализ соответствия лицензии.
Ознакомьтесь с шагом 2.1 для создания тестового модуля

- Настройки анализа уязвимостей распределённого виртуальноего пространства и соответствия лицензионным требованиям:
![Начать сканирование](./assets/scan-start-10.png)
Выбрав модуль для проверки на странице вспомогательного продукта "Сканирование" и нажав на значок черепашки, вы можете запустить проверку вручную. Включите переключатель анализа компоннетов для выполнения сканирования уязвимостей распределенного пространства и анализа соответствия лицензии.
![Начать сканирование](./assets/scan-start-11.png)
Создайте новое сканирование в репозитории и включите переключатель анализа компонентов для выполнения сканирования уязвимостей распределенного рабочего пространства и анализа соответствия лицензии.