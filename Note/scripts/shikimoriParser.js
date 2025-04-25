function getTitle(page) {
    let title = page.split("<h1>", 2)
    if (title.length != 2) return null
    title = title[1].split("<", 1)
    if (title.length != 1) return null
    title = title[0].trim()
    return title
    //return page.split("<h1>")[1].split("<")[0].trim()
}

function getDescription(page) {
    const div = "<div class=\"b-text_with_paragraphs\">"
    let desc = "Нет описания"
    if (page.includes(div)) {
        desc = page.split(div, 2)
        if (desc.length != 2) return "Нет описания"
        desc = desc[1].split("</div>", 1)
        if (desc.length != 1) return "Нет описания"
        desc = desc[0]
    }
    // let desc = page.includes(div) ? page.split(div)[1].split("</div>")[0] : "Нет описания"
    if (desc !== "Нет описания") {
        let arr = desc.split("<a")
        if (Array.isArray(arr)) {
            arr.shift() // pop front
            for (let i = 0; i < arr.length; i++) {
                let link = arr[i].split('href="')[1].split('"')[0]
                let name = arr[i].split(">")[1].split("<")[0]
                let oldStr = "<a" + arr[i].split("<")[0] + "</a>"
                let newStr = "[" + name + "](" + link + ")"
                desc = desc.replace(oldStr, newStr)
            }
        }
    }
    desc = desc
        .replaceAll("<br>", "\n\n")
        .replaceAll("<br class=\"br\"><br class=\"br\">", "\n\n")
        .replaceAll("—", "-")
    return desc
}

function getImageLink(page) {
    let imageLink = page.split('b-db_entry-poster b-image', 2)
    if (imageLink.length != 2) return null
    imageLink = imageLink[1].split('data-href', 2)
    if (imageLink.length != 2) return null
    imageLink = imageLink[1].slice(2).split('"', 1)
    if (imageLink.length != 1) return null
    imageLink = imageLink[0]
    return imageLink
    // return page
        // .split('b-db_entry-poster b-image')[1]
        // .split('data-href')[1]
        // .slice(2)
        // .split('"')[0]
}

function getYear(page) {
    let year = page.split(' г.', 1)
    if (year.length != 1) return null
    year = year[0].slice(-4)
    return year
    // return page.split(' г.')[0].slice(-4)
}

function getRating(page) {
    let rating = page.split('Рейтинг:', 2)
    if (rating.length != 2) return null
    rating = rating[1].split('<span', 2)
    if (rating.length != 2) return null
    rating = rating[1].split('>', 2)
    if (rating.length != 2) return null
    rating = rating[1].split('<', 1)
    if (rating.length != 1) return null
    rating = rating[0]
    return rating
    // return page
        // .split('Рейтинг:')[1]
        // .split('<span')[1]
        // .split('>')[1]
        // .split('<')[0]
}


async function shikimoriParser(tp, url) {
    let page = await tp.obsidian.request(url)
        .then((res) => { return res })
        .catch((err) => { return null })
    if (page == null || page.includes("18+")) return null
    let title = getTitle(page)
    let desc = getDescription(page)
    let imageLink = getImageLink(page)
    let year = getYear(page)
    let rating = getRating(page)
    return { title, desc, imageLink, year, rating }
}
module.exports = shikimoriParser
