---
title: Язык Golang
description: Язык Golang
slug: /enterprise/pipeline/faq/compile/golang
keywords:
 - Gitee
 - Golang
 - Сборка
 - Задача
---

## 1. Команда Go build при выполнении "make build" возвращает сообщение об ошибке "No rule to make target".

Ответ:

1. Вы можете воспроизвести эту ошибку, выполнив 'make build' в корневом каталоге репозитория кода на вашей локальной машине. Для выполнения 'make build' требуется Makefile, которого нет в вашем репозитории кода. Вы можете поискать его в Google или обратиться к этому документу: https://www.cnblogs.com/guigujun/p/10702154.html.

2. Или вы можете изменить команду выполнения в конвейере и использовать локальную команду сборки, которая проходит, например go build.

## 2. Медленное выполнение Go build, Go proxy

Ответ: экспортируйте GOPROXY=https://goproxy.cn