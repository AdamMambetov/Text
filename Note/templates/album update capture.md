<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Music/Albums"')
	.sort(p => p.created, "asc")
let current = dv.page(tp.file.path(true))
let albumName = current.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
let num = arr.indexOf(current) + 1
let title = `${albumName} (📀 ${num})`
new Notice(title, 5000)
await tp.file.rename(title)
-%>