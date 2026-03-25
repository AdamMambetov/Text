<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Text/Music/Creators"')
	.sort(p => p.created, "asc")
let p = dv.page(tp.file.path(true))
let title = p.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
let num = arr.indexOf(p) + 1
title = `${title} (🎙️ ${num})`
new Notice(title, 5000)
await tp.file.rename(title)
-%>

```dataviewjs
let arr = dv.pages('"Text/Music/Creators"')
	.sort(p => p.created, "desc")
//dv.list(arr.limit(150-13).created)
//dv.list(arr.limit(150-13).file.link)
```

```base
views:
  - type: table
    name: Table
    filters:
      and:
        - file.inFolder("Text/Music/Creators")
    sort:
      - property: created
        direction: ASC
```