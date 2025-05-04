---
created: 2024-06-13T19:43:38+03:00
modified: 2025-05-04T14:30:10+03:00
banner: "![[banner.jpg]]"
banner_lock: true
banner_y: 0.5
cssclasses:
  - dashboard
  - hide-metadata
---

# Главное
 - [[_database]]
 - [[инструкция]]
 - [[цели в жизни]]
 - [[excalibrain]]
# Работа
 - [[RealRed Задачи]]
 - [[Music Player Maui]]
 - [[Baffle]]
# Статистика базы знаний
- [Последние изменения](changed): `$=dv.pages('').where(f => f.modified > (now() - dv.duration("1 month"))).length`
 `$=dv.list(dv.pages('').where(f => f.modified > (now() - dv.duration("1 month"))).sort(f => f.modified.ts, "desc").limit(20).file.link)`
- [Недавно созданные](created): `$=dv.pages('').where(f => f.created > (now() - dv.duration("1 month"))).length`
  `$=dv.list(dv.pages('').where(f => f.created > (now() - dv.duration("1 month"))).sort(f => f.created.ts, "desc").limit(20).file.link)`
