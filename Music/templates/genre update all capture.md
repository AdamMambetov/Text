<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Genres"')
let bExit = false
arr.forEach(async (p, i) => {
	if (bExit) return
	//new Notice(p.file.name, 15000)
	let file = tp.file.find_tfile(p.file.path)
	try {
		let genreName = p.aliases[0]
			.replaceAll("?", "")
			.replaceAll("#", "")
			.replaceAll("/", "")
			.replaceAll("\\", "")
		let title = `${genreName}.md`
		
		if (file.name === title)
			return
		title = file.path.replace(
			file.name,
			title,
		)
		await tp.app.fileManager.renameFile(
			file,
			title,
		)
	} catch(e) {
		tp.app.workspace
			.getLeaf()
			.openFile(file)
		bExit = true
	}
})
new Notice("Finish", 50000)
-%>