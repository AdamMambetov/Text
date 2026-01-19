<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Text/Music/Tracks"')
	.groupBy(p => p.created)
	.filter(el => el.rows.length > 1)
while (arr.length > 0) {
	for (let i = 0; i < arr.length; i++) {
		const el = arr[i]
		for (let j = 0; j < el.rows.length; j++) {
			const file = el.rows[j].file
			new Notice(file.name, 50000)
			const offset = 1000 * j
			const date = new Date(el.key.ts + offset)
			const dateStr = moment(date).format("YYYY-MM-DDTHH:mm:ssZ")
			new Notice(dateStr, 50000)
			await tp.app.fileManager.processFrontMatter(file, fm => {
				fm["created"] = dateStr
			})
		}
		break
	}
	break
	arr = dv.pages('"Text/Music/Tracks"')
	.groupBy(p => p.created)
	.filter(el => el.rows.length > 1)
}
return
arr[0].rows.forEach(p => new Notice(p.file.name, 50000))

return

let current = dv.page(tp.file.path(true))
let creator = dv.page(current.Creators[0])
let trackName = current.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
let creatorName = creator.aliases[0]
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
let num = dv.pages('"Text/Music/Tracks"')
	.sort(p => p.created, "asc")
	.indexOf(current) + 1
let title = `${trackName} - ${creatorName} (🎧️ ${num})`
new Notice(title, 5000)
await tp.file.rename(title)
-%>