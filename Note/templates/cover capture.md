<%*
let art = tp.app.vault.getFolderByPath("Text/Art")
if (art == null) {
	new Notice("fail", 5000)
	return
}

const key = "Cover"
for (let i = 0; i < art.children.length; i++) {
	if (art.children[i] instanceof tp.obsidian.TFolder)
		continue;
	await tp.app.fileManager.processFrontMatter(art.children[i], frontmatter => {
		if (frontmatter[key] == null)
			return
		if (!frontmatter[key].includes("!"))
			return
		frontmatter[key] = frontmatter[key].replaceAll("!", "")
		new Notice(art.children[i].basename, 5000)
	})
}
new Notice("success", 5000)
%>