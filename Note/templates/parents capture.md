<%*
return
let files = tp.app.vault.getMarkdownFiles()
for (let i = 0; i < files.length; i++) {
	await tp.app.fileManager.processFrontMatter(files[i], frontmatter => {
		let key = "Parents"
		let member = "[[_database]]"
		if (frontmatter[key] == null)
			return
		if (!frontmatter[key].includes(member))
			return
		if (frontmatter[key].length == 1) {
			delete frontmatter[key]
			new Notice(files[i].basename, 5000)
			return
		}
		frontmatter[key] = frontmatter[key].filter((el) => el !== member)
		new Notice(files[i].basename, 5000)
	})
}
%>