---
created: 2025-04-05T14:29:20+03:00
modified: 2025-04-11T22:11:30+03:00
category:
  - "[[Программирование]]"
creator:
  - "[[@Адам Мамбетов|Я]]"
issue:
  - "[[loading gameplay tags from plugin .ini files]]"
meta:
  - "[[C++]]"
  - "[[Unreal Engine]]"
---

# loading gameplay tags from plugin .ini files
Нашёл способ который позволяет добавлять тэги из плагинов.
 1. В файле *PluginName.Build.cs* надо добавить модуль *Projects*:
``` cpp
PublicDependencyModuleNames.AddRange(new string[]
{
	"GameplayTags", /* Для исползования UGameplayTagsManager */
	"Projects",     /* Для исползования IPluginManager */
}
```

 2. В файле *PluginName.cpp* надо написать код, который будет смотреть все *.ini* файлы в плагине:
``` cpp
#include "Interfaces/IPluginManager.h"
#include "GameplayTagsManager.h"

void FPluginNameModule::StartupModule()
{
	TSharedPtr<IPlugin> ThisPlugin = IPluginManager::Get().FindPlugin(TEXT("BaseGame"));
	check(ThisPlugin.IsValid());
	
	UGameplayTagsManager::Get().AddTagIniSearchPath(ThisPlugin->GetBaseDir() / TEXT("Config") / TEXT("Tags"));
}
```

 3. Теперь можно создавать свои тэги в плагине по пути `ProjectName/Plugins/PluginName/Config/Tags/SomeTags.ini`. Пример файла:
``` ini
[/Script/GameplayTags.GameplayTagsList]
GameplayTagList=(Tag="Spell.Fireball",DevComment="")
```
