---
created: 2024-06-13T19:43:38+03:00
banner: "![[banner.jpg]]"
banner_lock: true
banner_y: 0.5
cssclasses:
  - dashboard
  - hide-metadata
---

# TODO
- [[MariannE - Yooh (🎧️ 461)]]
- [[Антон Виноградов (🎙️ 84)]]
- [[Дочери Мнемозины (🇯🇵📺 287)]]
# Главное
 - [[Text/Note/home/_art base.base|_art base]]
 - [[инструкция]]
 - [[цели в жизни]]
 - [[excalibrain]]
# Статистика базы знаний
- [Недавно созданные](created): `$=dv.pages('').where(f => f.created > (now() - dv.duration("1 month"))).length`
  `$=dv.list(dv.pages('').where(f => f.created > (now() - dv.duration("1 month"))).sort(f => f.created.ts, "desc").limit(20).file.link)`
