<%*
const root = tp.app.vault.getFolderByPath("Text/Music")
const dirs = root.children.filter(f => f instanceof tp.obsidian.TFolder)
for (let i = 0; i < dirs.length; i++) {
	const files = dirs[i].children
		.filter(f => f instanceof tp.obsidian.TFile)
		.filter(f => !f.path.includes("templates"))
		.filter(f => f.path.includes("Creators"))
	
	for (let j = 0; j < files.length; j++) {
		const file = files[j]
		
		// Regex pattern developed by Islam Kertov, thanks bro!  
		// It analyze yaml front matter in markdown. Returns key in group 1 and value in group 2
		const regex = /(^[\w]*[^: \[\]]): ?([\w\S\': ]*)$/gm
		
		await tp.app.fileManager.processFrontMatter(file, async (fm) => {
			if (fm["aliases"] == null)
				fm["aliases"] = []
			
			if (fm["aliases"].length == 0)
				return
			
			let aliases = ""
			for (let k = 0; k < fm["aliases"].length; k++) {
				aliases += `, "${fm["aliases"][k]}"`
			}
			aliases = `[${aliases.substring(2, aliases.length)}]`
			
			await tp.app.vault.process(file, content => {
				console.log(content)
				let result = content
				const matches = [...content.matchAll(regex)]
				for (let k = 0; k < matches.length; k++) {
					let match = matches[k]
					if (match[1] === "aliases") {
						result = result.replace(match[0], `${match[1]}: ${aliases}`)
						console.log(result)
						let lines = result
							.split("---")[1]
							.split(`${match[1]}: `)[1]
							.split("\n")
						for (let l = 1; l < lines.length; l++) {
							let line = lines[l]
							if (!line.startsWith("  - "))
								break
							result = result.replace(line + "\n", "")
						}
						console.log(lines)
						console.log(result)
					}
				}
				return result
			})
		})
	}
}
new Notice("Finish", 5000)
-%>