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


for (var key in types) {
	let type = types[key]
	const files = dv.pages(`"${rootPath}/${type.relativePath}"`).sort(f => f.created, "asc")
	
	for (var i = 0; i < files.length; i++) {
		let f = files[i].file
		let title
		if (type.relativePath === "Tracks") {
			if (files[i].aliases.length == 0)
				title = f.name.replace(f.name.split(" - ")[0] + " - ", "")
			else
				title = files[i].aliases[0]
			
			if (files[i].hasOwnProperty("Creators"))
				if (files[i].Creators.length != 0) {
					let creator = files[i].Creators[0]
					if (typeof(creator) === "string") {
						title += ` - ${creator.replace(/^@/, "")}`
					} else if (creator.path != null) {
						let regex = /(Text\/Music\/Creators\/)(.*)( \(🎙️ )/g
						console.log(creator)
						let creatorName
						let regexRes = regex.exec(creator.path)
						if (regexRes == null)
							creatorName = creator.path.replace(/^@/, "")
						else
							creatorName = regexRes[2].replace(/^@/, "")
						title += ` - ${creatorName}`
					}
				}
		} else if (files[i].aliases.length == 0) {
			if (type.hasOwnProperty("oldPrefix"))
				title = f.name.replace(type.oldPrefix, "")
			else
				title = f.name
		} else {
			title = files[i].aliases[0]
		}
		title = title
			.replaceAll("null ")
			.split(` - (${type.icon} `)[0]
			.split(` (${type.icon} `)[0]
			.replaceAll(/[\[\]:/#]/g, "")
		title = `${type.relativePath}/${title} (${type.icon} ${i+1}).md`
		if (title === `${f.folder}/${f.name}.md`)
			continue
		// console.log(files[i])
		console.log(title)
		await tp.app.fileManager.renameFile(f, title)
	}
}
new Notice("Finish", 10000)
%>

```-dataview
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