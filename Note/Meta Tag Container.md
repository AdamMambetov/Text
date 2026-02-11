---
created: 2026-02-12T01:11:10+03:00
category:
  - "[[Программирование]]"
meta:
  - "[[Unreal Engine]]"
---

# Meta Tag Container

Совет от [Developer Assistant](https://dev.epicgames.com/community/assistant/unreal-engine).

Your current `FMetaTagContainer` uses a `TMap<FGameplayTag, FMeta>` which can’t be replicated directly with `FFastArraySerializer`. To enable efficient replication with `FFastArraySerializer`, you need to:

- Replace `TMap` with a `TArray` of structs that represent map entries (each containing `FGameplayTag` and `FMeta`).
- Make that entry struct inherit from `FFastArraySerializerItem`.
- Wrap the array in a struct inheriting from `FFastArraySerializer`.
- Implement `NetDeltaSerialize` and mark entries/array dirty appropriately on modification.

### Adaptation Example (based on your structs):

```cpp
#include "CoreMinimal.h"
#include "GameplayTagContainer.h"
#include "Net/Serialization/FastArraySerializer.h"
#include "MetaTagContainer.generated.h"

USTRUCT(BlueprintType)
struct FMetaEntry : public FFastArraySerializerItem
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FGameplayTag Tag;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    TArray<int32> Values;

    bool operator==(const FMetaEntry& Other) const
    {
        return Tag == Other.Tag && Values == Other.Values;
    }
};

USTRUCT(BlueprintType)
struct FMetaTagArray : public FFastArraySerializer
{
    GENERATED_BODY()

    UPROPERTY()
    TArray<FMetaEntry> Entries;

    bool NetDeltaSerialize(FNetDeltaSerializeInfo& DeltaParms)
    {
        return FastArrayDeltaSerialize<FMetaEntry, FMetaTagArray>(Entries, DeltaParms, *this);
    }

    FMetaEntry* FindEntryByTag(const FGameplayTag& Tag)
    {
        return Entries.FindByPredicate([&](const FMetaEntry& Entry) { return Entry.Tag == Tag; });
    }

    void AddOrUpdateEntry(const FGameplayTag& Tag, const TArray<int32>& NewValues)
    {
        if (FMetaEntry* Entry = FindEntryByTag(Tag))
        {
            if (Entry->Values != NewValues)
            {
                Entry->Values = NewValues;
                MarkItemDirty(*Entry);
            }
        }
        else
        {
            FMetaEntry NewEntry;
            NewEntry.Tag = Tag;
            NewEntry.Values = NewValues;
            Entries.Add(NewEntry);
            MarkArrayDirty();
        }
    }

    void RemoveEntry(const FGameplayTag& Tag)
    {
        int32 Index = Entries.IndexOfByPredicate([&](const FMetaEntry& Entry) { return Entry.Tag == Tag; });
        if (Index != INDEX_NONE)
        {
            Entries.RemoveAt(Index);
            MarkArrayDirty();
        }
    }
};

template<>
struct TStructOpsTypeTraits<FMetaTagArray> : public TStructOpsTypeTraitsBase2<FMetaTagArray>
{
    enum
    {
        WithNetDeltaSerializer = true,
    };
};
```
  

### How to use in your actor:

```cpp
UCLASS()
class AMyActor : public AActor
{
    GENERATED_BODY()

public:
    UPROPERTY(Replicated)
    FMetaTagArray MetaTagContainer;

    virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override
    {
        Super::GetLifetimeReplicatedProps(OutLifetimeProps);
        DOREPLIFETIME(AMyActor, MetaTagContainer);
    }
};
```
  

### Key points:

- Replace your `TMap` with `FMetaTagArray.Entries` `TArray<FMetaEntry>`.
- Change code accessing your meta tags to use array iteration or `FindEntryByTag`.
- Modify the meta tags through `AddOrUpdateEntry`, `RemoveEntry` methods, which correctly mark dirty state for replication.
- This pattern ensures efficient delta replication over the network.

Let me know if you want a full working module example or integration details!