<%*
dv = app.plugins.plugins.dataview.api

const files = dv.pages('"Art/content"')
	.sort(f => f.created, "asc")

for (let i = 0; i < files.length; i++) {
	let file = files[i]
	let title = file.file.name
	new Notice(title, 5000)
	let name = file.aliases[0]
		.replaceAll("?", "")
		.replaceAll("#", "")
		.replaceAll(" / ", " - ")
		.replaceAll("/", "")
		.replaceAll("\\", "")
		.replaceAll("\"", "'")
		.replaceAll("[", "(")
		.replaceAll("]", ")")
		.replaceAll(":", ".")
		.replaceAll("*", "_")
		.replaceAll("<", "(")
		.replaceAll(">", ")")
	if (name[0] === ".")
		name = name.replace(".", "")
	title = title.substring(
	  title.lastIndexOf(" (") + 2,
	  title.lastIndexOf(" ")
    )
	title = `${name} (${title} ${i+1})`
	if (title === file.file.name)
		continue
	
	// new Notice(title, 50000)
	await tp.app.fileManager.renameFile(
		file.file,
		`Art/content/${title}.md`
	)
}
%>