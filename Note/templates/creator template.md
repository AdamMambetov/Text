<% "---" %>
<%*
let title = tp.file.title

let num = dv.pages('"Text/Music/Creators"').length
let name = `${title} (🎙️ ${num})`
await tp.file.rename(name)

tR += `created: ${tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ")}\n`
tR += `aliases: ["${title}"]\n`
tR += `ListenInSec: 0\n`
-%>
<% "---" %>

# <% title %>

## Tracklist

![[tracklist.base]]
