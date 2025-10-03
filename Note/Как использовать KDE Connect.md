---
created: 2025-09-27T16:39:35+03:00
modified: 2025-09-27T16:39:35+03:00
---

# Как использовать KDE Connect

## CachyOS

Установка пакета:
```bash
sudo pacman -Sy kdeconnect
```

Настройка фаерволла ufw

```bash
sudo ufw allow 1714:1764/udp
sudo ufw allow 1714:1764/tcp
sudo ufw reload
```
