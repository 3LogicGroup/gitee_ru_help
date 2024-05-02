---
title: Триггерные события
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/pipeline/trigger
description: Что такое Gitee Go
origin-url: 
---

Триггерные события — это «триггеры», которые могут выполнять конвейеры, разделенные на триггеры отправки, триггеры запроса на слияние и запланированные триггеры.

### Отправка триггера

События отправки генерируются тремя действиями: локальной отправкой, слиянием веток и запросом на слияние. Таким образом, если в конвейере настроен запуск события отправки, все три операции автоматически запускают выполнение конвейера.

В отправке укажите следующие три правила сопоставления. Три правила сопоставления пересекаются, а это означает, что для запуска конвейера должны быть выполнены все правила.

- Сопоставление веток: существует четыре правила сопоставления.
- Сопоставление префиксов: например, если вы введете «dev», оно будет соответствовать всем веткам, начинающимся с «dev». Если оставить пустым, оно соответствует всем веткам.
- Точное совпадение: если указано «dev», будет сопоставлена ​​только ветка «dev».
- Соответствие регулярному выражению: например, если вы заполните «dev.*», оно будет соответствовать всем веткам с префиксом «dev».
- Точное исключение: если указано «dev», отправка кода в ветку «dev» не приведет к запуску конвейера. Точные правила исключения имеют наивысший приоритет и обычно используются вместе с другими правилами.
- Совпадение тегов: как и в случае с совпадением веток, существует четыре правила сопоставления.
- Сопоставление префиксов: например, если вы введете «v1», оно будет соответствовать всем тегам, начинающимся с «v1». Если оставить пустым, оно соответствует всем тегам.
- Точное соответствие: например, если вы введете «v1.1.1», оно будет соответствовать только тегу «v1.1.1».
- Соответствие регулярному выражению: если указано «v1.*», оно будет соответствовать всем тегам, начинающимся с «v1».
- Точное исключение: если заполнено `v1.1.1`, создание тега `v1.1.1` не приведет к запуску конвейера. Точные правила исключения имеют наивысший приоритет и обычно используются в сочетании с другими правилами.
- Соответствие ключевых слов в комментариях коммита: поддерживается только сопоставление регулярных выражений.
- Соответствие регулярному выражению: если заполнено `.*build.*`, то любое сообщение коммита, содержащее ключевое слово "build", запускает конвейер.

 **Конкретные сценарии:**
