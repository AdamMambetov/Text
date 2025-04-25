<%*
return
const DATABASE_PATH = "Text/Note/projects/database/"
const CONTENT_PATH = "Text/Note/templates/shikimori content template.md"
const URL_TEMPLATE = "https://shikimori.one/animes/${id}"
const TITLE_TEMPLATE = "⛩️${title} (${type_ru})"
const TYPES = {
	en: {
		tv: "anime",
		movie: "anime film",
	},
	ru: {
		tv: "аниме",
		movie: "аниме фильм",
	},
}
const STATUSES = {
	watching: "watch",
	rewatching: "watch",
	planned: "plan",
	dropped: "drop",
	completed: "complete",
	on_hold: "defer",
}

let arr = await tp.user.shikimoriJsonParser().loadAnimes(tp)
for (let i = 0; i < arr.length; i++) {
	let el = arr[i]
	tR += i + ". " + el.title_ru + " - "
	if (!Object.hasOwn(TYPES.en, el.type)) {
		//tR += "Error: hasn't type '" 
		//tR += el.type + "' in TYPES.en" + "☠\n"
		continue
	}
	//if (!Object.hasOwn(TYPES.en, el.type)) return
	
	let title = el.title_ru
		.replaceAll("?", "")
		.replaceAll(":", ".")
		.replaceAll("—", "-")
		.replaceAll("//", ".")
		.replaceAll("/", ".")
		.replaceAll("ё", "е")
	title = TITLE_TEMPLATE
		.replace("${title}", title)
		.replace("${type_ru}", TYPES.ru[el.type])
	let tFile = tp.file.find_tfile(title)
	if (tFile) {
		tR += "File finded"
		
		let templateVars = [
			"${imageLink}",
			"${description}",
			"${year}",
			"${rating}"
		]
		let contains = false
		let content = await tp.app.vault.read(tFile)
		for (let i = 0; i < templateVars.length; i++) {
			if (content.includes(templateVars[i])) {
				contains = true
				break
			}
		}
		if (!contains) {
			tR += "✔\n"
			continue
		}
		
		let url = URL_TEMPLATE.replace("${id}", el.id)
		let info = await tp.user.shikimoriParser(tp, url)
		if (info == null) {
			tR += " info is null☠\n"
			continue
		}
		if (info.imageLink == null)
			tR += " imageLink is null"
		if (info.desc == null)
			tR += " desc is null"
		if (info.year == null)
			tR += " year is null"
		if (info.rating == null)
			tR += " rating is null"
		content
			.replaceAll(
				"${imageLink}",
				info.imageLink == null ? "${imageLink}" : info.imageLink)
			.replaceAll(
				"${description}",
				info.desc == null ? "${description}" : info.desc)
			.replaceAll(
				"${year}",
				info.year == null ? "${year}" : info.year)
			.replaceAll(
				"${rating}",
				info.rating == null ? "${rating}" : info.rating)
		tR += " 🎉\n"
		continue
	}
	//if (tp.file.find_tfile(title)) return
	
	let content = await tp.app.vault.cachedRead(
		tp.app.vault.getFileByPath(CONTENT_PATH)
	)
	let url = URL_TEMPLATE.replace("${id}", el.id)
	let info = await tp.user.shikimoriParser(tp, url)

	tR += "info is null = " + info == null + "🎉\n"

	let imageLink = info == null ? "${imageLink}" : info.imageLink
	let description = info == null ? "${description}" : info.desc
	let year = info == null ? "${year}" : info.year
	let rating = info == null ? "${rating}" : info.rating
	
	let views = el.status === "rewatching" || el.status === "completed"
		? el.rewatches + 1
		: el.rewatches
	
	content = content
		.replaceAll("${title}", el.title_ru)
		.replaceAll("${time}", tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ"))
		.replace("${type}", TYPES.en[el.type])
		.replace("${imageLink}", imageLink)
		.replace("${description}", description)
		.replace("${status}", STATUSES[el.status])
		.replace("${episode}", el.episode)
		.replace("${views}", views)
		.replace("${year}", year)
		.replace("${rating}", rating)
		.replace("${shikimoriLink}", url)
	
	await tp.file.create_new(content, title, false, DATABASE_PATH)
}
%>
