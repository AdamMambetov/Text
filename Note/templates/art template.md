<% "---" %>
<%*
dv = app.plugins.plugins.dataview.api
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("art-form", { values: { aliases: [tp.file.title] } });
const linkInfo = {
	links: ["shiki", "tvtime.com", "world-art.ru", "onikes.ru", "yo8z6gv.github.io", "animefillerlist.com", "mangalib.me", "ranobelib.me", "anilib.me", "senkuro.com", "reyohoho.github.io/reyohoho", "freetp.org", "store.steampowered.com", "store.epicgames.com", "gog.com"],
	names: ["shikimori", "tvTime", "worldArt", "onikes", "kesidatokioVods", "animeFillerList", "mangalib", "ranobelib", "animelib", "senkuro", "reyohoho", "freetp", "steam", "epicGames", "gog"],
	buttons: ["Shikimori", "TV Time", "World Art", "ONIKES", "KESIDATOKIO VOD'S", "Anime Filler List", "MangaLib", "RanobeLib", "AnimeLib", "Senkuro", "ReYohoho", "FreeTP", "Steam", "Epic Games", "GOG"],
}

let icon
switch (result.get("Type")) {
	case "anime":
	case "anime film":
	case "cartoon":
		icon = "📺"
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

let title = tp.file.title
let num = dv.pages('"Text/Art/content"').length
await tp.file.rename(`${title} (${result.get("Flag")}${icon} ${num})`);

let coverPath = result.asString("{{Cover}}")
let cover = result.asString("{{CoverName}}")
let coverTFile = tp.file.find_tfile(coverPath)
if (coverTFile != null) {
	let path = coverPath.substring(0, coverPath.lastIndexOf("/"))
	let extension = coverPath.split(".")[1]
	cover = `${cover}.${extension}`
	await tp.app.fileManager.renameFile(coverTFile, `${path}/${cover}`)
} else {
	cover = ""
}

tR += `created: ${tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ")}\n`
tR += result.asFrontmatterString({ pick: [
    "aliases",
    "Status",
    "Type",
    "Rating",
    "Year",
    "Season",
    "Episode",
    "Views"
]});
if (cover !== "")
	tR += `Cover: "[[${cover}]]"\n`
if (result.asString("{{Адаптация}}") !== "{{Адаптация}}")
	tR += `Адаптация: "[[${result.asString("{{Адаптация}}")}]]"\n`
if (result.asString("{{Предыстория}}") !== "{{Предыстория}}")
	tR += `Предыстория: "[[${result.asString("{{Предыстория}}")}]]"\n`
if (result.asString("{{Продолжение}}") !== "{{Продолжение}}")
	tR += `Продолжение: "[[${result.asString("{{Продолжение}}")}]]"\n`
-%>
<% "---" %>

# <% result.asString("{{aliases}}").split(",")[0] %>

<%*
if (cover !== "")
	tR += `![[${cover}]]`
//let parser = null
//if (links[0].length > "https://shikimori.one/".length)
//	parser = await tp.user.shikimoriParser(tp, links[0])
-%>

<%* // buttons
//if (parser != null) {
//	tR += "![]("
//	tR += parser.imageLink
//	tR += ")\n\n"
//}

function createBtn(name, id, link) {
	tR += "\`\`\`button\n"
	tR += `name ${name}\n`
	tR += "type link\n"
	tR += `action ${link}\n`
	tR += `class button-${id}\n`
	tR += "hidden true\n"
	tR += "\`\`\`\n"
	tR += `^button-${id}\n`
}

let links = result.asString("{{Links}}")
if (links !== "{{Links}}") {
	links = links.split(",")
	for (let i = 0; i < links.length; i++) {
		let index = linkInfo.links.findIndex(link => links[i].includes(link))
		if (index == -1)
			createBtn(`Button ${i}`, `${i}`, links[i])
		else
			createBtn(linkInfo.buttons[index], linkInfo.names[index], links[i])
	}
}
%>

<%* // inline buttons
if (links !== "{{Links}}") {
	for (let i = 0; i < links.length; i++) {
		let index = linkInfo.links.findIndex(link => links[i].includes(link))
		let btnId = ""
		if (index == -1)
			btnId = `${i}`
		else
			btnId = linkInfo.names[index]
		
		if (i % 2 == 0)
			tR += `\n\n\`button-${btnId}\``
		else
			tR += ` \`button-${btnId}\``
	}
}
%>

## Причина добавления




## Описание

<%*
//if (parser != null) {
//	tR += parser.desc
//}
%>
