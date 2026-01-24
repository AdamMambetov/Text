<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Text/Music/Tracks"')
	.sort(p => p.created, "asc")
arr.forEach(p => {
	//new Notice(p.file.name, 15000)
	let file = tp.file.find_tfile(p.file.path)
	try {
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
		
		if (file.name === title)
			return
		title = file.path.replace(
			file.name,
			title,
		)
		tp.app.fileManager.renameFile(
			file,
			title,
		)
	} catch(e) {
		tp.app.workspace
			.getLeaf()
			.openFile(file)
		throw new Error(e.message)
	}
})
new Notice("Finish", 50000)
-%>