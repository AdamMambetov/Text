<%*
dv = app.plugins.plugins.dataview.api

// Sync "created" property in note from "SourceFile"
if (false) {
	let arr = dv.pages('"Text/Music/Tracks"')
	let exit = false
	arr.forEach(async (el) => {
		const file = await tp.file.find_tfile(el.file.path)
		let source = await tp.file.find_tfile(el.SourceFile.path)
		let ctime = source.stat.ctime
		if (ctime >= el.created.ts)
			return
		const created = moment(new Date(ctime)).format("YYYY-MM-DDTHH:mm:ssZ")
		await tp.app.fileManager.processFrontMatter(file, fm => {
			fm["created"] = created
		})
		new Notice(file.name, 50000)
	})
	return
}

dv.pages('"Text/Music/Tracks"').forEach(el => {
	if (el.SourceFile == null)
		console.log(`${el.file.name}`)
})

// Found and fix identical "created"
let arr = dv.pages('"Text/Music/Tracks"')
	.groupBy(p => p.created)
	.filter(el => el.rows.length > 1)
while (arr.length > 0) {
	const el = arr[0]
	for (let j = 0; j < el.rows.length; j++) {
		const file = tp.file.find_tfile(el.rows[j].file.path)
		new Notice(file.name, 50000)
		console.log(file.name)
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