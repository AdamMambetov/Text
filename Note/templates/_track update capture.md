<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Music/Tracks"')
	.sort(p => p.created, "asc")
let current = dv.page(tp.file.path(true))
let creator = dv.page(current.Creators[0])
let trackName = current.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
let creatorName = creator.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
let num = arr.indexOf(current) + 1
let title = `${trackName} - ${creatorName} (🎧️ ${num})`
new Notice(title, 5000)
await tp.file.rename(title)
-%>