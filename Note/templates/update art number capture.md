<%*
dv = app.plugins.plugins.dataview.api

const files = dv.pages('"Text/Art/content"').sort(f => f.created, "asc")

let title = tp.file.title
let num = files.findIndex(f => f.file.name === title)
if (num == -1) return
num++
title = title.substring(0, title.lastIndexOf(" "))
title = `Text/Art/content/${title} ${num}).md`
await tp.app.fileManager.renameFile(
	files[num-1].file,
	title
)
%>