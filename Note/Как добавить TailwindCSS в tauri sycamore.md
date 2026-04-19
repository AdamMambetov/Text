---
category:
  - "[[Программирование]]"
meta:
  - "[[Rust]]"
---
В `crates/ui` выполнить:

```bash
npm init -y
npm npm install -D tailwindcss @tailwindcss/cli
```

---

Создать файл `input.css` и `output.css` в `crates/ui/styles/`.

Добавить в `input.css`
```css
@import "tailwindcss";
```

---

В `index.html` добавить
```html
<link data-trunk rel="css" href="styles/output.css" />
```

---

В `package.json` поменять блок `scripts` на:
```json
"scripts": {
	"tailwind:dev": "npx @tailwindcss/cli -i ./styles/input.css -o ./styles/output.css --watch",

	"tailwind:build": "npx tailwindcss -i ./ui/styles/input.css -o ./ui/styles/output.css --minify"
},
```

---

В `gilvave.code-workspace` добавить таску:
```
{
	"label": "Tailwind CSS",
	"command": "cd ${workspaceFolder}/ui/ ; npm run tailwind:dev",
	"type": "shell",
	"group": "build"
}
```

