<%*
dv = app.plugins.plugins.dataview.api

let pages = dv.pages('"Music/Tracks"')
	.sort(p => p.created, "desc")

new Notice(`Начинаю обработку ${pages.length} файлов...`);

for (const p of pages) {
	let file = tp.file.find_tfile(p.file.path)
	await app.workspace.openLinkText(file.path, "", false);
	await new Promise(resolve => setTimeout(resolve, 300));
	await app.commands.executeCommandById("linter:lint-file");
}
new Notice("Готово!");
-%>