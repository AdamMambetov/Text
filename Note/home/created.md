---
created: 2024-06-13T19:43:38+03:00
modified: 2025-01-15T14:34:35+03:00
---

```dataview
TABLE created AS "Новые заметки за месяц"
FROM ("" AND !"Text/Note/templates")
WHERE created > (date(now) - dur(1 month))
SORT created DESC
```


%% Старая версия
```dataview
TABLE file.ctime AS "Новые заметки за месяц"
FROM ("" AND !"templates")
WHERE file.ctime > (date(now) - dur(1 month))
SORT file.ctime DESC
```
%%