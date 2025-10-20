<%*
dv = app.plugins.plugins.dataview.api

const files = dv.pages('"content"')
new Notice(files.length, 10000)
return
await tp.app.fileManager.renameFile(
	files[0].file,
	`content/__${files[0].file.name}`
)
new Notice(files[0].file.name, 10000)
return

//title = title.substring(2, title.length).split(" (")[0]

// if (files[0].file.name.includes("🇷🇺"))

//title = `${title} (${flag}${icon} ${num})`



//const files = tp.app.vault.getMarkdownFiles().filter(f => !f.path.includes("/"))

for (let i = 0; i < files.length; i++) {
	tp.app.fileManager.renameFile(
		files[i],
		`content/${files[i].name}`
	)
}
%>