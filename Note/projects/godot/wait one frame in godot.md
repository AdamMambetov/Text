---
created: 2024-05-08T14:01:51+03:00
aliases:
  - godot next tick
category:
  - "[[Программирование]]"
creator:
  - "[[@Адам Мамбетов|Я]]"
issue:
  - "[[wait one frame in godot]]"
meta:
  - "[[Godot]]"
---

# Godot 3.5
```gdscript
yield(get_tree(), "idle_frame")
```

```gdscript
yield(VisualServer, "frame_pre_draw")
```

# Godot 4.x
```gdscript
await get_tree().process_frame
```
