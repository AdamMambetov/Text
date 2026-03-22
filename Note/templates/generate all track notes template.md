<%*
dv = app.plugins.plugins.dataview.api

// Search all tracks without note
var sourceFiles = app.vault.getFiles()
	.filter(f => f.path.startsWith("Audio/Music"))
	.filter(f => f.name !== "desktop.ini")
const tracks = app.vault.getFolderByPath("Text/Music/Tracks").children
	.filter(f => f instanceof tp.obsidian.TFile)

for (let i in tracks) {
	let file = tracks[i]
	const linkedFiles = app.metadataCache.getFileCache(file).frontmatterLinks
	if (!linkedFiles) {
		new Notice(file.basename, 50000)
		continue
	}
	let link = linkedFiles.find(l => l.key === "SourceFile").link
	sourceFiles = sourceFiles.filter(f => link !== f.name)
}

// Create track notes

const trackTemplate = `---
created: {created}
aliases: ["{title}"]
Cover: "[[_No Album Art.jpg]]"
Year: 0
Album: ""
Creators: []
NumberInAlbum: 0
source: ""
SourceFile: "[[{sourceFile}]]"
related: []
ListenInSec: 0
CoverOf: ""
---

\`$=dv.header(1, dv.current().aliases[0])\`

![[{sourceFile}]]

## Related Tracks

![[related tracks.base]]

`

sourceFiles.forEach(async (track) => {
	const created = moment(new Date(track.stat.ctime))
		.format("YYYY-MM-DDTHH:mm:ssZ")
	const title = track.basename
		.replaceAll("?", "")
		.replaceAll("#", "")
		.replaceAll("/", "")
		.replaceAll("\\", "")
		.replaceAll("\"", "'")
	const content = trackTemplate
		.replaceAll("{created}", created)
		.replaceAll("{title}", title)
		.replaceAll("{sourceFile}", track.name)
	await tp
		.app
		.vault
		.create(`Text/Music/Tracks/${title}.md`, content)
	new Notice(title, 50000)
})
-%>