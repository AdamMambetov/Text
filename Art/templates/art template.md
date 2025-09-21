<%*
dv = app.plugins.plugins.dataview.api

let types = {
	preview: ["Аниме, anime", "Аниме фильм, anime film", "Книга, book", "Курс, course", "Фильм, film", "Игра, game", "Манга, mange", "Маньхуа, manhua", "Манхва, manhwa", "Ранобе, ranobe", "Сериал, series", "Мультсериал, cartoon"],
	items: ["anime", "anime film", "book", "course", "film", "game", "manga", "manhua", "manhwa", "ranobe", "series", "cartoon"],
	itemsRu: ["Аниме", "Аниме фильм", "Книга", "Курс", "Фильм", "Игра", "Манга", "Маньхуа", "Манхва", "Ранобе", "Сериал", "Мультсериал"]
}
let statuses = {
	preview: ["watch, Читаю, Смотрю, Играю", "complete, Прочитано, Просмотрено, Пройдено", "defer, Отложено", "drop, Брошено", "plan, Запланировано"],
	items: ["watch", "complete", "defer", "drop", "plan"]
}
let links = ["https://shikimori.one/", "https://www.tvtime.com/", "http://www.world-art.ru/", "https://onikes.ru/", "https://yo8z6gv.github.io/", "https://www.animefillerlist.com/", "https://mangalib.me/", "https://ranobelib.me/", "https://anilib.me/", "https://senkuro.com/", "https://reyohoho.github.io/reyohoho/", "https://freetp.org/", "https://store.steampowered.com/"]
let names = ["shikimori", "tvTime", "worldArt", "onikes", "kesidatokioVods", "animeFillerList", "mangalib", "ranobelib", "animelib", "senkuro", "reyohoho", "freetp", "steam"]
let buttonNames = ["Shikimori", "TV Time", "World Art", "ONIKES", "KESIDATOKIO VOD'S", "Anime Filler List", "MangaLib", "RanobeLib", "AnimeLib", "Senkuro", "ReYohoho", "FreeTP", "Steam"]
let ratings = ["G", "PG", "PG-13", "R-17", "R+", "Rx"]

let title = tp.file.title
let type = await tp.system.suggester(types.preview, types.items);
let status = await tp.system.suggester(statuses.preview, statuses.items);
let rating = await tp.system.suggester(ratings, ratings)
let year = await tp.system.prompt("Год", "")
let episode = ""

let season = ""
if (type === "series") {
	episode = await tp.system.prompt("Эпизод", "")
	season = await tp.system.prompt("Сезон", "")
}

let views = ""
if (status === "complete")
	views = await tp.system.prompt("Просмотры", "")

// Request links by type
switch(type) {
	case "anime":
	case "anime film":
		links[0] = await tp.system.prompt("Shikimori", "")
		links[1] = await tp.system.prompt("TV Time", "")
		links[2] = await tp.system.prompt("World Art", "")
		links[8] = await tp.system.prompt("AnimeLib", "")
		links[9] = await tp.system.prompt("Senkuro", "")
		links[10] = await tp.system.prompt("ReYohoho", "")
		break
	case "manga":
	case "manhua":
	case "manhwa":
		links[0] = await tp.system.prompt("Shikimori", "")
		links[2] = await tp.system.prompt("World Art", "")
		links[6] = await tp.system.prompt("MangaLib", "")
		links[9] = await tp.system.prompt("Senkuro", "")
		break
	case "ranobe":
		links[0] = await tp.system.prompt("Shikimori", "")
		links[7] = await tp.system.prompt("RanobeLib", "")
		links[9] = await tp.system.prompt("Senkuro", "")
		break
	case "game":
		links[2] = await tp.system.prompt("World Art", "")
		links[12] = await tp.system.prompt("Steam", "")
		links[11] = await tp.system.prompt("FreeTP", "")
		break
	case "series":
	case "film":
	case "cartoon":
		links[2] = await tp.system.prompt("World Art", "")
		links[1] = await tp.system.prompt("TV Time", "")
		links[10] = await tp.system.prompt("ReYohoho", "")
		break
}

