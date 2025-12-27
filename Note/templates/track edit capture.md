---
aliases:
  - "5"
  - j
  - jgffg
Creators:
  - "[[-45 (🎙️ 6)]]"
  - "[[@Адам Мамбетов]]"
  - "[[Katou Kazumi - EASY GO (TV Size).mp3]]"
Cover: "[[1+1_film_cover.png]]"
---

<%*
function removeExtension(str) {
	return str.replace(/\.[^/.]+$/, "")
}

function isLink(obj) {
	return obj && typeof(obj) === "object" && typeof(obj.path) === "string"
}

function getLinkName(link) {
	if (!isLink(link))
		return ""
	let name = link.path.split("/").pop()
	if (name.endsWith(".md"))
		return removeExtension(name)
	return name
}

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
	"Cover": null,
}
let formValues = {}
for (let i in Object.keys(trackInfo)) {
	let k = Object.keys(trackInfo)[i]
	if (page[k] == null)
		continue
	else if (Array.isArray(page[k])) {
		formValues[k] = page[k].map(el => {
			if (isLink(el)) {
				return `[[${getLinkName(el)}]]`
			}
			return el
		})
		new Notice(formValues[k], 20000)
	}
	else if (k === "Cover") {
		let t = removeExtension(getLinkName(page[k]))
		new Notice(t, 10000)
		formValues["SelectedCover"] = t
		//formValues["SelectedCover"] = removeExtension(getLinkName(page[k]))
	}
	else if (isLink(page[k])) {
		formValues[k] = `[[${getLinkName(page[k])}]]`
	}
	else
		formValues[k] = page[k]
}

const result = await modalForm.openForm("track-edit-form", { values: formValues });
if (result.status === "cancelled")
	return

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
trackInfo["Cover"] = cover

//await tp.app.fileManager.processFrontMatter(file, async (fm) => {
	//for (let i in )
//})

// Regex pattern developed by Islam Kertov, thanks bro!  
// It analyze yaml front matter in markdown. Returns key in group 1 and value in group 2
const regex = /(^[\w]*[^: \[\]]): ?([\w\S\': ]*)$/gm

-%>