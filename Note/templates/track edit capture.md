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
Object.keys(trackInfo).forEach(key => {
	let value = page[key]
	if (value == null)
		return
	else if (Array.isArray(value)) {
		formValues[key] = value.map(el => {
			if (isLink(el)) {
				return getLinkName(el)
			}
			return el
		})
		new Notice(formValues[key], 20000)
	}
	else if (key === "Cover") {
		formValues["SelectedCover"] = getLinkName(value)
	}
	else if (isLink(value)) {
		formValues[key] = `${getLinkName(value)}`
	}
	else
		formValues[key] = value
})

let itemsToLink = (arr) => arr.map(el => `"[[${el}]]"`)
const result = await modalForm.openForm("track-edit-form", { values: formValues });
if (result.status === "cancelled")
	return

trackInfo.aliases = result.get("aliases")
trackInfo.Year = result.get("Year")
let album = result.get("Album")
if (album !== "")
	trackInfo.Album = `"[[${album}]]"`
else
	trackInfo.Album = `""`
trackInfo.Creators = "[" + result.get("Creators", itemsToLink) + "]"
trackInfo.NumberInAlbum = result.get("NumberInAlbum")
trackInfo.source = result.get("source")
trackInfo.SourceFile = `"[[${result.get("SourceFile")}]]"`
trackInfo.related = "[" + result.get("related", itemsToLink) + "]"
trackInfo.ListenInSec = result.get("ListenInSec")
let coverOf = result.get("CoverOf")
if (coverOf !== "")
	trackInfo.CoverOf = `"[[${coverOf}]]"`
else
	trackInfo.CoverOf = `""`


let coverPath = result.asString("{{Cover}}")
let coverTFile = tp.file.find_tfile(coverPath)
if (coverTFile != null) {
	let cover = result.asString("{{CoverName}}")
	let path = coverPath.substring(0, coverPath.lastIndexOf("/"))
	let extension = coverPath.split(".")[1]
	cover = `${cover}.${extension}`
	await tp.app.fileManager.renameFile(coverTFile, `${path}/${cover}`)
	cover = `"[[${cover}]]"`
} else {
	cover = `"[[${result.get("SelectedCover")}]]"`
}
trackInfo["Cover"] = cover

// Regex pattern developed by Islam Kertov, thanks bro!  
// It analyze yaml front matter in markdown. Returns key in group 1 and value in group 2
const regex = /(^[\w]*[^: \[\]]): ?([\w\S\': ]*)$/gm
await tp.app.vault.process(file, content => {
	Object.keys(trackInfo).forEach(key => {
		let value = trackInfo[key]
		if (value == null)
			return
		let hasKey = false
		content.matchAll(regex).forEach(match => {
			if (match[1] !== key)
				return
			hasKey = true
			
			content = content.replace(match[0], `${key}: ${value}`)
			let lines = content
				.split("---")[1]
				.split(`${key}: `)[1]
				.split("\n")
			for (let l = 1; l < lines.length; l++) {
				let line = lines[l]
				if (!line.startsWith("  - "))
					break
				content = content.replace(line + "\n", "")
			}
		})
		if (!hasKey) {
			content = content.slice(0, 4) + `${key}: ${value}\n` + content.slice(4)
		}
	})
	return content
})
-%>