<%*
dv = app.plugins.plugins.dataview.api

let current = dv.page(tp.file.path(true))
let genreName = current.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
new Notice(genreName, 5000)
await tp.file.rename(genreName)
-%>