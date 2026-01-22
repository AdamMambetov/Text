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