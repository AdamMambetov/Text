# aliases capture
<%* // Aliases for music
const folder = tp.app.vault.getFolderByPath("Text/Note/projects/music")
const files = folder.children.filter(f => f instanceof tp.obsidian.TFile)
for (let i = 0; i < files.length; i++) {
	let file = files[i]
	let exit = false
	await tp.app.fileManager.processFrontMatter(file, (fm) => {
		if (fm["name"] != null) {
			new Notice(fm["name"], 5000)
			exit = true
			return
			if (fm["aliases"] == null)
				fm["aliases"] = []
			if (!fm["aliases"].includes(fm["Name"]))
				fm["aliases"].push(fm["Name"])
		}
		return
		if (fm["OtherName"] != null) {
			if (fm["aliases"] == null)
				fm["aliases"] = []
			fm["OtherName"].forEach((name) => {
				if (!fm["aliases"].includes(name))
					fm["aliases"].push(name)
			})
			delete fm["OtherName"]
		}
	})
	if (exit)
		break
}
%>

<%*
// Aliases for database
function databaseAliases() {
	const folder = tp.app.vault.getFolderByPath("Text/Note/projects/database")
	const files = folder.children.filter(f => f instanceof tp.obsidian.TFile)
	files.shift()
	
	files.forEach(async (f) => {
		await tp.app.fileManager.processFrontMatter(f, fm => {
			if (fm["Name"] != null) {
				if (fm["aliases"] == null)
					fm["aliases"] = []
				if (!fm["aliases"].includes(fm["Name"]))
					fm["aliases"].push(fm["Name"])
			}
			if (fm["OtherName"] != null) {
				if (fm["aliases"] == null)
					fm["aliases"] = []
				fm["OtherName"].forEach((name) => {
					if (!fm["aliases"].includes(name))
						fm["aliases"].push(name)
				})
				delete fm["OtherName"]
			}
		})
	})
}
%>
