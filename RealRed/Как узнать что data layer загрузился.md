# Как узнать что data layer загрузился

Нашёл на форуме способ проверки, что data layer загрузился. Есть 2 функции у World Partition Subsystem: IsStreamingCompleted и IsAllStreamingCompleted. https://forums.unrealengine.com/t/how-to-check-if-a-data-layer-has-finished-loading-all-actors-into-a-level/1670868/6

Мы обнаружили, что ответ находится в демо Valley of the Ancient. Вы можете использовать метод «IsStreamingCompleted» из WorldPartitionSubsystem...

```c++
FAsyncCoroutine UGameUtilities::SetDataLayerRuntimeStateAsync(FLatentActionInfo LatentInfo, const UObject* WorldContextObject, const UDataLayerAsset* DataLayerAsset, EDataLayerRuntimeState InState, bool bInIsRecursive)
{
	const UWorld* World = WorldContextObject->GetWorld();

	UWorldPartitionSubsystem* WorldPartitionSubsystem = World->GetSubsystem<UWorldPartitionSubsystem>();
	
	if (!World || !WorldPartitionSubsystem)
		co_return;
	
	if (UDataLayerManager* DataLayerManager = UDataLayerManager::GetDataLayerManager(World))
	{
		if (const UDataLayerInstance* DataLayerInstance = DataLayerManager->GetDataLayerInstanceFromAsset(DataLayerAsset))
		{
			DataLayerManager->SetDataLayerRuntimeState(DataLayerAsset, InState, bInIsRecursive);
		}
		else
		{
			UE_LOG(LogWorldPartition, Warning, TEXT("UDataLayerManager::SetDataLayerRuntimeState unknown Data Layer"));
		}
	}

	bool bStreamingComplete = false;

	while (!bStreamingComplete)
	{
		co_await UE5Coro::Latent::NextTick();
		bStreamingComplete = WorldPartitionSubsystem->IsStreamingCompleted();
	}
	
	co_return;
}
```