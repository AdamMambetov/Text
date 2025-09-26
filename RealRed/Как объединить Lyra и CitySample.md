---
source: https://forums.unrealengine.com/t/how-do-i-combine-lyra-the-matrix-city-sample/536848/4
category:
  - "[[Программирование]]"
meta:
  - "[[Unreal Engine]]"
---

# Как объединить Lyra и CitySample

## На английском

It’s not a video, but here are the steps I took to get Lyra + City Sample working. **I’m not sure if all of these steps are actually required.**

- Assume you have projects called CitySample and LyraStarterGame created
- Copy CitySample\Content to LyraStarterGame\Content, skipping duplicates
    - I made note of the duplicates and copied them to LyraStarterGame\Content\CitySampleContent
- Copy CitySample\Source to LyraStarterGame\Source
- Copy CitySample\Plugins to LyraStarterGame\Plugins
- Move “InputCore” from PrivateDependencyModuleNames to PublicDependencyModuleNames in LyraStarterGame\Source\LyraGame\LyraGame.Build.cs
- Update LyraStarterGame.uproject to merge Plugins and Modules from CitySample.uproject
    - If you don’t want to do this yourself, replace LyraStarteGame.uproject with this file:  
        [LyraStarterGame.uproject](https://forums.unrealengine.com/uploads/short-url/uitSYKM3LkAg1b4yrNeLZl9j3W0.uproject) (7.6 KB)[^1]
- In File Explorer, right click LyraStarterGame.uproject > Generate Visual Studio project files
- Open and build the generated Visual Studio solution
- Open the Lyra project in UE5
- Open Big_City_LVL.umap or Small_City_LVL.umap under Map folder
- In Content/Vehicle/Blueprint/BP_VehicleBase_Drivable.uasset I had some compilation errors. To fix, I clicked on link to node in the error message and right clicked the node > Refresh Nodes, then compile and save
- There will be a lot of warnings like the following which I just ignored for now:
    - `LogGameplayTags: Warning: [AssetLog] D:\UE5\LyraStarterGame\Content\UI\Blueprints\OptionsMenu\BP_CitySampleOptions_World.uasset: Invalid GameplayTag Soundscape.Mass.Crowds found in object K2Node_CallFunction_18.`
- At this point if you try to play in editor, it will crash with the error below. The back trace includes UnrealEditor_MassEntity so that gave me the idea to just delete all items related to the MassEntity framework from the map. I list them below.
    - `Assertion failed: PerInstanceSMCustomData.Num() == (NumCustomDataFloats * PerInstanceSMData.Num()) [File:D:\build++UE5\Sync\Engine\Source\Runtime\Engine\Private\InstancedStaticMesh.cpp] [Line: 3652]`
    - Items to delete:
        - BP_MassCrowdSpawner
        - BP_MassTrafficIntersectionSpawner
        - BP_MassTrafficParkedVehicleSpawner
        - BP_MassTrafficTrailerSpawner
        - BP_MassTrafficVehicleSpawner
        - MassDebugVisualizer
        - MassVisualizer
        - MassVisualizer1
- In World Settings
    - Change Default Gameplay Experience to B_ShooterGame_Elimination
    - Change GameMode Override to None
- The remaining steps are outlined in [this video](https://youtu.be/Fj1zCsYydD8?t=1678) from Epic on how to create a new map for Lyra, but the summary is:
    - Add LyraPlayerStart items to the map
    - If you want Bots:
        - Add a NavMeshBoundsVolume (for AI to move around the level)
        - In Editor Preferences > Lyra Developer Settings, make sure Override Num Player Bots to Spawn is either not checked or greater than 0

Note there’s a bunch of other warnings and validation failures you’ll get during development and play which don’t seem to break the game. If I have time I’ll try to fix those and report back.


## На русском

Это не видео, но вот шаги, которые я предпринял, чтобы Lyra + City Sample заработали. **Я не уверен, что все эти шаги действительно необходимы.**

- Предположим, у вас есть проекты CitySample и LyraStarterGame.
- Копировать CitySample\Content в LyraStarterGame\Content, пропуская дубликаты.
    - Я записал дубликаты и скопировал их в LyraStarterGame\Content\CitySampleContent.
- Копировать CitySample\Source в LyraStarterGame\Source
- Скопируйте CitySample\Plugins в LyraStarterGame\Plugins
- Переместить «InputCore» из PrivateDependencyModuleNames в PublicDependencyModuleNames в LyraStarterGame\Source\LyraGame\LyraGame.Build.cs
- Обновите LyraStarterGame.uproject, чтобы объединить плагины и модули из CitySample.uproject.
    - Если вы не хотите делать это самостоятельно, замените LyraStarteGame.uproject этим файлом:  
        [LyraStarterGame.uproject](https://forums.unrealengine.com/uploads/short-url/uitSYKM3LkAg1b4yrNeLZl9j3W0.uproject) (7,6 КБ)
- В проводнике щелкните правой кнопкой мыши LyraStarterGame.uproject > Сгенерировать файлы проекта Visual Studio.
- Откройте и соберите сгенерированное решение Visual Studio.
- Откройте проект Lyra в UE5
- Откройте Big_City_LVL.umap или Small_City_LVL.umap в папке «Карта».
- В Content/Vehicle/Blueprint/BP_VehicleBase_Drivable.uasset у меня были некоторые ошибки компиляции. Чтобы исправить, я нажал на ссылку на узел в сообщении об ошибке и нажал правой кнопкой мыши на узел > Обновить узлы, затем скомпилировать и сохранить
- Будет много предупреждений, подобных следующему, которые я пока проигнорировал:
    - `LogGameplayTags: Warning: [AssetLog] D:\UE5\LyraStarterGame\Content\UI\Blueprints\OptionsMenu\BP_CitySampleOptions_World.uasset: Invalid GameplayTag Soundscape.Mass.Crowds found in object K2Node_CallFunction_18.`
- На этом этапе, если вы попытаетесь играть в редакторе, он вылетит с ошибкой ниже. Обратная трассировка включает UnrealEditor_MassEntity, поэтому у меня возникла идея просто удалить все элементы, связанные с фреймворком MassEntity, с карты. Я перечислю их ниже.
    - `Assertion failed: PerInstanceSMCustomData.Num() == (NumCustomDataFloats * PerInstanceSMData.Num()) [File:D:\build++UE5\Sync\Engine\Source\Runtime\Engine\Private\InstancedStaticMesh.cpp] [Line: 3652]`
    - Элементы для удаления:
        - BP_MassCrowdSpawner
        - BP_MassTrafficIntersectionSpawner
        - BP_MassTrafficParkedVehicleSpawner
        - BP_MassTrafficTrailerSpawner
        - BP_MassTrafficVehicleSpawner
        - MassDebugVisualizer
        - MassVisualizer
        - MassVisualizer1
- В настройках мира
    - Изменить Default Gameplay Experience на B_ShooterGame_Elimination
    - Измените GameMode Override на None
- Оставшиеся шаги описаны в [этом видео](https://youtu.be/Fj1zCsYydD8?t=1678) от Epic о том, как создать новую карту для Лиры, но вкратце это так:
    - Добавить элементы LyraPlayerStart на карту
    - Если вам нужны боты:
        - Добавьте NavMeshBoundsVolume (для перемещения ИИ по уровню)
        - В настройках редактора > Настройки разработчика Lyra убедитесь, что параметр Override Num Player Bots to Spawn не отмечен или больше 0.

Обратите внимание, что есть куча других предупреждений и сбоев проверки, которые вы получите во время разработки и игры, которые, похоже, не сломают игру. Если у меня будет время, я постараюсь исправить их и отчитаюсь.

[^1]: [[LyraCityUproject]]