Ветка настроена на точное соответствие «master», тег настроен на соответствие префикса «v1», а ключевое слово комментария коммита настроено на «.*build.*», как показано на следующем рисунке.
![Отправьте конкретный сценарий](https://images.gitee.ru/uploads/images/2021/1117/132658_cb370f63_5192864.png)
So:

- При коммите по master, сообщением о коммите является «Gitee Go», конвейер не может быть запущен.
- Когда код отправляется в master, но сообщение коммита имеет вид «Gitee build Go», конвейер может быть запущен
- При отправке тега v1.10.1, но сообщениее коммита является «Gitee Go», конвейер не может быть запущен.
- При отправке тега версии 1.10.1, но сообщением коммита является «Gitee build Go», конвейер может быть запущен.

 **Пример использования**:
**[Рекомендуется]** Вы можете посмотреть на скриншоте:
![Конфигурация отправки](https://images.gitee.ru/uploads/images/2021/1117/132749_6dd78ade_5192864.png)

 **Вы можете посмотреть в Yml:**

```yaml
# Indicates enabling automatic triggering of pipelines
triggers:
Enable push event monitoring, which can match branches, tags, and commit comments (Commit Message).
  push:
Enable branch matching, supports alphanumeric characters (including upper and lower case), hyphens, underscores, and common characters, with a maximum of 64 characters.
    branches: 
# Enable prefix matching, you can fill in multiple prefixes, if not filled, it will listen to all branches by default
      prefix:
        - release
# Enable precise matching, you can fill in multiple branches, please fill in the complete branch name
      precise:
        - master
# Enable regular expression matching, you can enter multiple regular expressions, please fill in the regular expression
      include:
        - master
        - dev*
# Enable precise exclusion, you can fill in multiple branches, please fill in the complete branch name
      exclude:
        - release
    # Enable Tag matching, supports numbers, letters (including upper and lower case), hyphen, underscore, and common characters, up to 64 characters
    tags:
      # Enable prefix matching, you can fill in multiple prefixes, if not filled, it will listen to all tags by default
      prefix:
        - v1
      # Enable exact matching, you can fill in multiple tags, please fill in the complete tag name
      precise:
        - v1.1.1
# Enable regular expression matching, you can enter multiple regular expressions, please fill in the regular expression
      include:
        - ^v1.*
      # Enable precise exclusion, you can fill in multiple tags, please fill in the complete tag name
      exclude:
        - v3
    # Enable commit comment monitoring, support Chinese, numbers, letters (including uppercase and lowercase), hyphens, underscores, and general characters, maximum of 256 characters
    commitMessages:
# Enable regular expression matching, you can enter multiple regular expressions, please fill in the regular expression
      include:
        - '.*Deploy Test'
```

### Триггер запроса на слияние

- События запроса на слияние инициируются действиями по инициированию запроса на слияние и действиям по обновлению запроса на слияние на странице. Таким образом, пока в конвейере настроен триггер события отправки, обе эти операции автоматически запускают выполнение конвейера.
– В событии отправки укажите следующие три правила сопоставления. Три правила сопоставления пересекаются, а это означает, что конвейер может быть запущен только тогда, когда все правила удовлетворены.
- Сопоставление ветвей: существует четыре правила сопоставления:
- Сопоставление префиксов: если указано `dev`, оно будет соответствовать всем веткам, начинающимся с `dev`; если оставить пустым, оно соответствует всем веткам.
- Точное соответствие: если вы заполните `dev`, оно будет соответствовать только ветке `dev`.
- Сопоставление регулярных выражений. Например, если вы заполните «dev.*», оно будет соответствовать всем ветвям с префиксом «dev».
- Точное исключение: если заполнено «dev», отправка кода в ветку «dev» не приведет к запуску конвейера. Точные правила исключения имеют наивысший приоритет и обычно используются в сочетании с другими правилами.
– Соответствие ключевых слов при отправке комментария: поддерживается только обычное соответствие, которое соответствует заголовку при отправке запроса на запрос, как показано на рисунке ниже.
- Соответствие регулярному выражению: если заполнено `.*build.*`, это означает, что любое сообщение фиксации, содержащее ключевое слово `build`, может запустить конвейер.
![Cопоставление заголовков запросов на слияние](https://images.gitee.ru/uploads/images/2021/1117/134808_d8a4ebdd_5192864.png )

  - Сопоставление комментариев: поддерживает только сопоставление регулярных выражений. После сопоставления запроса на слияние, инициированного здесь, прокомментируйте запрос на слияние, как показано на рисунке ниже.
  - Соответствие регулярному выражению: если заполнено `*build.*`, любое сообщение коммита, содержащее ключевое слово `build`, может запустить конвейер.
![Сопоставление комментариев запроса на слияние](https://images.gitee.ru/uploads/images/2021/1117/134851_00dc225d_5192864.png )

**Важно: объяснение логики формирования тригеров запроса на слияние!!!**
При запуске запроса на слияние существует две основные ветки: исходная и целевая. Следующий контент иллюстрирует все сценарии на примере запуска запроса на слияние из ветки dev в главную ветку. В этом случае dev — это исходная ветка, а master — целевая ветка.

- **Создать запрос на слияние**: инициируйте запрос на слияние от разработчика к мастеру. На основе последней фиксации в ветке разработки запускается конвейер. Во время процесса извлечения кода в задаче сборки конвейера выполняется автоматическое предварительное слияние, что означает, что построенный код включает в себя добавочный код как из основной ветки, так и из ветки разработки.
Если после создания запроса на слияние есть обновления кода в главном файле, это не приведет к изменениям в этом запросе на слияние.
- После создания запроса на слияние отправьте патч разработчику, что запустит обновление запроса на слияние. Логика в этот момент та же, что и при создании запроса на слияние. Тем не менее прочитайте yml под последним коммитом в ветке разработки и сгенерируйте конвейер.
- **После создания запроса на слияние** комментарий к запросу на слияние приведет к его обновлению. Логика на этом этапе та же, что и при создании запроса на слияние. Он по-прежнему берет файл yml последнего коммита в исходной ветке «dev» и генерирует конвейер.
- **После объединения запроса на слияние** будет сгенерировано сообщение об отпаравке, которое не приведет к каким-либо изменениям в этом запросе на слияние.

 **Пример использования**:
**[Рекомендуется]** Вы можете посмотреть на скриншоте:
![Редактирование запроса на слияние](https://images.gitee.ru/uploads/images/2021/1117/135019_2a378fbf_5192864.png )

 **Вы можете посмотреть в Yml:**

```yaml
# Indicates enabling automatic triggering of pipelines
triggers:
Enable pull request event monitoring, can match branches, commit comments (PR Title), comments
  pr:
Enable branch matching, supports alphanumeric characters (including upper and lower case), hyphens, underscores, and common characters, with a maximum of 64 characters.
    branches: 
# Enable prefix matching, you can fill in multiple prefixes, if not filled, it will listen to all branches by default
      prefix:
        - release
# Enable precise matching, you can fill in multiple branches, please fill in the complete branch name
      precise:
        - master
# Enable regular expression matching, you can enter multiple regular expressions, please fill in the regular expression
      include:
        - master
        - dev*
# Enable precise exclusion, you can fill in multiple branches, please fill in the complete branch name
      exclude:
        - release
    # Enable commit comment monitoring, support Chinese, numbers, letters (including uppercase and lowercase), hyphens, underscores, and general characters, maximum of 256 characters
    commitMessages:
# Enable regular expression matching, you can enter multiple regular expressions, please fill in the regular expression
      include:
        - '.*Deploy Test'
# Enable PR comment monitoring, supports Chinese, numbers, letters (including uppercase and lowercase), hyphens, underscores, and common characters, maximum
    comments:
# Enable regular expression matching, you can enter multiple regular expressions, please fill in the regular expression
      include:
        - '.*Deploy Test'
```

Запускается по расписанию

Заполните выражение cron в соответствии со стандартным форматом, используя значения по умолчанию для второго уровня.
Основные правила

```yaml
The format of the cron file is: M H D m d y
M: Minutes (0-59)
H: Hour (0-23)
D: Day (1-31)
m: Month (1-12)
d: Days of the week within a week (1~7) Note: Based on foreign time, Sunday is 1
y: year, optional

In addition to numbers, there are several special symbols '*', '/', '-' and ','
*: Represents any value within the range of numbers
/: represents every
*/5: Indicates every 5 units
-: Represents from a certain number to a certain number,
Separate several discrete numbers with ,

0 */2 * * ?   Every two hours
From 11 PM to 7 AM every two hours, and at 8 AM
Trigger at 10:15 AM on Sundays to Thursdays
0 12 ? * 4 represents every Wednesday at 12:00 noon

Note: The week and day cannot be used together with *, otherwise conflicts may occur. Also, make sure to use the English input method.
```

 **Пример использования**:
**[Рекомендуется]** Вы можете посмотреть на скриншоте:
![Запланированный триггер](https://images.gitee.ru/uploads/images/2021/1117/135149_495ccbeb_5192864.png )

 **Вы можете посмотреть в Yml:**

```yaml
# Indicates enabling automatic triggering of pipelines
triggers:
  schedule:
      # Currently only one cron expression is supported, multiple expressions are not yet available
    - cron: '0 */2 * * ?'
```