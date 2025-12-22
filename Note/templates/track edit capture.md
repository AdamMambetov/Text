---
aliases:
  - "5"
  - j
  - jgffg
---

<%*
dv = app.plugins.plugins.dataview.api
const modalForm = app.plugins.plugins.modalforms.api;
let page = dv.page(tp.file.path(true))
let keys = ["aliases", "Year", "Album", "Creators", "NumberInAlbum", "source", "SourceFile", "related", "ListenInSec", "CoverOf", "SelectedCover"]
let values = {}
for (let i in keys) {
	let k = keys[i]
	if (page[k] == null) continue
	values[k] = page[k]
}

const result = await modalForm.openForm("track-edit-form", { values: values });

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
	cover = `[[${result.get("SelectedCover")}]]`
}

await tp.app.fileManager.processFrontMatter(file, async (fm) => {
	for (let i in )
	fm[]
})
-%>