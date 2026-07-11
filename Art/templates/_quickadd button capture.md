```js quickadd
function createBtn(index, action) {
        let result = ""
  result += "\`\`\`button" + "\n"
  result += "name " + linkInfo.buttons[index] + "\n"
  result += "type link" + "\n"
  result += "action " + action + "\n"
  
  // colors
  switch (linkInfo.names[index]) {
    case "shikimori":
      result += "customColor \#4682b4" + "\n"
      break;
    case "tvTime":
      result += "customColor \#997f00" + "\n"
      break;
    case "worldArt":
      result += "customColor \#7a0000" + "\n"
      break;
    case "onikes":
      result += "color purple" + "\n"
      break;
    case "kesidatokioVods":
      result += "color purple" + "\n"
      result += "customTextColor black" + "\n"
      break;
    case "animeFillerList":
      result += "customColor \#da5100" + "\n"
      break;
    case "mangalib":
      result += "customColor \#252527" + "\n"
                        result += "customTextColor \#b6720f" + "\n"
      break;
    case "ranobelib":
      result += "customColor \#252527" + "\n"
                        result += "customTextColor \#2196f3" + "\n"
      break;
    case "animelib":
      result += "customColor \#252527" + "\n"
                        result += "customTextColor \#7E57C2" + "\n"
      break;
    case "senkuro":
      result += "customColor \#191A21" + "\n"
      break;
    case "reyohoho":
      result += "customColor \#1c1c1c" + "\n"
      break;
    case "freetp":
      result += "color green" + "\n"
      result += "customTextColor black" + "\n"
      break;
    case "steam":
      result += "customColor #133C6F" + "\n"
      result += "textColor white" + "\n"
      break;
  }
  result += "hidden true" + "\n"  
  result += "\`\`\`" + "\n"
  result += "^button-" + linkInfo.names[index] + "\n\n"
        return result
}

const linkInfo = {
  links: ["https://shikimori.one/", "https://www.tvtime.com/", "http://www.world-art.ru/", "https://onikes.ru/", "https://yo8z6gv.github.io/", "https://www.animefillerlist.com/", "https://mangalib.me/", "https://ranobelib.me/", "https://anilib.me/", "https://senkuro.com/", "https://reyohoho.github.io/reyohoho/", "https://freetp.org/", "https://store.steampowered.com/"],
  names: ["shikimori", "tvTime", "worldArt", "onikes", "kesidatokioVods", "animeFillerList", "mangalib", "ranobelib", "animelib", "senkuro", "reyohoho", "freetp", "steam"],
  buttons: ["Shikimori", "TV Time", "World Art", "ONIKES", "KESIDATOKIO VOD'S", "Anime Filler List", "MangaLib", "RanobeLib", "AnimeLib", "Senkuro", "ReYohoho", "FreeTP", "Steam"],
}

const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm('button-form');
const links = result.asString("{{Links}}").split(",")
let returnValue = ""

for (let i = 0; i < links.length; i++) {
  let index = linkInfo.links.findIndex(link => links[i].includes(link))
  if (index == -1) {
    returnValue += "Not found link " + links[i] + "\n\n"
    continue
  }
  returnValue += createBtn(index, links[i])
}

for (let i = 0; i < links.length; i++) {
  let index = linkInfo.links.findIndex(link => links[i].includes(link))
  if (index == -1) {
    returnValue += "Not found link " + links[i] + "\n\n"
    continue
  }
  if (i % 2 == 0)
    returnValue += `\n\n\`button-${linkInfo.names[index]}\``
  else
    returnValue += ` \`button-${linkInfo.names[index]}\``
}
return returnValue
```