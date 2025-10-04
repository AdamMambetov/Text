# created

```base
views:
  - type: table
    name: Table
    filters:
      and:
        - file.inFolder("Text")
        - file.ext == "md"
        - '!file.path.contains("templates")'
        - file.hasProperty("created")
    sort:
      - property: created
        direction: DESC
```


%% Версия 1
```dataview
TABLE file.ctime AS "Новые заметки за месяц"
FROM ("" AND !"templates")
WHERE file.ctime > (date(now) - dur(1 month))
SORT file.ctime DESC
```
%%

%% Версия 2
```dataview
TABLE created AS "Новые заметки за месяц"
FROM ("" AND !"Text/Note/templates")
WHERE created > (date(now) - dur(1 month))
SORT created ASC
```
 %%