---
created: 2024-06-13T19:43:38+03:00
modified: 2025-03-29T20:33:27+03:00
---

```dataview
TABLE modified AS "Последние изменения"
FROM ("" AND !"Text/Note/templates")
WHERE modified > (date(now) - dur(1 month))
SORT modified DESC
```

%% Старая версия
```dataview
TABLE file.mtime AS "Последние изменения"
FROM ""
WHERE file.mtime > (date(now) - dur(1 month))
SORT file.mtime DESC
```
 %%