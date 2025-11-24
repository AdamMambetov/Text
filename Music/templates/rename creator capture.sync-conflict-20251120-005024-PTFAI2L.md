<%*
dv = app.plugins.plugins.dataview.api

const type = "creator"
const path = '"Creators"'

const files = dv.pages(path).sort(f => f.created, "asc")

for (let i = 0; i < files.length; i++) {
	let file = files[i].file
	let title = file.name
	
	let lastIndex = title.indexOf(" (👩🏼‍🎤")
	title = `Creators/@${title.substring(0, lastIndex)}.md`
	new Notice(title, 5000)
	await tp.app.fileManager.renameFile(file, title)
	continue
	
	title = title.substring(1, title.length)
	
	let icon
	switch (type) {
		case "creator":
			icon = "🎙️"
			break
		case "track":
			icon = "🎧️"
		case "album":
			icon = "📀"
			break
		case "playlist":
			icon = "💿"
			break
	}
	
	title = `${title} (${icon} ${i+1})`
	await tp.app.fileManager.renameFile(file, title)
	//new Notice(title, 5000)
}
new Notice("Finish", 10000)
%>


```dataview
TABLE WITHOUT ID key AS "unresolved link", rows.file.link AS "referencing file"
FROM "Text/Music"
FLATTEN file.outlinks as outlinks
WHERE !(outlinks.file) AND !(contains(meta(outlinks).path, "/"))
GROUP BY outlinks
LIMIT 10
```