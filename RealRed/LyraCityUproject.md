# LyraCityUproject

[LyraStarterGame.uproject](https://forums.unrealengine.com/uploads/short-url/uitSYKM3LkAg1b4yrNeLZl9j3W0.uproject)

```
{
	"FileVersion": 3,
	"EngineAssociation": "5.0",
	"Category": "Samples",
	"Description": "",
	"Modules": [
		{
			"Name": "LyraGame",
			"Type": "Runtime",
			"LoadingPhase": "Default",
			"AdditionalDependencies": [
				"DeveloperSettings",
				"Engine"
			]
		},
		{
			"Name": "LyraEditor",
			"Type": "Editor",
			"LoadingPhase": "Default"
		},
		{
			"Name": "CitySample",
			"Type": "Runtime",
			"LoadingPhase": "Default",
			"AdditionalDependencies": [
				"Engine",
				"AIModule",
				"ChaosVehicles",
				"UMG",
				"MovieScene"
			]
		},
		{
			"Name": "CitySampleEditor",
			"Type": "Editor",
			"LoadingPhase": "Default",
			"AdditionalDependencies": [
				"Engine"
			]
		},
		{
			"Name": "CitySampleAnimGraphRuntime",
			"Type": "UncookedOnly",
			"LoadingPhase": "Default"
		}
	],
	"Plugins": [
		{
			"Name": "AlembicHairImporter",
			"Enabled": true
		},
		{
			"Name": "HairStrands",
			"Enabled": true
		},
		{
			"Name": "PythonScriptPlugin",
			"Enabled": true
		},
		{
			"Name": "ControlRig",
			"Enabled": true
		},
		{
			"Name": "HoudiniEngine",
			"Enabled": true
		},
		{
			"Name": "Takes",
			"Enabled": true
		},
		{
			"Name": "LiveLinkCurveDebugUI",
			"Enabled": true
		},
		{
			"Name": "ChaosVehiclesPlugin",
			"Enabled": true
		},
		{
			"Name": "RigLogic",
			"Enabled": true
		},
		{
			"Name": "RawInput",
			"Enabled": true
		},
		{
			"Name": "TraceSourceFilters",
			"Enabled": true
		},
		{
			"Name": "TraceDataFilters",
			"Enabled": true
		},
		{
			"Name": "Traffic",
			"Enabled": true
		},
		{
			"Name": "CitySampleMassCrowd",
			"Enabled": true
		},
		{
			"Name": "StateTree",
			"Enabled": true
		},
		{
			"Name": "OnlineSubsystem",
			"Enabled": true
		},
		{
			"Name": "OnlineSubsystemUtils",
			"Enabled": true
		},
		{
			"Name": "MassAI",
			"Enabled": true
		},
		{
			"Name": "MassCrowd",
			"Enabled": true
		},
		{
			"Name": "MassEntity",
			"Enabled": true
		},
		{
			"Name": "MassGameplay",
			"Enabled": true
		},
		{
			"Name": "HoverDrone",
			"Enabled": true
		},
		{
			"Name": "LiveLinkControlRig",
			"Enabled": true
		},
		{
			"Name": "MotionWarping",
			"Enabled": true
		},
		{
			"Name": "ContextualAnimation",
			"Enabled": true
		},
		{
			"Name": "ChaosCaching",
			"Enabled": true
		},
		{
			"Name": "FieldSystemPlugin",
			"Enabled": true
		},
		{
			"Name": "Paper2D",
			"Enabled": true
		},
		{
			"Name": "ZoneGraph",
			"Enabled": true
		},
		{
			"Name": "ElectraPlayer",
			"Enabled": true
		},
		{
			"Name": "LiveLinkCamera",
			"Enabled": true
		},
		{
			"Name": "Soundscape",
			"Enabled": true
		},
		{
			"Name": "FullBodyIK",
			"Enabled": true
		},
		{
			"Name": "RemoteControl",
			"Enabled": true
		},
		{
			"Name": "ImagePlate",
			"Enabled": true
		},
		{
			"Name": "LightWeightInstancesEditor",
			"Enabled": true
		},
		{
			"Name": "CitySampleSensorGrid",
			"Enabled": true
		},
		{
			"Name": "IKRig",
			"Enabled": true
		},
		{
			"Name": "ColorCorrectRegions",
			"Enabled": true
		},
		{
			"Name": "CustomizableSequencerTracks",
			"Enabled": true
		},
		{
			"Name": "NiagaraFluids",
			"Enabled": true
		},
		{
			"Name": "Text3D",
			"Enabled": true
		},
		{
			"Name": "MotoSynth",
			"Enabled": true
		},
		{
			"Name": "ActorPalette",
			"Enabled": true
		},
		{
			"Name": "GameplayAbilities",
			"Enabled": true
		},
		{
			"Name": "Gauntlet",
			"Enabled": true
		},
		{
			"Name": "CommonLoadingScreen",
			"Enabled": true
		},
		{
			"Name": "CommonConversation",
			"Enabled": true
		},
		{
			"Name": "GameFeatures",
			"Enabled": true
		},
		{
			"Name": "ModularGameplay",
			"Enabled": true
		},
		{
			"Name": "ModularGameplayActors",
			"Enabled": true
		},
		{
			"Name": "EnhancedInput",
			"Enabled": true
		},
		{
			"Name": "WinDualShock",
			"Enabled": true,
			"SupportedTargetPlatforms": [
				"Win64"
			]
		},
		{
			"Name": "Volumetrics",
			"Enabled": true
		},
		{
			"Name": "DataRegistry",
			"Enabled": true
		},
		{
			"Name": "ReplicationGraph",
			"Enabled": true
		},
		{
			"Name": "SignificanceManager",
			"Enabled": true
		},
		{
			"Name": "Niagara",
			"Enabled": true
		},
		{
			"Name": "Water",
			"Enabled": true
		},
		{
			"Name": "CommonUI",
			"Enabled": true
		},
		{
			"Name": "ControlFlows",
			"Enabled": true
		},
		{
			"Name": "GameSettings",
			"Enabled": true
		},
		{
			"Name": "CommonUser",
			"Enabled": true
		},
		{
			"Name": "CommonGame",
			"Enabled": true
		},
		{
			"Name": "GameSubtitles",
			"Enabled": true
		},
		{
			"Name": "PocketWorlds",
			"Enabled": true
		},
		{
			"Name": "UIExtension",
			"Enabled": true
		},
		{
			"Name": "AsyncMixin",
			"Enabled": true
		},
		{
			"Name": "Metasound",
			"Enabled": true
		},
		{
			"Name": "MagicLeap",
			"Enabled": false
		},
		{
			"Name": "MagicLeapMedia",
			"Enabled": false
		},
		{
			"Name": "MagicLeapPassableWorld",
			"Enabled": false
		},
		{
			"Name": "OculusVR",
			"Enabled": false
		},
		{
			"Name": "OpenXR",
			"Enabled": false
		},
		{
			"Name": "OpenXREyeTracker",
			"Enabled": false
		},
		{
			"Name": "OpenXRHandTracking",
			"Enabled": false
		},
		{
			"Name": "OpenXRHMD",
			"Enabled": false
		},
		{
			"Name": "SteamVR",
			"Enabled": false
		},
		{
			"Name": "GearVR",
			"Enabled": false
		},
		{
			"Name": "LuminPlatformFeatures",
			"Enabled": false,
			"SupportedTargetPlatforms": [
				"Lumin"
			]
		},
		{
			"Name": "MLSDK",
			"Enabled": false
		},
		{
			"Name": "OnlineFramework",
			"Enabled": true
		},
		{
			"Name": "OnlineSubsystemEOS",
			"Enabled": true
		},
		{
			"Name": "OnlineServicesEOS",
			"Enabled": true
		},
		{
			"Name": "OnlineServicesNull",
			"Enabled": true
		},
		{
			"Name": "OnlineServicesOSSAdapter",
			"Enabled": true
		},
		{
			"Name": "OnlineSubsystemSteam",
			"Enabled": true
		},
		{
			"Name": "GameplayMessageRouter",
			"Enabled": true
		},
		{
			"Name": "SteamSockets",
			"Enabled": true
		},
		{
			"Name": "AssetReferenceRestrictions",
			"Enabled": true
		},
		{
			"Name": "ModelingToolsEditorMode",
			"Enabled": true
		},
		{
			"Name": "GeometryScripting",
			"Enabled": true
		},
		{
			"Name": "AnimationLocomotionLibrary",
			"Enabled": true
		},
		{
			"Name": "AudioModulation",
			"Enabled": true
		},
		{
			"Name": "AudioGameplayVolume",
			"Enabled": true
		},
		{
			"Name": "AudioGameplay",
			"Enabled": true
		},
		{
			"Name": "SoundUtilities",
			"Enabled": true
		},
		{
			"Name": "AnimationWarping",
			"Enabled": true
		},
		{
			"Name": "MovieRenderPipeline",
			"Enabled": true
		},
		{
			"Name": "MoviePipelineMaskRenderPass",
			"Enabled": true
		},
		{
			"Name": "AssetSearch",
			"Enabled": true
		},
		{
			"Name": "GameplayInsights",
			"Enabled": true
		},
		{
			"Name": "ResonanceAudio",
			"Enabled": false
		},
		{
			"Name": "RuntimePhysXCooking",
			"Enabled": false
		},
		{
			"Name": "Spatialization",
			"Enabled": true
		},
		{
			"Name": "ShooterCore",
			"Enabled": true
		},
		{
			"Name": "ShooterMaps",
			"Enabled": true
		},
		{
			"Name": "TopDownArena",
			"Enabled": true
		},
		{
			"Name": "Bridge",
			"Enabled": true,
			"SupportedTargetPlatforms": [
				"Win64",
				"Mac",
				"Linux"
			]
		}
	],
	"EpicSampleNameHash": "451731683"
}
```