```dataviewjs
dv.list(dv.pages().filter(p => !p.file.path.contains('/') || p.file.aliases == null).sort(p => p.file.aliases, 'asc').map(p => p.file.link + p.file.aliases).limit(50))
```