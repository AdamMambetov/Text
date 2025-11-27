<%*
dv = app.plugins.plugins.dataview.api

const types = {
	creator: {
		icon: "🎙️",
		relativePath: "Creators",
		oldPrefix: "@"
	},
	track: {
		icon: "🎧️",
		relativePath: "Tracks",
		oldPrefix: "🎵"
	},
	album: {
		icon: "📀",
		relativePath: "Albums",
		oldPrefix: "📼"
	},
	playlist: {
		icon: "💿",
		relativePath: "Playlists",
	},
}

for (var type in types) {
	if (type.oldPrefix == null)
		continue
	
	const files = dv.pages(`'"${path}"'`).sort(f => f.created, "asc")
	
	for (let i = 0; i < files.length; i++) {
		let file = files[i].file
		let title
		if (files[i].aliases == null) {
			console.log(files[i])
			title = file.name.replace(file.name.split(" - ")[1] + " - ", "")
		} else {
			title = files[i].aliases[0]
		}
		
		title = `Text/Music/${type.relativePath}/${title} (${type.icon} ${i+1}).md`
		console.log(title)
		return
		await tp.app.fileManager.renameFile(file, title)
	}
}
new Notice("Finish", 10000)
%>


```dataview
TABLE
FROM "Text/Music/Tracks"
WHERE !file.aliases
```

```-dataview
TABLE WITHOUT ID key AS "unresolved link", rows.file.link AS "referencing file"
FROM "Text/Music"
FLATTEN file.outlinks as outlinks
WHERE !(outlinks.file) AND !(contains(meta(outlinks).path, "/"))
GROUP BY outlinks
```