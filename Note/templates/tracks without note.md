```dataviewjs
var sourceFiles = app.vault.getFiles()
	.filter(f => f.path.startsWith("Audio/Music"))
const tracks = app.vault.getFolderByPath("Text/Music/Tracks").children
	.filter(f => f instanceof obsidian.TFile)

var covers = app.vault.getFiles()
	.filter(f => f.path.startsWith("Text/Music/Covers"))

let a = []
for (let i in tracks) {
	let file = tracks[i]
	const linkedFiles = app.metadataCache.getFileCache(file).frontmatterLinks
	if (!linkedFiles) {
		a.push(file)
		continue
	}
	let link = linkedFiles.find(l => l.key === "SourceFile").link
	sourceFiles = sourceFiles.filter(f => link !== f.name)
	
	let link2 = linkedFiles.find(l => l.key === "Cover")
	if (!link2) {
		dv.paragraph(file.basename)
		continue
	}
	covers = covers.filter(f => link2.link !== f.name)
}

dv.list(covers.map(f => f.basename))

dv.list(a.map(f => f.basename))
dv.list(sourceFiles.map(f => f.basename))
```