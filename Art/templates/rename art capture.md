<%*
dv = app.plugins.plugins.dataview.api

let title = tp.file.title

const files = dv.pages().filter(p => !p.file.path.includes('/')).sort(f => f.created, "asc")
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
	case "comix":
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
	case "comix":
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