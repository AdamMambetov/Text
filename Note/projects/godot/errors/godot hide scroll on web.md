---
created: 2024-08-21T14:24:42+03:00
aliases:
  - godot hide scroll on web
  - Скрыть скролл на веб
category:
  - "[[Программирование]]"
Creators:
  - "[[@Адам Мамбетов|Я]]"
issue:
  - "[[godot hide scroll on web]]"
meta:
  - "[[Godot]]"
---

# Godot hide scroll on web

Для этого нужно в экспортированном проекте открыть `index.html` и вписать следующее:

![[Pasted image 20240821142805.png]]

```css
body {
	overflow: hidden;
}
```

Либо создать шаблон этого файла и указать его в:

Export -> HTML -> Custom HTML Shell = "path/to/index.html"

![[Pasted image 20240821143055.png]]

Пример такого шаблона есть в плагине [Instant Games Bridge](https://getbridge.org). [GitHub](https://github.com/instant-games-bridge)