<%*
const files = tp.app.vault.getMarkdownFiles().filter(f => !f.path.includes("/"))

for (let i = 0; i < files.length; i++) {
	tp.app.fileManager.renameFile(
		files[i],
		`content/${files[i].name}`
	)
}
%>