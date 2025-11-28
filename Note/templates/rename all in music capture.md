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

const ff2 = tp.app.vault.getFolderByPath("Text/Music/Tracks").children
const ff = dv.pages(`"${rootPath}/Tracks"`).values
for (let i in ff) {
	let f = ff[i]
	if (f.Creators == null)
		continue
	for (let j in f.Creators) {
		let creator = f.Creators[j]
		if (creator.path == null)
			continue
		if (creator.path.startsWith("@")) {
			// console.log(creator)
			f2 = ff2.filter(f2 => f2.basename === f.file.name)[0]
			// console.log(f2)
			await tp.app.fileManager.processFrontMatter(f2, async (fm) => {
				// console.log(fm)
				for (let k in fm.Creators) {
					let cr = fm.Creators[k]
					fm.Creators[k] = cr.replace("@", "")
				}
				console.log(fm)
			})
			break
		}
	}
}
return

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
		title = `${rootPath}/${type.relativePath}/${title} (${type.icon} ${i+1}).md`
		if (title === `${f.folder}/${f.name}.md`)
			continue
		// console.log(files[i])
		console.log(title)
		await tp.app.fileManager.renameFile(f, title)
	}
}
new Notice("Finish", 10000)
%>