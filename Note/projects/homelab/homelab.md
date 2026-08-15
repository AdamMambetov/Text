---
aliases:
  - homelab
  - домашний сервер
  - server
meta:
  - "[[Linux]]"
related:
  - "[YT Плейлист Сервер](https://youtube.com/playlist?list=PLYsCqW7RyEOVdQPyISnOP-rNydYY7Dhmk&si=M479Ub6lgmlbnFfr)"
---

# Homelab

Здесь вся информация про домашний сервер.

## Железо сервера

- [Мини-ПК ozon](https://www.ozon.ru/product/firebat-mini-pk-amd-ryzen-5-7430u-ram-16-gb-ssd-512-gb-amd-radeon-graphics-windows-chernyy-matovyy-3759686261/?is_apparel_size_selected=true&sh=MiXmrFlOtg)
	- AMD Ryzen 5 7430U
	- RAM 16 GB
	- SSD 512 GB
	- SSD 2 TB из ноутбука
	- Цена 23 764,74 рублей
- OS proxmox
	- https://192.168.1.234:8006
- Белый IP у [провайдера SmartHome](https://smarthome.spb.ru)
	- `213.108.39.127`
	- Цена 150 рублей в месяц

## Список программ

> [!done]- [gitea](https://about.gitea.com)
> Свой [github](https://github.com).
> Использовал [debian-12-turnkey-gitea_18.0-1](https://www.turnkeylinux.org/gitea) lxc контейнер.
> Доступ:
> - https://gitea.adammambetov.duckdns.org
> - http://192.168.1.108:3000/

> [!done]- [nginx proxy manager](https://nginxproxymanager.com)
> Reverse proxy для того, чтобы превратить `https://213.108.39.127:3000` в `https://gitea.adammambetov.duckdns.org`.
> Использовал `debian-13-standart_13.6-1` lxc контейнер. В качестве DNS сервера используется [Duck DNS](https://www.duckdns.org)
> Доступ:
> - http://213.108.39.127:81
> - http://192.168.1.101:81

> [!done]- [nextcloud](https://nextcloud.com)
> Облако, офис, конференции и т.д.
> Использовал `debian-13-standart_13.6-1` lxc контейнер. Установил [Nextcloud AIO](https://github.com/nextcloud/all-in-one).
> Доступ:
> - https://nextcloud-aio.adammambetov.duckdns.org
> - [Nextcloud AIO Control Panel](https://192.168.1.110:8080)

> [!done]- [syncthing](https://syncthing.net/)
> Синхронизация файлов между устройствами PeerToPeer
> Использовал [debian-12-turnkey-syncthing_18.0-1](https://www.turnkeylinux.org/syncthing) lxc контейнер. Синхронизирую медиа файлы, документы и пароли ([KeePassXC](https://keepassxc.org)).
> Server ID:
> ```
> F75PRUA-MLZ2Q6Y-UQJUJ3L-3LEU5TC-IA6M2GD-OKF75V2-G75OBKV-KR6DKQP
> ```
> Доступ:
> - https://192.168.1.190

> [!todo]- [Immich](https://immich.app/)
> Галерея фото и видео

> [!done]- [Paperless](https://docs.paperless-ngx.com/)
> Галерея для документов
> Использовал `debian-13-standart_13.6-1` lxc контейнер.
> Доступ:
> - https://paperless.adammambetov.duckdns.org
> - http://192.168.1.102:8000

> [!todo]- [BookStack](https://bookstackapp.com)
> Галерея для документов

> [!todo]- Онлайн книга рецептов
> Скорее всего будет встроено в obsidian, paperless или nextcloud

> [!done]- [JellyFin](https://jellyfin.org)
> Медиа сервер для просмотра фильмов, сериалов и т.д. Аналог Netflix.
> Использовал `debian-13-standart_13.6-1` lxc контейнер.
> Доступ:
> - https://jellyfin.adammambetov.duckdns.org
> - http://192.168.1.100:8096

> [!todo]- [Navidrome](https://www.navidrome.org)
> Стриминговый сервис для музыки. Аналог Spotify.

> [!todo]- Хранилище Steam библиотеки

> [!fail]- [teamspeak](https://teamspeak.com/en/downloads)
> Аналог Discord.
> Пробовал и 3 и 6 версию ставить, работает хуже чем Discord.

> [!todo]- [RustDesk](https://rustdesk.com)
> Удалённый доступ к любому ПК
> [GitHub](https://github.com/rustdesk/rustdesk)

> [!todo]- Торрент сервер

> [!todo]- Obsidian + CouchDB + gitea + syncthing
> Попробовать развернуть CouchDB для автоматических коммитов и синхронизации заметок в Obsidian
> [YT видос](https://youtu.be/CiSJBYFPwGM?si=c-UwDBHguw4RFIU-) 

> [!done]- [Vikunja](https://vikunja.io)
> Task manager - канбан доски, списки дел и т.д.
> [GitHub](https://github.com/go-vikunja/vikunja)
> Использовал `debian-13-standart_13.6-1` lxc контейнер.
> Доступ:
> - https://vikunja.adammambetov.duckdns.org
> - http://192.168.1.106:3456

> [!todo]- [Kiwix](https://kiwix.org)
> Позволяет скачивать сайты

> [!done]- [IT-Tools](https://it-tools.tech)
> Утилиты для АйТишников, например: преобразование docker run в docker compose.
> [GitHub](https://github.com/CorentinTh/it-tools)
> Использовал `debian-13-standart_13.6-1` lxc контейнер.
> Доступ:
> - https://it-tools.adammambetov.duckdns.org
> - http://192.168.1.111:8080
