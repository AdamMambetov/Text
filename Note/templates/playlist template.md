<% "---" %>
<%*
dv = app.plugins.plugins.dataview.api

let title = tp.file.title
let playlistName = title
	.replaceAll("?", "")
	.replaceAll("#", "")
	.replaceAll("/", "")
	.replaceAll("\\", "")
	.replaceAll("\"", "'")
let num = dv.pages('"Music/Playlists"').length
await tp.file.rename(`${playlistName} (💿 ${num})`)

tR += `created: ${tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ")}\n`
tR += `aliases:\n`
tR += `  - "${title}"\n`
tR += `tracklist: []\n`
-%>
<% "---" %>

# <% title %>

## Tracklist

![[tracklist.base]]
