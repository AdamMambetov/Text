<% "---" %>
<%*
dv = app.plugins.plugins.dataview.api

let title = tp.file.title
let albumName = title
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
let num = dv.pages('"Albums"').length
await tp.file.rename(`${albumName} (📀 ${num})`)

tR += `created: ${tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ")}\n`
tR += `aliases:\n`
tR += `  - "${title}"\n`
tR += `Cover: "[[_No Album Art.jpg]]"\n`
tR += `Year: 0\n`
tR += `Creators: []\n`
tR += `tracklist: []\n`
-%>
<% "---" %>

# <% title %>

## Tracklist

![[tracklist.base]]
