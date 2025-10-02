---
created: 2025-08-04T01:48:58+03:00
meta:
  - "[[Linux]]"
---

# CachyOS

## Как установить CachyOS

 1. Скачать образ
 2. Установить на флешку с помощью [[ventoy]]
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


## Как добавить монтирование диска при загрузке

 1. Выяснить UUID диска и его файловую систему

```bash
lsblk -f
```
 - если файловая система - _ntfs_, тогда нужно установить пакет _ntfs-3g_ и в качестве файловой системы вписать _ntfs-3g_.
	```bash
	sudo pacman -Syu ntfs-3g
	```

 2. Создать папку, куда смонтируется диск
```bash
sudo mkdir /mnt/mydrive
```
 
 3. Добавить диск в _fstab_
```bash
sudo nano /etc/fstab
```
в самом конце добавить
```
UUID=YOUR_UUID_HERE  /mnt/mydrive  YOUR_FILESYSTEM_TYPE  defaults,nofail  0  2
```
