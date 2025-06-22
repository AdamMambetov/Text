---
created: 2025-03-18T20:33:10+03:00
modified: 2025-04-11T23:30:19+03:00
meta:
  - "[[Unreal Engine]]"
source: https://dtf.ru/howto/3275813-vsem-privet-hochu-podelitsya-s-vami-kak-chinit-prosto-i-bystro-bolshuyu-chast-ue4-ue5-igr
---

# Статтеры в играх на Unreal Engine

## Фикс компиляции шейдеров

Переходим по пути:
```
C:\Users\%username%\AppData\Local\издатель(или Игра)\saved\config\WindowsNoEditor\Engine.ini
```

Копируем наш `Engine.ini` в любое место (бэкап грубо говоря), и вставляем в этот файл всё то, что указано ниже.

```
[SystemSettings]
niagara.CreateShadersOnLoad=1
D3D12.PSO.DriverOptimizedDiskCache=1
D3D12.InsertOuterOcclusionQuery=1
D3D12.MaximumFrameLatency=3
D3D12.AFRUseFramePacing=1
D3D12.SyncThreshold=999
D3D12.PSO.DiskCache=1
memory.logGenericPlatformMemoryStats=0
fx.ParticlePerfStats.Enabled=false
FX.MaxCPUParticlesPerEmitter=500
fx.EnableCircularAnimTrailDump=0
fx.Niagara.DebugDraw.Enabled=0
FX.BatchAsyncBatchSize=8
FX.EarlyScheduleAsync=1
FX.BatchAsync=1
RHI.MaximumFrameLatency=3
RHI.SyncWithDWM=0

[/Script/Engine.RendererSettings]
r.ShaderPipelineCache.LazyLoadShadersWhenPSOCacheIsPresent=1
r.ShaderPipelineCache.AlwaysGenerateOSCache=0
r.ShaderPipelineCache.GameFileMaskEnabled=1
r.ShaderPipelineCache.PreOptimizeEnabled=1
r.ShaderPipelineCache.SaveBoundPSOLog=1
r.ShaderPipelineCache.SaveUserCache=1
r.ShaderPipelineCache.StartupMode=2
r.ShaderPipelineCache.ReportPSO=0
r.ShaderComplexity.CacheShaders=1
r.CompileShadersForDevelopment=0
r.ShaderPipelineCache.Enabled=1
r.AsyncPipelineCompile=1
r.CreateShadersOnLoad=1
r.Shaders.Optimize=1
r.Shaders.FastMath=1
r.ShaderPipelines=1
r.Streaming.FullyLoadUsedTextures=0
r.Streaming.LimitPoolSizeToVRAM=1
r.Streaming.UseFixedPoolSize=0
r.Streaming.HLODStrategy=0
r.Streaming.UseAllMips=1
r.Streaming.PoolSize=896
r.Streaming.MinBoost=1
r.TextureStreaming=1
r.Streaming.Boost=6

[/Script/Engine.StreamingSettings]
s.LevelStreamingComponentsUnregistrationGranularity=1
s.LevelStreamingComponentsRegistrationGranularity=1
s.PriorityLevelStreamingActorsUpdateExtraTime=0
s.LevelStreamingActorsUpdateTimeLimit=2
s.MinBulkDataSizeForAsyncLoading=0
s.UnregisterComponentsTimeLimit=2
s.PriorityAsyncLoadingExtraTime=0
s.AsyncLoadingUseFullTimeLimit=0
s.ForceGCAfterLevelStreamedOut=0
s.MaxIncomingRequestsToStall=0
s.AsyncLoadingThreadEnabled=1
s.IoDispatcherCacheSizeMB=256
s.AsyncLoadingTimeLimit=4

[/Script/Engine.GarbageCollectionSettings]
gc.MultithreadedDestructionEnabled=1

[ConsoleVariables]
bOptimizeAnimBlueprintMemberVariableAccess=1
bAllowMultiThreadedAnimationUpdate=1
bAllowMultiThreadedShaderCompile=1
bEnableMultiCoreRendering=1
UseAllCores=1

[Core.Log]
LogLinker=All Off
Global=Off

[Core.System]
+Suppress=Scriptwarning
+Suppress=Scriptlog
+Suppress=Warning
+Suppress=Error
```

Желательно для Engine.ini выставить атрибут "Только чтение".

Так же, умельцы этого способ выкатили ультимативный [сайт](https://api.dtf.ru/v2.8/redirect?to=https%3A%2F%2Fxhybred.github.io%2FUE5-Console-Variables%2F&postId=3275813)
на котором можно вбить любой параметр и узнать, что он делает.

>[!warning] Не все игры могу одобрить вашу инициативу, но значительная часть сможет играться и запускаться с модифицированным INI файлом.

>[!warning] Статтеры не уничтожаются полностью, но сводятся к абсолютному минимуму, вам всё равно придется отыграть 10-15 минут, чтобы кэш шейдеров НАВСЕГДА закрепился за игрой.

Проверено на Pacific Drive, Satisfactory, Ghostrunner (вторая тоже пропустит такой файл), Godfall.
