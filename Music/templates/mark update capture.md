<%*
dv = app.plugins.plugins.dataview.api

let current = dv.page(tp.file.path(true))
let markName = current.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
new Notice(markName, 5000)
await tp.file.rename(markName)
-%>