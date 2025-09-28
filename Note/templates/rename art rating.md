<%*
dv = app.plugins.plugins.dataview.api

const files = dv.pages('"Text/Art"').filter(p => !p.file.path.includes('franchises') && !p.file.path.includes('templates') && !p.file.path.includes('ratings'))

for (let i = 0; i < files.length; i++) {
	if (files[i].rating == null)
		continue
	if (Array.isArray(files[i].rating)) {
		let res = files[i].rating.filter(r => typeof(r) === "string")
		if (res.length == 0)
			continue
	} else {
		if (typeof(files[i].rating) !== "string")
			continue
	}
	//console.log(files[i].rating)
	
	const file = tp.file.find_tfile("Text/Art/" + files[i].file.name)
	await tp.app.fileManager.processFrontMatter(file, (fm) => {
		console.log(file.basename)
		if (Array.isArray(fm["Rating"])) {
			for (let r = 0; r < fm["Rating"].length; r++) {
				let rating = fm["Rating"][r]
				if (typeof(rating) !== "string")
					continue
				
				if (rating === "G" || rating === "0+")
					fm["Rating"][r] = `[[®️0|${rating}]]`
				if (rating === "PG" || rating === "6+")
					fm["Rating"][r] = `[[®️6|${rating}]]`
				if (rating === "PG-13" || rating === "12+" || rating === "M")
					fm["Rating"][r] = `[[®️12|${rating}]]`
				if (rating === "R-17" || rating === "16+" || rating === "R")
					fm["Rating"][r] = `[[®️16|${rating}]]`
				if (rating === "R+" || rating === "18+" || rating === "X" || rating === "NC-17" || rating === "Rx")
					fm["Rating"][r] = `[[®️18|${rating}]]`
			}
		} else {
			let rating = fm["Rating"]
			if (typeof(rating) !== "string")
				return
			
			if (rating === "G" || rating === "0+")
				fm["Rating"] = [`[[®️0|${rating}]]`]
			if (rating === "PG" || rating === "6+")
				fm["Rating"] = [`[[®️6|${rating}]]`]
			if (rating === "PG-13" || rating === "12+" || rating === "M")
				fm["Rating"] = [`[[®️12|${rating}]]`]
			if (rating === "R-17" || rating === "16+" || rating === "R")
				fm["Rating"] = [`[[®️16|${rating}]]`]
			if (rating === "R+" || rating === "18+" || rating === "X" || rating === "NC-17" || rating === "Rx")
				fm["Rating"] = [`[[®️18|${rating}]]`]
		}
	});
}
//new Notice(title, 5000)
%>