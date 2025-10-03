---
created: 2025-01-30T15:31:52+03:00
modified: 2025-04-11T22:07:31+03:00
category:
  - "[[Программирование]]"
creator:
  - "[[@Адам Мамбетов|Я]]"
issue:
  - "[[Генерация keystore]]"
---

# Генерация keystore

 1. Открыть терминал от имени администратора
 2. Перейти к Java папке `C:\Program Files\Java\jdk-17\bin`
 3. Выполнить данную команду

```bash
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "C=US, O=Android, CN=Android Debug"
```
