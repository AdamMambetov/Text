---
created: 2024-06-24T15:00:48+03:00
aliases:
  - горячие клавиши линукс
meta:
  - "[[Linux]]"
---

# linux hotkeys

 > [!note]- bspwm and sxhkd config files
 > ```
 > ~/.config/sxhkd/sxhkdrc
 > ```
 > ```
 > ~/.config/bspwm/bspwmrc
 > ```

## bspwm

> [!note]- Запуск bspwm
> В терминале
> ```
> startx
> ```

 - Ctrl + Shift + {q,r}
	 - Закрыть bspwm
	 - Перезапустить bspwm
 - Super + c
	 - Закрыть окно
 - Super + Space
	 - Переключить окно между оконным и плавающим режимом
 - Super + {h,j,k,l}
	 - Перейти на окно слева, снизу, сверху, справа
 - Super + Alt + {h,j,k,l}
	 - Переместить окно влево, вниз, вверх, вправо

## sxhkd

 - Super + {1-0}
	 - Переключение рабочих столов
 - Super + Tab
	 - Переключение фокуса на другой монитор
 - Super + Enter
	 - Открыть терминал
 - Super + {d, x}
	 - Меню с приложениями (Rofi Menu)
	 - Power Menu
 - Super + p
	 - Показать/скрыть полибар (polybar)
 - Super + w
	 - Случайные обои
 - Super + Escape + r
	 - Перезагрузить sxhkd
 - Shift + Alt
	 - Поменять язык
 - Print
	 - Flameshot
