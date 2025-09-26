async function parseJson(path, tp) {
    const file = tp.app.vault.getFileByPath(path)
    const text = await tp.app.vault.cachedRead(file)
    return JSON.parse(text)
}

async function loadAnimes(tp) {
    const dataPath = "Text/Note/scripts/Kondor342_animes.json"
    const dataXmlPath = "Text/Note/scripts/animes_xml.json"
    let data = await parseJson(dataPath, tp)
    let dataXml = await parseJson(dataXmlPath, tp)
    let result = Array()

    for (let i = 0; i < dataXml.length; i++) {
        result.push({
            title: data[i].target_title,
            title_ru: data[i].target_title_ru,
            status: data[i].status,
            rewatches: data[i].rewatches,
            episode: data[i].episodes,
            type: dataXml[i].series_type,
            id: data[i].target_id,
        })
    }
    return result
}

function shikimoriJsonParser() {
    return { loadAnimes }
}
module.exports = shikimoriJsonParser
