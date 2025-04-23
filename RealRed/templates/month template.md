---
year: '[[<% tp.date.now("YYYY") %>]]'
next_month: '[[<% tp.date.now("YYYY-MM", "P1M") %>]]'
---


# <% tp.date.now("YYYY-MM") %>

## Задачи на месяц

```dataview
task
FROM [[]]
GROUP BY file.link
```
