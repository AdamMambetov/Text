<%*
const files = tp.app.vault.getMarkdownFiles()
for (let i = 0; i < files.length; i++) {
	let file = files[i]
	await tp.app.fileManager.processFrontMatter(file, (fm) => {
		let name = fm["name"]
		if (name == null) return
		fm["Name"] = name
		delete fm["name"]
	})
	if (exit) break
}
%>