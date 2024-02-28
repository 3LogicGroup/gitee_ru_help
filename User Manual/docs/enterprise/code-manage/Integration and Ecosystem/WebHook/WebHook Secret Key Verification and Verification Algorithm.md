---
title: WebHook Key Verification and Verification Algorithm
---

## WebHook Signature Introduction

Gitee WebHook supports secure validation through a key.

By configuring a non-public WebHook key, users can sign the request content when making requests. After receiving the request, the server verifies the signature using the same key to confirm the integrity and trustworthiness of the received request. The entire process

> Compared with password authentication, signature verification can effectively avoid the security issues caused by the leakage of WebHook passwords during network transmission.

WebHook Signature Generation Algorithm (Reference)

If WebHook is using the signature method, the request target will include a request header named 'X-Gitee-Token' with the generated signature content as its value. The signature algorithm is as follows:

Signature parameter description

| Parameter | Description |
| --------- | --------------------------------------------------------------- |
The current timestamp, in milliseconds. The time difference between the timestamp and the request call time should not exceed 1 hour. The timestamp should be sent together with the secret key.
| secret    | Signature key, the SEC string starting with SEC displayed below the signing section on the robot security settings page

- Step 1: Use the HmacSHA256 algorithm to calculate the signature by treating timestamp + "
" + secret key as the signing string.
- Step 2: Base64 encode the results obtained above.
Step 3: Encode the results obtained above using urlEncode to get the final signature (using UTF-8 character set).

Step 2, concatenate the timestamp and the signature value obtained in step 1 to the URL.

## Signature Calculation Example Code

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

Signature Calculation Code Example (Python)

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