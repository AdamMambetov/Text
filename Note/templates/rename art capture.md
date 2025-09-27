<%*
dv = app.plugins.plugins.dataview.api

let title = tp.file.title

const files = dv.pages('"Text/Art"').filter(p => !p.file.path.includes('franchises') && !p.file.path.includes('templates') && !p.file.path.includes('ratings')).sort(f => f.created, "asc")
for (let i = 0; i < files.length; i++) {
	console.log(files[i].file.path)
}
new Notice(files.length, 10000)
new Notice(files[files.length-1].file.path, 10000)
return
let num = files.findIndex(f => f.file.name === title) + 1
if (num == -1) return

title = title.substring(2, title.length).split(" (")[0]

let flag
switch (files[num-1].type) {
	case "anime":
	case "anime film":
	case "manga":
	case "ranobe":
		flag = "🇯🇵"
		break
	case "manhua":
		flag = "🇨🇳"
		break
	case "manhwa":
		flag = "🇰🇷"
		break
	case "game":
	case "film":
	case "series":
	case "cartoon":
	case "book":
		flag = "🇺🇸"
		break
}

let icon
switch (files[num-1].type) {
	case "anime":
	case "anime film":
	case "cartoon":
		icon = "📺"
		// icon = "🌸"
		break
	case "manga":
	case "manhua":
	case "manhwa":
		icon = "📗"
		break
	case "book":
	case "ranobe":
		icon = "📘"
		break
	case "course":
		icon = "🎓"
		break
	case "film":
		icon = "🎞"
		break
	case "game":
		icon = "🎮"
		break
	case "series":
		icon = "🎬"
		break
}

title = `${title} (${flag}${icon} ${num})`
tp.file.rename(title)
//new Notice(title, 5000)
%>