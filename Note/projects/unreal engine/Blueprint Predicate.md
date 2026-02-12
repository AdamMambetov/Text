---
created: 2026-02-12T01:25:36+03:00
category:
  - "[[Программирование]]"
meta:
  - "[[Unreal Engine]]"
related:
  - https://dev.epicgames.com/community/learning/tutorials/XjZP/unreal-engine-automate-with-custom-dataprep-filters-operations
---

# Blueprint Predicate

Совет от [Developer Assistant](https://dev.epicgames.com/community/assistant/unreal-engine).

> Как мне сделать так, чтобы в Blueprint была возможность как в C++ вызова FindByPredicate у массива. Чтобы можно было в отдельном графе написать предикат по которому будет осуществлён поиск

Чтобы в Blueprint можно было сделать поиск по массиву с условием (FindByPredicate), как в C++, нужно расширить Blueprint через C++ с использованием динамического делегата, который принимает элемент и возвращает булево значение — то есть ваш предикат.

### Основная идея

- Создать в C++ `UFUNCTION(BlueprintCallable)`, принимающую массив и делегат-предикат.
- Делегат вызывается для каждого элемента массива.
- Функция возвращает первый элемент, для которого предикат вернёт `true`.
- В Blueprint написать отдельную функцию (граф), которая будет использоваться как предикат.

### Краткий план реализации

```cpp
// MyArrayUtils.h
#pragma once

#include "Kismet/BlueprintFunctionLibrary.h"
#include "MyArrayUtils.generated.h"

UDELEGATE(BlueprintCallable)
DECLARE_DYNAMIC_DELEGATE_RetVal_OneParam(bool, FMyObjectPredicate, UObject*, Item);

UCLASS()
class YOURMODULE_API UMyArrayUtils : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    UFUNCTION(BlueprintCallable, Category="Array|Search")
    static UObject* FindByPredicate(const TArray<UObject*>& Array, const FMyObjectPredicate& Predicate);
};
```
  
```cpp
// MyArrayUtils.cpp
#include "MyArrayUtils.h"

UObject* UMyArrayUtils::FindByPredicate(const TArray<UObject*>& Array, const FMyObjectPredicate& Predicate)
{
    for (UObject* Item : Array)
    {
        if (Predicate.Execute(Item))
        {
            return Item;
        }
    }
    return nullptr;
}
```

### В Blueprint

- Создайте функцию, принимающую `UObject*` (или ваш тип) и возвращающую `bool` — это ваш предикат.
- На графе используйте ноду **Create Event**, чтобы передать вашу функцию как делегат.
- Вызовите `FindByPredicate`, передав массив и созданный делегат.
- Получите первый элемент, удовлетворяющий условию.

### Заметки

- Для своих типов можно создать соответствующие делегаты, заменив `UObject*` на нужный тип.
- Для структур с `BlueprintType` — аналогичным образом, используя соответствующий тип для параметра делегата.
- Blueprint не может напрямую передавать лямбды, поэтому используется делегат-событие.

Если нужно — могу помочь адаптировать код под ваш конкретный тип массива или усложнённый предикат. Пожалуйста, уточните:

- Тип элементов массива?
- Нужно ли возвращать только первый найденный элемент или все подходящие?
- Насколько сложный будет предикат?

---

Ниже пример C++ кастомной Blueprint ноды, наследуемой от `UK2Node_MacroInstance`, которая хранит ссылку на Macro Graph, динамически создает пины по туннелям Macro, и при двойном клике открывает этот Macro Graph для редактирования.

```cpp
// CustomFindByPredicateNode.h
#pragma once

#include "K2Node_MacroInstance.h"
#include "CustomFindByPredicateNode.generated.h"

UCLASS()
class UCustomFindByPredicateNode : public UK2Node_MacroInstance
{
    GENERATED_BODY()

public:
    UCustomFindByPredicateNode(const FObjectInitializer& ObjectInitializer);

    virtual void AllocateDefaultPins() override;

    virtual void JumpToDefinition() const override;

    // Установить Macro Graph результатом работы predicate
    void SetPredicateMacroGraph(UEdGraph* InMacroGraph);

protected:
    UPROPERTY()
    UEdGraph* PredicateMacroGraph;
};
```

```cpp
// CustomFindByPredicateNode.cpp
#include "CustomFindByPredicateNode.h"
#include "BlueprintEditorUtils.h"
#include "Kismet2/BlueprintEditorUtils.h"
#include "EdGraph/EdGraph.h"

UCustomFindByPredicateNode::UCustomFindByPredicateNode(const FObjectInitializer& ObjectInitializer)
    : Super(ObjectInitializer)
    , PredicateMacroGraph(nullptr)
{
}

void UCustomFindByPredicateNode::SetPredicateMacroGraph(UEdGraph* InMacroGraph)
{
    PredicateMacroGraph = InMacroGraph;
    SetMacroGraph(InMacroGraph); // Родительский метод для хранения Macro Graph
}

void UCustomFindByPredicateNode::AllocateDefaultPins()
{
    // Используем PredicateMacroGraph для определения пинов
    if (PredicateMacroGraph)
    {
        SetMacroGraph(PredicateMacroGraph);
        Super::AllocateDefaultPins();
    }
}

void UCustomFindByPredicateNode::JumpToDefinition() const
{
    if (PredicateMacroGraph)
    {
        FBlueprintEditorUtils::BringGraphToFront(const_cast<UEdGraph*>(PredicateMacroGraph));
    }
}
```

**Как использовать:**

- Создайте Blueprint Macro Library или Macro Graph с предикатом (входные/выходные туннели под параметры).
- В C++ создайте экземпляр `UCustomFindByPredicateNode` и вызовите `SetPredicateMacroGraph` с вашим Macro Graph.
- В Blueprint графе добавьте эту ноду; она создаст пины из туннелей Macro.
- Двойной клик по ноде откроет редактируемый Macro Graph.

**Примечания:**

- Пины автоматически отражают Macro туннели (входы/выходы).
- Для обновления pin-параметров при изменении Macro Graph потребуется дополнительная логика ноды.
- Такой подход близок к Timeline node и UK2Node_MacroInstance по концепции.
- Для интеграции в редактор Blueprint требуется регистрация ноды и меню (не показано).

Если нужно, могу помочь с регистрацией и расширением функционала синхронизации.

Этот пример показывает основу создания ноды с редактируемым Macro Graph предикатом, открываемым по двойному клику.

Вот подробный порядок использования вашей кастомной ноды с Macro Graph в UE5:

- **Создание Macro Graph предиката в редакторе:**
    - В Content Browser создайте Blueprint Macro Library (правый клик → Blueprint Class → Blueprint Macro Library).
    - Откройте его и создайте новый Macro (например, `MyPredicate`).
    - В Macro создайте входные и выходные туннели (Inputs/Outputs), параметры которых соответствуют элементу массива и результату `bool` (например, вход — `Element` нужного типа, выход — `bool`).
    - Напишите логику проверки — условие предиката.
- **Подключение Macro Graph к ноде:**
    - В C++ коде (например, в Factory, редакторском скрипте или другом месте) создайте экземпляр вашей ноды `UCustomFindByPredicateNode`.
    - Получите указатель на Macro Graph вашего предиката (`UEdGraph*`), например, через `UBlueprint` и методы `GetMacroGraphByName`.
    - Вызовите у вашей ноды `SetPredicateMacroGraph(MacroGraphPointer)`, чтобы привязать Macro Graph.
- **Добавление ноды в Blueprint граф:**
    - Зарегистрируйте вашу ноду в редакторе, чтобы она появилась в меню `Add Node` (для этого нужен модуль Editor и регистрация через `FBlueprintNodeSpawner`).
    - В Blueprint графе добавьте вашу ноду.
    - Нода автоматически создаст пины на основе туннелей вашего Macro Graph.
- **Редактирование ноды:**
    - Сделайте двойной клик по ноде.
    - Откроется редактируемый Macro Graph с вашим предикатом, где можно править логику.
    - При сохранении Macro Graph и перезапуске Blueprint Editor или обновлении Graph pins отражают изменения.

### Важные моменты:

- **Динамическое обновление пинов:**  
    Для отражения изменений Macro Graph пины нужно переаллоцировать в `AllocateDefaultPins()` при изменении Macro Graph.
- **Регистрация ноды:**  
    Чтобы нода появилась на панели добавления, используйте регистрацию в вашем модуле Editor:

```cpp
FBlueprintNodeSpawner::Create(UCustomFindByPredicateNode::StaticClass());
```

- **Управление Macro Graph ссылкой:**  
    Сохраняйте ссылку `PredicateMacroGraph` как UPROPERTY, чтобы Garbage Collector их не удалял.

### Пример запроса Macro Graph из Blueprint:

```cpp
UBlueprint* MacroLib = LoadObject<UBlueprint>(nullptr, TEXT("/Game/Blueprints/MyMacroLibrary.MyMacroLibrary"));
UEdGraph* MacroGraph = nullptr;
if(MacroLib)
{
    MacroGraph = FBlueprintEditorUtils::GetMacroGraphByName(MacroLib, TEXT("MyPredicate"));
}

// Создаете ноду, вызываете
YourNode->SetPredicateMacroGraph(MacroGraph);
```

Если нужна полная пошаговая инструкция с регистрацией ноды и вызовом из Blueprint — могу подготовить.  
Так вы получите ноду с редактируемым Macro Graph предикатом, открывающимся по двойному клику, и pins, синхронизированными с туннелями Macro.
