---
title: WebHook key verification and verification algorithm
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
---

## WebHook Signature Introduction

Gitee WebHook supports secure authentication through a key.

Users can configure a private WebHook secret key, sign the request content when making a request, and the server can verify the received request by signing it with the same secret key to confirm its completeness and trustworthiness. The entire process ensures that the WebHook secret key only exists on Gitee and the server, and is not exposed during network transmission.

> Compared to password verification, signature verification can effectively avoid security issues caused by the leakage of WebHook passwords during network transmission.

## WebHook Signature Generation Algorithm (Reference)

If the WebHook uses signature, the request header will include `X-Gitee-Token` with the generated signature as its value. The signature algorithm is as follows:

### Signature Parameter Description

| Parameter | Description |
| --------- | --------------------------------------------------------------- |
| timestamp | The current timestamp, in milliseconds, the difference between the request call time should not exceed 1 hour, it should be sent with the key when making the request
 |
| secret    | Signature key, the string starting with SEC displayed below the signing section on the robot security settings page |

- Step1: Use the timestamp + "
" + secret key as the signature string, and calculate the signature using the HmacSHA256 algorithm.
- Step 2: Base64 encode the results obtained above.
- Step 3: URL encode the obtained result (using UTF-8 character set) to obtain the final signature.

Step 2, concatenate the timestamp and the signature value obtained in step 1 to the URL.

## Signature Calculation Sample Code

Signature Calculation Code Example (Java)

```java
Long timestamp = System.currentTimeMillis();
String stringToSign = timestamp + "
" + secret;
Mac mac = Mac.getInstance("HmacSHA256");
mac.init(new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256"));
byte[] signData = mac.doFinal(stringToSign.getBytes("UTF-8"));
return URLEncoder.encode(new String(Base64.encodeBase64(signData)),"UTF-8");
```

Signature calculation code example (Python)

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