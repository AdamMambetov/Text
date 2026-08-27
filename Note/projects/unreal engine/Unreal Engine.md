---
created: 2024-07-17T16:06:20+03:00
aliases:
  - UE4
  - UE5
  - Unreal Engine 4
  - Unreal Engine 5
category:
  - "[[Программирование]]"
---

# Unreal Engine

 - [Project Guide Style](https://github.com/CosmoMyzrailGorynych/ue4-style-guide-rus/blob/master/README.md)  
 - [Группа ВК Работа в геймдеве](https://m.vk.com/rabota_v_gamedeve?from=group)  
 - [Free Assets](https://gameassetsfree.com)  
 - [Unreal UI Best Practices - ben🌱ui](https://benui.ca/unreal/ui-best-practices)
 - [blueprintUE](https://blueprintue.com)
 - [ТГ GameDev Assets](https://t.me/GameDevAssets)
 - [ТГ CGSENSEI](https://t.me/cgsensei_academy)
 - [ТГ CGPlugins](https://t.me/cgplugin)
 - [ТГ Files каналов CGPlugins и CG Курсы](https://t.me/filescp)
 - [ТГ Unreal3DFree Unreal Engine Assets](https://t.me/Unreal3DFree)
 - [ТГ Unreal Engine](https://t.me/unrealenginecis)
 - [ТГ LifeEXE | Unreal Engine | CG](https://t.me/LifeExeCode)
 - [Спираченные ассеты](https://docs.google.com/spreadsheets/d/1XffjhGlV0h-RixtoivTVb5znDB1JALEwLrzIzav85_E/htmlview#)

В 5.3 появилась возможность менять спецификатор доступа у эвентов (можно сделать их public/protected/private)

> Unreal Assistant: внутри editor не использую. использую с сайта епиков.  
ему надо давать нормальный развернутый контекст его роли типа такого:  
"Контекст: ты опытный и талантливый эксперт разработчик игр на unreal engine 5.6 для ПК и консолей, имеющего опыт работы как в инди-студии Так и в ААА студии, как на с++, так и на блюпринтах. Blueprint-C++ Hybrid Workflow Современный стандарт unreal engine 5.6+ Прежде чем ответить, оцени свою неопределенность, если она выше 0.1, задай мне дополнительные уточняющие вопросы, пока неопределенность не будет <0.1 ЗАПРОС:"  
и тогда как справочник он неплохо справляется.

## Как сбилдить плагин

```bash
<PathToUE>\Engine\Build\BatchFiles\RunUAT.bat BuildPlugin -Plugin="<PathToPlugin>" -Package="<PathToOutput>" -Rocket -TargetPlatforms=Win64
```

Пример:
```bash
C:\UnrealEngine\Binary\UE_5.5\Engine\Build\BatchFiles\RunUAT.bat BuildPlugin -Plugin="F:\Plugins55\TempPlugins\RuleProcessor\RuleProcessor.uplugin" -Package="F:\Plugins55\PackedPlugins_55\RuleProcessor" -Rocket -TargetPlatforms=Win64
```

`-Rocket` - сбилдить для использования в блюпринтовых проектах

Если этот плагин требует другой плагин, то надо сначала сбилдить требуемый плагин, затем поместить его в папку с плагинами движка.

## Как собрать бинарную версию движка из исходников

```bash
./Engine/Build/BatchFiles/RunUAT.sh BuildGraph -target="Make Installed Build Linux" -script="Engine/Build/InstalledEngineBuild.xml" -clean
```

## Всякое

![[photo_382406_285 - 20231203174627180.jpg]]

![[photo_382406_284 - 20231203174627569.jpg]]

## Мемы

![[блупринты.png]]

## Лучшее
 - [[Отличия делегатов в Unreal Engine]]
 - [[Unreal Engine Step-by-Step.pdf]]
