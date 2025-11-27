<%*
dv = app.plugins.plugins.dataview.api

const rootPath = "Text/Music"
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

for (var key in types) {
	let type = types[key]
	if (!type.hasOwnProperty("oldPrefix"))
		continue
	
	const files = dv.pages(`"${rootPath}/${type.relativePath}"`).sort(f => f.created, "asc")
	
	for (var i = 0; i < files.length; i++) {
		let f = files[i].file
		let title
		if (files[i].aliases.length == 0) {
			if (type.relativePath === "Tracks")
				title = f.name.replace(f.name.split(" - ")[0] + " - ", "")
			else
				title = f.name.replace(type.oldPrefix, "")
		} else {
			title = files[i].aliases[0]
		}
		
		title = `${rootPath}/${type.relativePath}/${title} (${type.icon} ${i+1}).md`
		console.log(title)
		await tp.app.fileManager.renameFile(f, title)
	}
}
new Notice("Finish", 10000)
%>

```dataview
TABLE
FROM "Text/Music/Tracks"
WHERE !file.name.includes("(")
```

```-dataview
TABLE WITHOUT ID key AS "unresolved link", rows.file.link AS "referencing file"
FROM "Text/Music"
FLATTEN file.outlinks as outlinks
WHERE !(outlinks.file) AND !(contains(meta(outlinks).path, "/"))
GROUP BY outlinks
```
