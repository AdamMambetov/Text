<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Music/Creators"')
	.sort(p => p.created, "asc")
let bExit = false
arr.forEach(async (p, i) => {
	if (bExit) return
	let file = tp.file.find_tfile(p.file.path)
	try {
		let creatorName = p.aliases[0]
			.replaceAll("?", "")
			.replaceAll("#", "")
			.replaceAll(" / ", " - ")
			.replaceAll("/", " ")
			.replaceAll("\\", "")
			.replaceAll("[", "(")
			.replaceAll("]", ")")
		let num = i + 1
		let title = `${creatorName} (🎙️ ${num}).md`
		
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