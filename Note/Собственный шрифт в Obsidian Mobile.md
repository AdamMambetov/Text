---
created: 2024-07-01T20:15:34+03:00
modified: 2025-06-19T14:31:55+03:00
issue:
  - "[[Собственный шрифт в Obsidian Mobile]]"
meta:
  - "[[Obsidian]]"
source: https://forum.obsidian.md/t/adding-a-custom-font-to-android-ios/68045
---

# Собственный шрифт в Obsidian Mobile

>[!cite]- Оригинал
> Hi, I want to share how I added a custom font to Android/iOS devices. This technique employs Obsidian’s CSS snippet feature so you do not need to install or create a custom theme.
> 1. You need a WOFF2 file for your custom font. If you only have TTF file or something, convert them to WOFF2. There are plenty of tools online to do this.
> 2. Convert WOFF2 to base64-encoded string and embed it in `fonts.css` file (you can name this file as you want). You can do this on [https://hellogreg.github.io/woff2base/ 590](https://hellogreg.github.io/woff2base/). Copy the generated string to your CSS file.
> 3. Add your `fonts.css` under `.obsidian/snippets/` folder.
> 4. Open Obsidian and go to **Settings > Appearance > CSS snippets** and enable your `fonts.css`.
> 5. Now Obsidian will recognize your custom font even if your phone does not have it. You can go to **Settings > Appearance > Font** and change the font to yours.
> 
> If Obsidian does not recognize your font, check the `font-family` property in your `fonts.css`. `font-familiy` property and **Settings > Appearance > Font** setting must exactly match.


>[!cite]- Перевод
> Привет, я хочу рассказать, как я добавил собственный шрифт на устройства Android/iOS. В этом методе используется функция фрагментов CSS Obsidian, поэтому вам не нужно устанавливать или создавать собственную тему.
> 1. Вам понадобится файл WOFF2 для вашего пользовательского шрифта. Если у вас есть только файл TTF или что-то в этом роде, преобразуйте их в WOFF2. Для этого в Интернете есть множество инструментов.
> 2. Преобразуйте WOFF2 в строку в кодировке Base64 и вставьте ее в `fonts.css`файл (вы можете назвать этот файл по своему усмотрению). Вы можете сделать это на [https://hellogreg.github.io/woff2base/. 590](https://hellogreg.github.io/woff2base/). Скопируйте сгенерированную строку в свой CSS-файл.
> 3. Добавьте свою `fonts.css`нижнюю `.obsidian/snippets/`папку.
> 4. Откройте Obsidian, перейдите в **«Настройки» > «Внешний вид» > «Фрагменты CSS»** и включите расширение `fonts.css`.
> 5. Теперь Obsidian распознает ваш собственный шрифт, даже если на вашем телефоне его нет. Вы можете зайти в **«Настройки» > «Внешний вид» > «Шрифт»** и изменить шрифт на свой.
>  
> Если Obsidian не распознает ваш шрифт, проверьте это `font-family`свойство в вашем `fonts.css`. `font-familiy`Свойство и **настройки «Настройки» > «Внешний вид» > «Шрифт»** должны точно совпадать.