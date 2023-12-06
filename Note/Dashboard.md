---
cssclasses:
  - dashboard
---


# Работа
- Офис
	- Текущие задачи
	- Встречи
- Командировки

# Хобби
- 1
	- a
	- b
- 2
	- a
	- b
# Статистика базы знаний
- Последние изменения: `$=dv.pages('').sort(f => f.file.mtime.ts, "desc").length`
 `$=dv.list(dv.pages('').sort(f => f.file.mtime.ts, "desc").limit(20).file.link)`
- Недавно созданные: `$=dv.pages('').where(f => f.file.ctime > (now() - dv.duration("1 month"))).length`
 `$=dv.list(dv.pages('').where(f => f.file.ctime > (now() - dv.duration("1 month"))).limit(20).file.link)`