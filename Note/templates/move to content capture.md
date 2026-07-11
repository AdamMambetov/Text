<%*
dv = app.plugins.plugins.dataview.api
const pages = dv.pages('""').filter(p => !p.file.path.includes("/"))
for (let i = 0; i < pages.length; i++) {
	let p = pages[i]
	let path = `content/${p.file.name}.md`
	await # move to content capture
tp.app.fileManager.renameFile(p.file, path)
	//new Notice(path, 5000)
}
-%>