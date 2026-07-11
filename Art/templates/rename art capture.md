<%*
dv = app.plugins.plugins.dataview.api

const files = dv.pages('"content"')
for (let i = 0; i < files; i++) {
	let info = files[i].file.name.split("(")[1].split(")")[0]
	//new Notice(info, 10000)
	let title
	if (files[i].aliases.length == 1) {
		title = 
		tp.app.fileManager.renameFile(
		files[i].file,
		`content/${title} (${info}).md`
	)
	}
}
return

// if (files[0].file.name.includes("🇷🇺"))
%>