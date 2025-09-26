---
created: 2024-12-23T21:59:28+03:00
modified: 2025-04-11T23:28:32+03:00
category:
  - "[[Программирование]]"
meta:
  - "[[Unreal Engine]]"
related:
  - "[[Fallen Refuge]]"
---

# Ошибка change 2.3.11
```
LoginId:6558ef3e4b06ed3f79ee2b8874c77769
EpicAccountId:9517053e04d64bfdab39d7c83e6241c6

Assertion failed: Index >= 0 [File:D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Public\UObject\UObjectAnnotation.h] [Line: 806]

UnrealEditor_CoreUObject!UObjectBaseUtility::GetLinker() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\UObjectLinker.cpp:165]
UnrealEditor_CoreUObject!PreloadInnerStructMembers() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\PropertyStruct.cpp:27]
UnrealEditor_CoreUObject!FStructProperty::Serialize() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\PropertyStruct.cpp:242]
UnrealEditor_CoreUObject!UStruct::SerializeProperties() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\Class.cpp:1797]
UnrealEditor_CoreUObject!UStruct::Serialize() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\Class.cpp:1875]
UnrealEditor_CoreUObject!UFunction::Serialize() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\Class.cpp:6424]
UnrealEditor_CoreUObject!StaticDuplicateObjectEx() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\UObjectGlobals.cpp:2961]
UnrealEditor_CoreUObject!StaticDuplicateObject() [D:\build\++UE5\Sync\Engine\Source\Runtime\CoreUObject\Private\UObject\UObjectGlobals.cpp:2848]
UnrealEditor_UnrealEd!FBlueprintCompileReinstancer::MoveDependentSkelToReinst() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\Kismet2\KismetReinstanceUtilities.cpp:1675]
UnrealEditor_Kismet!FBlueprintCompilationManagerImpl::FlushCompilationQueueImpl() [D:\build\++UE5\Sync\Engine\Source\Editor\Kismet\Private\BlueprintCompilationManager.cpp:968]
UnrealEditor_Kismet!FBlueprintCompilationManagerImpl::CompileSynchronouslyImpl() [D:\build\++UE5\Sync\Engine\Source\Editor\Kismet\Private\BlueprintCompilationManager.cpp:287]
UnrealEditor_Kismet!FBlueprintCompilationManager::CompileSynchronously() [D:\build\++UE5\Sync\Engine\Source\Editor\Kismet\Private\BlueprintCompilationManager.cpp:3370]
UnrealEditor_UnrealEd!FKismetEditorUtilities::CompileBlueprint() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\Kismet2\Kismet2.cpp:763]
UnrealEditor_UnrealEd!FInternalPlayLevelUtils::ResolveDirtyBlueprints() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\PlayLevel.cpp:1397]
UnrealEditor_UnrealEd!UEditorEngine::StartPlayInEditorSession() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\PlayLevel.cpp:2706]
UnrealEditor_UnrealEd!UEditorEngine::StartQueuedPlaySessionRequestImpl() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\PlayLevel.cpp:1257]
UnrealEditor_UnrealEd!UEditorEngine::StartQueuedPlaySessionRequest() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\PlayLevel.cpp:1160]
UnrealEditor_UnrealEd!UEditorEngine::Tick() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\EditorEngine.cpp:1792]
UnrealEditor_UnrealEd!UUnrealEdEngine::Tick() [D:\build\++UE5\Sync\Engine\Source\Editor\UnrealEd\Private\UnrealEdEngine.cpp:519]
UnrealEditor!FEngineLoop::Tick() [D:\build\++UE5\Sync\Engine\Source\Runtime\Launch\Private\LaunchEngineLoop.cpp:5812]
UnrealEditor!GuardedMain() [D:\build\++UE5\Sync\Engine\Source\Runtime\Launch\Private\Launch.cpp:188]
UnrealEditor!GuardedMainWrapper() [D:\build\++UE5\Sync\Engine\Source\Runtime\Launch\Private\Windows\LaunchWindows.cpp:107]
UnrealEditor!LaunchWindowsStartup() [D:\build\++UE5\Sync\Engine\Source\Runtime\Launch\Private\Windows\LaunchWindows.cpp:244]
UnrealEditor!WinMain() [D:\build\++UE5\Sync\Engine\Source\Runtime\Launch\Private\Windows\LaunchWindows.cpp:284]
UnrealEditor!__scrt_common_main_seh() [D:\a\_work\1\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:288]
kernel32
ntdll
```