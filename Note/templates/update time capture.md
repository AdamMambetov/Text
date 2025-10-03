<%*
let hours = []
for (let i = 0; i < 24; i++)
	hours.push(i.toString())

let minsAndSecs = []
for (let i = 0; i < 60; i++)
	minsAndSecs.push(Math.floor(i / 10) == 0 ? "0" + i.toString() : i.toString())
	
let hour = await tp.system.suggester(hours, hours)
let minute = await tp.system.suggester(minsAndSecs, minsAndSecs)
let second = await tp.system.suggester(minsAndSecs, minsAndSecs)
let time = `${hour}:${minute}:${second}`

let file = tp.file.find_tfile(tp.file.title)
await tp.app.fileManager.processFrontMatter(file, frontmatter => {
	frontmatter.Time = time
})
%>