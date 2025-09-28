<%*
const files = tp.app.vault.getFolderByPath("Text/Art").children.filter(f => f instanceof tp.obsidian.TFile)
for (let i = 0; i < files.length; i++) {
	let content = await tp.app.vault.read(files[i])
	if (!content.includes("300"))
		continue
	console.log(files[i].basename)
	return
	await tp.app.vault.modify(files[i], content.replace("| 300", ""))
}
%>