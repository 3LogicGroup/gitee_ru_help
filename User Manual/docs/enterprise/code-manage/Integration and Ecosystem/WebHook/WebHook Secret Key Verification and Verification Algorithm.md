---
title: Верификация ключа вебхука и алгоритм верификации
---

## Знакомство с подписями вебхуков

Вебхук Gitee поддерживает безопасную верификацию с помощью ключа.

Настроив непубличный ключ вебхука, пользователи могут подписывать содержимое запроса при отправке запросов. После получения запроса сервер проверяет подпись, используя тот же ключ, чтобы подтвердить целостность и достоверность полученного запроса.

> По сравнению с аутентификацией по паролю, проверка подписи позволяет эффективно избежать проблем безопасности, вызванных утечкой паролей вебхука во время передачи по сети.

Алгоритм генерации подписей вебхуков (ссылка)

Если вебхук использует метод подписи, цель запроса будет включать заголовок запроса с именем 'X-Gitee-Token' с сгенерированным содержимым подписи в качестве его значения. Алгоритм подписи следующий:

Описание параметра подписи

| Параметр  | Описание |
| --------- | --------------------------------------------------------------- |
Текущая временная метка в миллисекундах. Разница во времени между временной меткой и временем вызова запроса не должна превышать 1 часа. Временная метка должна быть отправлена вместе с секретным ключом.
| Секретный ключ | Ключ подписи - строка SEC, начинающаяся с SEC и отображающаяся под разделом подписи на странице настроек безопасности робота.

- Шаг 1: Используйте алгоритм HmacSHA256 для вычисления подписи, обработав временную метку + "
" + секретный ключ в качестве строки подписи.
- Шаг 2: Закодируйте полученные результаты в Base64.
Шаг 3: закодируйте полученные результаты с помощью urlEncode, чтобы получить окончательную подпись (с использованием набора символов UTF-8).

Шаг 2. Соедините временную метку и значение подписи, полученное на шаге 1, с URL-адресом.

## Пример кода вычисления подписи

Пример кода вычисления подписи (Java)

```java
Long timestamp = System.currentTimeMillis();
String stringToSign = timestamp + "
" + secret;
Mac mac = Mac.getInstance("HmacSHA256");
mac.init(new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256"));
byte[] signData = mac.doFinal(stringToSign.getBytes("UTF-8"));
return URLEncoder.encode(new String(Base64.encodeBase64(signData)),"UTF-8");
```

Пример кода вычисления подписи (Python)

```python
#python 2.7
import time
import hmac
import hashlib
import base64
import urllib

timestamp = long(round(time.time() * 1000))
secret = 'this is secret'
secret_enc = bytes(secret).encode('utf-8')
string_to_sign = '{}
{}'.format(timestamp, secret)
string_to_sign_enc = bytes(string_to_sign).encode('utf-8')
hmac_code = hmac.new(secret_enc, string_to_sign_enc, digestmod=hashlib.sha256).digest()
sign = urllib.quote_plus(base64.b64encode(hmac_code))
print(timestamp)
print(sign)
```