<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Text/Music/Tracks"')
	.groupBy(p => p.created)
	.filter(el => el.rows.length > 1)
while (arr.length > 0) {
	for (let i = 0; i < arr.length; i++) {
		let el = arr[i]
		// new Notice(Object.keys(el.key), 50000)
		for (let j = 0; j < el.rows.length; j++) {
			let offset = 1000 * j
			let date = new Date(el.key.ts + offset)
			// date.getTime()
			// date.toISOString()
			new Notice(moment(date).format("YYYY-MM-DDTHH:mm:ssZZ"), 50000)
			continue
			let page = el.rows[j]
			let file = tp.file.find_tfile(filePath)
			break
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