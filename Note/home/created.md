# created

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