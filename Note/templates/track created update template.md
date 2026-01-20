<%*
dv = app.plugins.plugins.dataview.api

let arr = dv.pages('"Text/Music/Tracks"')
	.groupBy(p => p.created)
	.filter(el => el.rows.length > 1)
while (arr.length > 0) {
	const el = arr[0]
	for (let j = 0; j < el.rows.length; j++) {
		const file = tp.file.find_tfile(el.rows[j].file.path)
		new Notice(file.name, 50000)
		const offset = 1000 * j
		const date = new Date(el.key.ts + offset)
		const dateStr = moment(date).format("YYYY-MM-DDTHH:mm:ssZ")
		// new Notice(dateStr, 50000)
		await tp.app.fileManager.processFrontMatter(file, fm => {
			fm["created"] = dateStr
		})
	}
	// break
	arr = dv.pages('"Text/Music/Tracks"')
	.groupBy(p => p.created)
	.filter(el => el.rows.length > 1)
}
-%>