let icon = ""
switch(type) {
	case "anime": // 🌸
	case "anime film": // 🌸
	case "manga": // 🇯🇵📚
	case "manhua": // 🇨🇳📚
	case "manhwa": // 🇰🇷📚
	case "ranobe": // 📑🗂
		icon = "⛩️"
		break
	case "book":
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

let num = dv.pages().filter(p => !p.file.path.includes('/')).length
await tp.file.rename(`${title} (${icon}${num})`);

let parser = null
if (links[0].length > "https://shikimori.one/".length)
	parser = await tp.user.shikimoriParser(tp, links[0])

tR += "---" + "\n"
tR += "created: " + tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ") + "\n"
tR += "aliases: \n  - \"" + title + "\"\n"
tR += "Status: " + status + "\n"
tR += "Type: " + type + "\n"
tR += "Rating: " + rating + "\n"
tR += "Cover: " + "\n"
tR += "Year: " + year + "\n"
if (season.length != 0)
	tR += "Season: " + season + "\n"
if (episode.length != 0)
	tR += "Episode: " + episode + "\n"
if (views.length != 0)
	tR += "Views: " + views + "\n"
tR += "---"
%>

# <% title %>

<%*
if (parser != null) {
	tR += "![]("
	tR += parser.imageLink
	tR += ")\n\n"
} else {
	tR += "\n\n\n"
}

// buttons
function createBtn(name) {
	let index = names.findIndex((el => el === name))
	tR += "\`\`\`button" + "\n"
	tR += "name " + buttonNames[index] + "\n"
	tR += "type link" + "\n"
	tR += "action " + links[index] + "\n"
	
	// colors
	switch (name) {
		case "shikimori":
			tR += "customColor \#4682b4" + "\n"
			break;
		case "tvTime":
			tR += "customColor \#997f00" + "\n"
			break;
		case "worldArt":
			tR += "customColor \#7a0000" + "\n"
			break;
		case "onikes":
			tR += "color purple" + "\n"
			break;
		case "kesidatokioVods":
			tR += "color purple" + "\n"
			tR += "customTextColor black" + "\n"
			break;
		case "animeFillerList":
			tR += "customColor \#da5100" + "\n"
			break;
		case "mangalib":
			tR += "customColor \#252527" + "\n"
            tR += "customTextColor \#b6720f" + "\n"
			break;
		case "ranobelib":
			tR += "customColor \#252527" + "\n"
            tR += "customTextColor \#2196f3" + "\n"
			break;
		case "animelib":
			tR += "customColor \#252527" + "\n"
            tR += "customTextColor \#7E57C2" + "\n"
			break;
		case "senkuro":
			tR += "customColor \#191A21" + "\n"
			break;
		case "reyohoho":
			tR += "customColor \#1c1c1c" + "\n"
			break;
		case "freetp":
			tR += "color green" + "\n"
			tR += "customTextColor black" + "\n"
			break;
		case "steam":
			tR += "customColor #133C6F" + "\n"
			tR += "textColor white" + "\n"
			break;
	}
	tR += "hidden true" + "\n"  
	tR += "\`\`\`" + "\n"
	tR += "^button-" + names[index] + "\n\n"
}

switch (type) {
	case "anime":
	case "anime film":
		createBtn("shikimori")
		createBtn("tvTime")
		createBtn("worldArt")
		createBtn("animelib")
		createBtn("senkuro")
		createBtn("reyohoho")
		break;
	case "manga":
	case "manhua":
	case "manhwa":
		createBtn("shikimori")
		createBtn("worldArt")
		createBtn("mangalib")
		createBtn("senkuro")
		break
	case "ranobe":
		createBtn("shikimori")
		createBtn("ranobelib")
		createBtn("senkuro")
		break
	case "film":
	case "series":
	case "cartoon":
		createBtn("tvTime")
		createBtn("worldArt")
		createBtn("reyohoho")
		break
	case "game":
		createBtn("worldArt")
		createBtn("steam")
		createBtn("freetp")
		break
}
%>

<%*
// inline buttons
switch (type) {
	case "anime":
	case "anime film":
		tR += "\`button-shikimori\` "
		tR += "\`button-tvTime\`\n\n"
		tR += "\`button-worldArt\` "
		tR += "\`button-animelib\`\n\n"
		tR += "\`button-senkuro\` "
		tR += "\`button-reyohoho\`\n\n"
		break;
	case "manga":
	case "manhua":
	case "manhwa":
		tR += "\`button-shikimori\` "
		tR += "\`button-worldArt\`\n\n"
		tR += "\`button-mangalib\` "
		tR += "\`button-senkuro\`"
		break
	case "ranobe":
		tR += "\`button-shikimori\` "
		tR += "\`button-ranobelib\`\n\n"
		tR += "\`button-senkuro\`"
		break
	case "film":
	case "series":
		tR += "\`button-tvTime\` "
		tR += "\`button-worldArt\`\n\n"
		tR += "\`button-reyohoho\`"
		break
	case "game":
		tR += "\`button-worldArt\` "
		tR += "\`button-steam\`\n\n"
		tR += "\`button-freetp\`"
		break
}
%>

## Причина добавления




## Описание

<%*
if (parser != null) {
	tR += parser.desc
}
%>

