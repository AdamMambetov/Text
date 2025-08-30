<%*
let files = tp.app.vault.getMarkdownFiles()
for (let i = 0; i < files.length; i++) {
	await tp.app.fileManager.processFrontMatter(files[i], frontmatter => {
		let key = "Cover"
		if (frontmatter[key] == null)
			return
		if (!frontmatter[key].includes("!"))
			return
		new Notice(files[i].basename, 5000)
		//frontmatter[key] = frontmatter[key].filter((el) => el !== member)
		new Notice(files[i].basename, 5000)
	})
}
%>