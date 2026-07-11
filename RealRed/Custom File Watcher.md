---
source: https://forums.unrealengine.com/t/how-to-add-custom-asset-extension-or-a-virtual-asset/2295455
---
```cpp
FDelegateHandle FCustomAssetManager::WatcherHandle = FDelegateHandle();

void FCustomAssetManager::Initialize()
{
	WatchDirectory = FPaths::ProjectContentDir();
	
	FDirectoryWatcherModule& DirectoryWatcher = FModuleManager::LoadModuleChecked<FDirectoryWatcherModule>("DirectoryWatcher");
	DirectoryWatcher.Get()->RegisterDirectoryChangedCallback_Handle(
		WatchDirectory,
		IDirectoryWatcher::FDirectoryChanged::CreateRaw(this, &FCustomAssetManager::ScanForCSSFiles),
		FCustomAssetManager::WatcherHandle,
		IDirectoryWatcher::WatchOptions::IncludeDirectoryChanges
	);
}

void FCustomAssetManager::Shutdown()
{
	if (FModuleManager::Get().IsModuleLoaded("DirectoryWatcher"))
	{
		FDirectoryWatcherModule& DirectoryWatcher = FModuleManager::LoadModuleChecked<FDirectoryWatcherModule>("DirectoryWatcher");
		DirectoryWatcher.Get()->UnregisterDirectoryChangedCallback_Handle(WatchDirectory, OnDirectoryChangedHandle);
	}
}

void FCustomAssetManager::ScanForCSSFiles(const TArray<FFileChangeData> & Data)
{

	if (Data.Num() == 0)
		return;
	
	for (FFileChangeData File : Data)
	{

		if (FPaths::GetExtension(File.Filename) != "css")
			continue;
		
		FContentBrowserModule& ContentBrowserModule = FModuleManager::LoadModuleChecked<FContentBrowserModule>("ContentBrowser");
		IContentBrowserSingleton& ContentBrowserSingleton = ContentBrowserModule.Get();

		IAssetRegistry& AssetRegistry = FModuleManager::LoadModuleChecked<FAssetRegistryModule>("AssetRegistry").Get();
		
		FAssetData VirtualAsset(
			FName(FPaths::GetBaseFilename(File.Filename)),
			FName("/Game"),
			FName(FPaths::GetBaseFilename(File.Filename)),
			FName("CSS")
		);
	
		FAssetRegistryState AssetRegistryState = FAssetRegistryState();
		
		if (File.Action == FFileChangeData::FCA_Removed)
		{
			bool bDummy;
			AssetRegistryState.RemoveAssetData(&VirtualAsset, false, bDummy, bDummy);
			AssetRegistry.AppendState(AssetRegistryState);
		}
		else if (File.Action == FFileChangeData::FCA_Added)
		{
			AssetRegistryState.AddAssetData(&VirtualAsset);
			AssetRegistry.AppendState(AssetRegistryState);
		}
	}
}
```

![[Pasted image 20251003174939.png]]