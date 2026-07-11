<% "---" %>
<%*
dv = app.plugins.plugins.dataview.api

let title = tp.file.title
let num = dv.pages('"Music/Creators"').length
await tp.file.rename(`${title} (🎙️ ${num})`)

tR += `created: ${tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ")}\n`
tR += `aliases:\n`
tR += `  - "${title}"\n`
tR += `ListenInSec: 0\n`
-%>
<% "---" %>

# <% title %>

## Tracklist

![[tracklist.base]]
