<%*
// TODO: make update H1 in note to aliases[0]
return
let title = tp.file.title
title = title.substring(0, title.lastIndexOf(" "))
title = `content/${title} ${num}).md`
await tp.app.fileManager.renameFile(
	files[num-1].file,
	title
)
%>