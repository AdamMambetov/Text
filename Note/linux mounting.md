---
created: 2024-06-25T12:25:50+03:00
modified: 2025-04-11T22:34:37+03:00
aliases:
  - подключение дисков в линукс
tags:
  - 📥
issue:
  - "[[linux mounting]]"
meta:
  - "[[Linux]]"
---

# linux mounting

![](https://www.youtube.com/watch?v=eVZBvRkLqaE)

Показать все доступные диски.
```bash
sudo fdisk -l
```

Подключить диск.
```bash
udisksctl mount -b /dev/sdb1
```

Отключить диск.
```bash
udisksctl  unmount -b /dev/sdb1
```
