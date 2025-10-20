<%*
dv = app.plugins.plugins.dataview.api


const files = dv.pages('"content"').sort(f => f.created, "asc")

for (let i = 0; i < files.length; i++) {

	let title = files[i].file.name
	let num = files.findIndex(f => f.file.name === title)
	if (num == -1) continue
	num++
	title = title.substring(0, title.lastIndexOf(" "))
	title = `content/${title} ${num})`
	tp.app.fileManager.renameFile(
		files[i],
		title
	)
}


// new Notice(title, 5000)
%>