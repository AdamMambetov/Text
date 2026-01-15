<%*
dv = app.plugins.plugins.dataview.api
let n = dv.pages('"Text/Music/Tracks"')
	.sort(p => p.created, "asc")
	[0].file.name

new Notice(n, 5000)
return

let current = dv.page(tp.file.path(true))
let creator = dv.page(current.Creators[0])
let a = current.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
let b = creator.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
let num = dv.pages('"Text/Music/Tracks"')[0].file.name
	//.sort((p1, p2) => p1.created > p2.created)
	//.findIndex(p => p.file.name === current.file.name) + 1
let c = num
let title = `${a} - ${b} (🎧️ ${num})`
new Notice(title, 5000)
-%>