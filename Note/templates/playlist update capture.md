<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Music/Playlists"')
	.sort(p => p.created, "asc")
let current = dv.page(tp.file.path(true))
let playlistName = current.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
let num = arr.indexOf(current) + 1
let title = `${playlistName} (💿 ${num})`
new Notice(title, 5000)
await tp.file.rename(title)
-%>