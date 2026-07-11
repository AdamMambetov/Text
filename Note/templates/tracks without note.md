```dataviewjs
var sourceFiles = app.vault.getFiles()
	.filter(f => f.path.startsWith("Audio/Music"))
const tracks = app.vault.getFolderByPath("Text/Music/Tracks").children
	.filter(f => f instanceof obsidian.TFile)

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
}
dv.list(a.map(f => f.basename))
dv.list(sourceFiles.map(f => f.basename))
```