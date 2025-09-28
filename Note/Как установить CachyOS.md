---
created: 2025-08-04T01:48:58+03:00
modified: 2025-08-04T01:48:58+03:00
meta:
  - "[[Linux]]"
---

# Как установить CachyOS

 1. Скачать образ
 2. Установить на флешку с помощью ventoy
 3. Если возникает ошибка при запуске с флешки, выключить Secure Boot в биосе


## Как поставить emoji toolbar

 1. Включить _flatpak_
```bash
sudo pacman -S flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

 2. Установить _emote_
```bash
flatpak install flathub com.tomjwatson.Emote
```

 3. Добавить горячую клавишу в _hyperland.conf_
```bash
bindd = $mainMod SHIFT, E, Emoji picker, exec, flatpak run com.tomjwatson.Emote
```

Теперь при нажатии `Super + Shift + E` будет открываться Emoji Toolbar. При выборе эмодзи он добавится в буфер обмена и затем его можно будет вставить на `Ctrl + V`.
Мне помог [видос](https://www.youtube.com/watch?v=cX0tO1zcCxg) на ютубе.