---
год: '[[<% tp.date.now("YYYY") %>]]'
след_месяц: '[[<% tp.date.now("YYYY-MM", "P1M") %>]]'
---


# <% tp.date.now("YYYY-MM") %>

## Задачи на месяц

```dataview
task
FROM [[]]
GROUP BY file.link
```
