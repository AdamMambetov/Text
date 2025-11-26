<%*
const files = await tp.app.vault.getAllLoadedFiles()
	.filter(f => f instanceof tp.obsidian.TFile)
	.filter(f => f.basename.includes(","))
	.filter(f => f.extension == "md")
new Notice(files.length, 5000)
new Notice(files[1].name, 5000)
for (let i = 0; i < files.length; i++) {
	break
	let f = files[i]
	new Notice(f.name, 5000)
	return
}
-%>