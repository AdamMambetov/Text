---
created: 2024-06-07T15:32:00
modified: 2025-04-11T23:13:05+03:00
category:
  - "[[Программирование]]"
creator:
  - "[[@Адам Мамбетов|Я]]"
meta:
  - "[[Unreal Engine]]"
  - "[[C++]]"
---

# Baffle

Моя игра-головоломка. В ней игрок находится в башне с большим количеством комнат-локаций. Задача выбраться из башни. В зависимости от решения головоломок будут открываться разные комнаты. Игра от первого лица.

Для названия игры я использовал синоним слова "puzzle". Гугл переводчик выдал "Baffle", что переводится как "Ставить в тупик".

Игра будет написана на [[Unreal Engine| UE 5.2]] на [[C++]] с минимумом Blueprint кода. Постараюсь весь код писать сам, не используя плагинов из Epic Games Store. Буду следовать [стайл гайду](https://github.com/CosmoMyzrailGorynych/ue4-style-guide-rus/blob/master/README.md).

## Идеи
1. В зависимости от того, как игрок прошёл [[Baffle Level 01 | 1 уровень]] будет 2 основных пути. Первый - нормальный, а второй - инвертированный.
2. Основное правило - все проходы должны быть видны. Никаких скрытых дверей.
3. Можно брать идеи и правила из Чаек, детективов и игр не зависящих от рандома. Также можно брать идеи из игр в жанре квест.
4. Если в уровне присутствуют NPC, то они должны либо давать игроку информацию (полезную/бессмысленную) либо предметы (полезные/бессмысленные). Ничего более.
5. Загадки с вариантами ответов можно использовать в качестве гарантированного прохождения уровня.

## Что может пригодиться
 - 4 IN 1 Modular Research Facility / Mega Bundle
	 - Куча моделей окружения и зданий
 - Advanced Village Pack
	 - Модели для деревни
 - Apartment Tech Props
	 - Модели компьютерной техники и другой офисной аппаратуры
 - Arch Vis Polish Pack #2
	 - Модели зеркал и маленьких украшений в советском стиле
 - Archviz Interior vol.3
	 - Интерьер современной квартиры
 - Bank Building / Bank Interior + ULAT ( Modular Bank, Bank )
	 - Интерьер очень дорогого банка
 - Brutalist Architecture Office
	 - Интерьер очень дорогого офиса
 - Bunker
	 - Модели для бункера
 - City of Brass: Environments
	 - Модель города в арабском стиле
 - CLOTHING AND SHOE STORES
	 - Модели для магазина одежды и обуви
 - Deep Elder Caves
	 - Модели для пещеры
 - Dreamscape: Stylized Environment Meadows - Stylized Nature Open World Fantasy
	 - Модели луга в мультяшном стиле
 - Dreamscape: Stylized Environment Tower - Stylized Nature Open World Fantasy
	 - Модели для башни в мультяшном стиле
 - Edith Finch: Barbara Room
	 - Модели для небольшой комнаты и бункера
 - Edith Finch: House and Common Areas
	 - Модели предметов для дома
 - Elite Landscapes: Bundle Pack
	 - Очень красивые ландскейпы
 - Fantasy Bundle Environment Kit 3 in 1
	 - Куча моделей для средневековой деревни и крепости
 - Fantasy Interior Environment
	 - Модели интерьера для средневекового дома
 - Gladiator Arena Environment Kit
	 - Модели для гладиаторской арены
 - Greek Island
	 - Модели греческого острова
 - Greenwood Fantasy Village
	 - Модели деревни в мультяшном стиле
 - Infinity Blade: Castle
	 - Модель замка
 - Infinity Blade: Hideout
	 - Модели для пещеры, подземелья и какие-то модели сверх-технологий
 - Isometric - Interiors
	 - Модели для изометрической комнаты в мультяшном стиле
 - Ithris Cemetery
	 - Модели кладбища
 - Log Cabin
	 - Модель дома древних русов
 - Low Poly Medieval Interior and Constructions
 - Low Poly Style Deluxe 2: Tropical Environment
 - Low Poly Town
 - Low Poly Viking Top-Down Interiors
 - Low Poly Viking World
 - Lowpoly Alchemist's House
 - Lowpoly Style Asia Environment
 - LUSH: Stylized Environment Set
	 - Модели луга в мультяшном стиле
 - Stylized Modular Crystal Mine
 - Underground Subway
	 - Модели заброшенного здания
 - Vintage Room
 - Ancient Treasures
	 - Модели древних сокровищ
 - FANTASTIC - Village Pack
	 - Модели деревни в мультяшном стиле
 - Ultimate FPS Puzzle Kit
	 - Blueprint код для создания головоломок.
