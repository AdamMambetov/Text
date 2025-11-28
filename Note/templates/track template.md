<% "---" %>
<%*
dv = app.plugins.plugins.dataview.api
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("track-form", { values: {
	aliases: [tp.file.title],
}});

//let aliases = result.asString("{{aliases}}")
//let aliases
//if (aliases !== "{{aliases}}") {
//	aliases = aliases.split(",")
//	console.log(aliases)
//}
let aliases = result.get("aliases")
let title = result.aliases.value[0]
let year = result.get("Year")
let album = result.get("Album")
if (album !== "")
	album = `[[${album}]]`
let creators = result.get("Creators", value => value.map(v => `"[[${v}]]"`))
console.log(`Creators = ${creators}`)
let numberInAlbum = result.get("NumberInAlbum")
let source = result.get("source")
let sourceFile = result.get("SourceFile")
let related = result.get("related", value => value.map(v => `"[[${v}]]"`))
let listenInSec = result.get("ListenInSec")
let coverOf = result.get("CoverOf")
if (coverOf !== "")
	coverOf = `[[${coverOf}]]`

let coverPath = result.asString("{{Cover}}")
let cover = result.asString("{{CoverName}}")
let coverTFile = tp.file.find_tfile(coverPath)
if (coverTFile != null) {
	let path = coverPath.substring(0, coverPath.lastIndexOf("/"))
	let extension = coverPath.split(".")[1]
	cover = `${cover}.${extension}`
	await tp.app.fileManager.renameFile(coverTFile, `${path}/${cover}`)
	cover = `[[${cover}]]`
} else {
	cover = ""
}

let num = dv.pages('"Text/Music/Tracks"').length
await tp.file.rename(`${title} (🎧️ ${num})`);

tR += `created: ${tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ")}\n`
tR += `aliases: ${aliases}\n`
tR += `Cover: "${cover}"\n`
tR += `Year: ${year}\n`
tR += `Album: "${album}"\n`
tR += `Creators: [${creators}]\n`
tR += `NumberInAlbum: ${numberInAlbum}\n`
tR += `source: "${source}"\n`
tR += `SourceFile: "[[${sourceFile}]]"\n`
tR += `related: [${related}]\n`
tR += `ListenInSec: ${listenInSec}\n`
tR += `CoverOf: "${coverOf}"\n`
-%>
<% "---" %>


# <% title %>

<% `![[${sourceFile}]]` %>

## Related Tracks

![[related tracks.base]]
