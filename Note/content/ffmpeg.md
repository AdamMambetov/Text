---
created: 2026-07-16T00:45:00+03:00
---

# ffmpeg

## Как извлечь обложку

```bash
ffmpeg -i input.mp3 -an -vcodec copy cover.jpg
```

Если команда выше выдаст ошибку (иногда бывает из-за формата встроенного изображения), используйте этот универсальный вариант:

```bash
ffmpeg -i input.mp3 -an -vcodec mjpeg cover.jpg
```
