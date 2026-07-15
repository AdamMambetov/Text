<%*
const folderPath = "Music/Tracks";
const folder = app.vault.getAbstractFileByPath(folderPath);

if (!folder || !folder.children) {
	new Notice("Папка не найдена");
	return;
}
const files = folder.children.filter(f => f.extension === "md");
new Notice(`Начинаю обработку ${files.length} файлов...`);

for (const file of files) {
	await app.workspace.openLinkText(file.path, "", false);
	await new Promise(resolve => setTimeout(resolve, 300));
	await app.commands.executeCommandById("linter:lint-file");
}
new Notice("Готово!");
-%>