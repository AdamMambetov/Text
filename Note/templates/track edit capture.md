---
aliases:
  - "5"
  - j
  - jgffg
---

<%*
dv = app.plugins.plugins.dataview.api
const modalForm = app.plugins.plugins.modalforms.api;
let filePath = tp.file.path(true)
let page = dv.page(filePath)
let file = tp.file.find_tfile(filePath)
let trackInfo = {
	"aliases": null,
	"Year": null,
	"Album": null,
	"Creators": null,
	"NumberInAlbum": null,
	"source": null,
	"SourceFile": null,
	"related": null,
	"ListenInSec": null,
	"CoverOf": null,
	"SelectedCover": null,
}
let formValues = {}
for (let i in Object.keys(trackInfo)) {
	let k = Object.keys(trackInfo)[i]
	if (page[k] == null) continue
	formValues[k] = page[k]
}

const result = await modalForm.openForm("track-edit-form", { values: values });

trackInfo.aliases = result.get("aliases")
trackInfo.Year = result.get("Year")
let album = result.get("Album")
if (album !== "")
	trackInfo.Album = `[[${album}]]`
else
	trackInfo.Album = ""
trackInfo.Creators = result.get("Creators", value => value.map(v => `"[[${v}]]"`))
trackInfo.NumberInAlbum = result.get("NumberInAlbum")
trackInfo.source = result.get("source")
trackInfo.SourceFile = result.get("SourceFile")
trackInfo.related = result.get("related", value => value.map(v => `"[[${v}]]"`))
trackInfo.ListenInSec = result.get("ListenInSec")
let coverOf = result.get("CoverOf")
if (coverOf !== "")
	trackInfo.CoverOf = `[[${coverOf}]]`
else
	trackInfo.CoverOf = ""


let coverTFile = tp.file.find_tfile(coverPath)
if (coverTFile != null) {
	let coverPath = result.asString("{{Cover}}")
	let cover = result.asString("{{CoverName}}")
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