---
created: <% tp.date.now("YYYY-MM-DD[T]HH:mm:ssZ") %>
aliases:
  - "{{value}}"
ListenInSec: 0
---

# {{value}}

## Tracklist

```base
views:
  - type: table
    name: Table
    filters:
      and:
        - file.path.contains("Tracks")
        - file.properties.Creators.contains(this.file)

```
