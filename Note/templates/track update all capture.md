<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Text/Music/Tracks"')
	.sort(p => p.created, "asc")
arr.forEach(p => {
	new Notice(p.file.name, 15000)
	let file = tp.file.find_tfile(p.file.path)
	let creator = dv.page(p.Creators[0])
	let trackName = p.aliases[0]
		.replaceAll("?", "")
		.replaceAll("#", "")
		.replaceAll("/", "")
		.replaceAll("\\", "")
	let creatorName = creator.aliases[0]
		.replaceAll("?", "")
		.replaceAll("#", "")
		.replaceAll("/", "")
		.replaceAll("\\", "")
	let num = arr.indexOf(p) + 1
	let title = `${trackName} - ${creatorName} (🎧️ ${num}).md`
	tp.app.fileManager.renameFile(file, file.path.replace(file.name, title))
})
new Notice("Finish", 50000)
-%>