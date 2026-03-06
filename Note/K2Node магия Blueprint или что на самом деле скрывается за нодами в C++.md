---
created: 2026-03-04
category:
  - "[[Программирование]]"
Creators:
  - "[[Ким]]"
meta:
  - "[[Unreal Engine]]"
source: https://habr.com/ru/articles/941074/
---

Каждый, кто имел дело с Unreal Engine после 2014, наверняка слышал про скриптовый язык Blueprint. Но что реально происходит под капотом, когда вы таскаете ноды? Как создать свою ноду (и надо ли это вам вообще)? В данной статье я хочу разобрать K2Node - фундамент, на котором стоит вся система Blueprint.

### Содержание

- Немного истории: от Kismet к K2
- Что такое K2Node?
- Зачем вообще создавать свои ноды?
- Архитектура: что находится под капотом
- Жизненный цикл K2Node
- Типы K2Node
- Создаём свою K2Node: подготовка проекта
- Практика: разбор реальных нод из моего проекта
- ExpandNode - сердце кастомной ноды
- Wildcard-пины и динамическая типизация
- Компиляция Blueprint: как нода превращается в байткод
- Советы и подводные камни
- Бонус: подписка на статические делегаты движка
- Заключение

---

### Немного истории: от Kismet к K2

**Kismet** - первая система визуального скриптинга в Unreal Engine. Появилась она ещё в **Unreal Engine 3** (2006 год). Kismet позволял дизайнерам уровней создавать игровую логику без программирования: открыть дверь по триггеру, запустить событие при входе игрока в зону, управлять камерой. По сути это был секвенсер - набор действий, которые выполнялись одновременно, а не полноценный язык программирования.

Кстати, слово **Kismet** пришло в английский из турецкого **kısmet**, которое в свою очередь восходит к арабскому **قسمة** (qismah) - «деление», «распределение», «доля». В турецком значение сместилось в сторону «то, что тебе отведено», «судьба», «рок». Именно в этом турецком значении слово закрепилось в английском. Так что выбор названия для визуального скриптинга UE3 скорее всего отсылает к «предназначению» логики уровня.

![Выглядело это как-то так](https://habrastorage.org/r/w780/getpro/habr/upload_files/b68/afb/7d4/b68afb7d4b15f169eb7fe382588ed1d1.png)

Выглядело это как-то так

Где-то к 2010 году в исходниках UDK начали появляться классы с префиксом **K2** - `K2Node_Code`, `K2Node_ForLoop`, `K2Node_Func`, `K2Node_IfElse`. Комьюнити быстро сообразило: **K2 = Kismet 2**. Это было кодовое название системы, которую мы сегодня знаем как **Blueprint**.

В 2012 году внутри Epic Games состоялось судьбоносное совещание. Вот как Тим Суини описал его в [интервью Gamasutra на GDC 2014](https://www.gamedeveloper.com/business/for-tim-sweeney-advancing-epic-means-racing-into-ar-and-vr): «Мы вели бесконечные дебаты об UnrealScript - скриптовом языке, который я создал и который мы тащили через три поколения движка. Список фич, которые нужно было добавить, рос и рос… И в какой-то момент я сказал: знаете, всё, что вы предлагаете добавить в UnrealScript, уже есть в C++. Почему бы просто не убить UnrealScript и не перейти на чистый C++?» UnrealScript убили, а визуальное программирование переродилось из Kismet в Blueprint.

Ключевое отличие от Kismet 1.0:

- **Kismet** - секвенсер действий уровня. Привязан к уровню, не объектно-ориентированный.
- **Blueprint (Kismet 2.0)** - полноценный объектно-ориентированный визуальный язык. Компилируется в байткод и выполняется виртуальной машиной UE. Каждый Blueprint - это класс. Есть инкапсуляция, наследование, полиморфизм.

Поэтому, когда вы видите `UK2Node` в коде движка - это не какой-то легаси-артефакт. Это буквально «Kismet 2 Node» - базовый класс **всех** нод в графе Blueprint.

---

### Что такое K2Node?

`UK2Node` - это C++ класс, наследник `UEdGraphNode`, который является базовым классом для всех нод, используемых в Blueprint-графах. Каждая нода, которую вы видите в редакторе Blueprint - от банального Print String до сложного Spawn Actor From Class - где-то в иерархии наследуется от `UK2Node`.

Самое важное, что нужно понять:

**K2Node это не функция. Это подграф.**

Когда вы компилируете Blueprint, каждая K2Node может «раскрыться» (expand) в одну или несколько внутренних нод. Например, нода `Spawn Actor From Class` при компиляции разворачивается в цепочку:

```cpp
BeginDeferredActorSpawnFromClass 
    → [Сгенерированные сеттеры для ExposeOnSpawn-переменных] 
        → FinishSpawningActorОбъяснить с
```

Для пользователя это одна нода. Для компилятора - три (или больше).

---

### Зачем вообще создавать свои ноды?

Прежде чем бросаться писать кастомные ноды - задайте себе вопрос: **а оно вам надо?**

**Кастомные K2Node нужны, когда:**

- Вам нужна **динамическая аллокация пинов** - пины, которые появляются/исчезают/меняют тип в зависимости от входных данных.
- Вы хотите **скрыть сложность** - одна нода вместо 5-10 связанных нод, что уменьшает спагетти-код в графе.
- Нужно **кастомное поведение при компиляции** - нода, которая генерирует разный код в зависимости от контекста.
- Требуется **кастомный UI** - специфический визуал, кастомные виджеты в пинах
- Нода должна **менять свою логику** в зависимости от типа входных данных (wildcard-пины).

**Кастомные K2Node не нужны, если:**

- Вам просто нужно вызвать C++ функцию из Blueprint → используйте `UFUNCTION(BlueprintCallable)`.
- Хотите pure-функцию → `UFUNCTION(BlueprintPure)`.
- Нужен кастомный Event → `UFUNCTION(BlueprintImplementableEvent)`.
- Хватает мета-спецификаторов `UFUNCTION` / `UPARAM` (ниже будет пара примеров)

---

### Архитектура: что находится под капотом

Давайте посмотрим на иерархию классов:

```
UEdGraphNode                     ← Базовый класс для всех нод во всех графах UE
    └── UK2Node                  ← Базовый класс для Blueprint-нод
        ├── UK2Node_CallFunction ← Нода, вызывающая одну функцию
        ├── UK2Node_Event        ← Event-ноды (BeginPlay, Tick и т.д.)
        ├── UK2Node_IfThenElse   ← Branch
        ├── UK2Node_SpawnActorFromClass
        ├── UK2Node_DynamicCast  ← Cast To
        ├── UK2Node_TemporaryVariable
        ├── UK2Node_MakeArray
        └── ... сотни других
Объяснить с
```

Рядом с графом живёт **схема**: `UEdGraphSchema_K2`. Она отвечает за валидацию: можно ли соединить два пина, какие типы совместимы, как создавать дефолтные значения. У Blueprint, анимаций, материалов и UMG свои схемы, поэтому поместить ноды из одного графа в другой не всегда получается.

Ключевые сущности:

- **UEdGraphPin** - пин ноды. Хранит тип, направление (вход/выход), дефолтное значение, список соединений.
- **UEdGraphSchema\_K2** - схема Blueprint-графа. Валидация, правила соединения пинов.
- **FKismetCompilerContext** - контекст компиляции. Создаётся при каждой компиляции Blueprint.
- **FBlueprintActionDatabaseRegistrar** - реестр, в который ноды регистрируются для появления в контекстном меню.

---

### Жизненный цикл K2Node

Жизнь кастомной K2Node можно разделить на два этапа: **Editor-time** (когда пользователь работает с нодой в редакторе) и **Compile-time** (когда Blueprint компилируется).

#### Editor-time

1. `**GetMenuActions()**` - нода регистрируется в базе данных Blueprint Action. Без этого ноду невозможно найти в контекстном меню.
2. `**AllocateDefaultPins()**` - создаются пины ноды (входы/выходы). Вызывается при размещении ноды на графе и при реконструкции.
3. `**GetNodeTitle()**` **/** `**GetTooltipText()**` **/** `**GetMenuCategory()**` - метаданные для UI.
4. `**PinConnectionListChanged()**` **/** `**PinDefaultValueChanged()**` - реакция на действия пользователя: подключил/отключил ноду, изменил дефолт.
5. `**PostReconstructNode()**` - вызывается после пересоздания ноды (например, после изменения внешней зависимости).
6. `**GetIconAndTint()**` **/** `**GetNodeTitleColor()**` - визуальное оформление ноды.

#### Compile-time

1. `**ExpandNode()**` - **самый важный метод**. Вызывается во время компиляции. Здесь нода «раскрывается» в набор промежуточных нод (`UK2Node_CallFunction`, `UK2Node_TemporaryVariable`, `UK2Node_AssignmentStatement` и т.д.), которые и будут преобразованы в байткод.
2. `**BreakAllNodeLinks()**` - вызывается в конце `ExpandNode()`. Кастомная нода отсоединяет себя от графа, потому что её роль уже выполнена - промежуточные ноды заняли её место.

Схематически:

```
[Пользователь размещает ноду]
    → GetMenuActions()     // Регистрация в меню
    → AllocateDefaultPins() // Создание пинов
    → GetNodeTitle() и др.  // UI

[Пользователь редактирует]
    → PinConnectionListChanged()
    → PinDefaultValueChanged()
    → PostReconstructNode()

[Компиляция Blueprint]
    → ExpandNode()          // Раскрытие в промежуточные ноды
    → BreakAllNodeLinks()   // Самоудаление из графа
    → [Промежуточные ноды компилируются в байткод]
Объяснить с
```

---

### Типы K2Node

Давайте классифицируем основные типы K2Node, которые вы встретите в движке.

#### 1\. UK2Node\_CallFunction

Самый распространённый тип. Каждая `UFUNCTION(BlueprintCallable)` в C++ автоматически создаёт ноду этого типа через рефлексию (наверное, стоит разобрать этот механизм в отдельной статье). Это обёртка вокруг вызова одной конкретной функции.

#### 2\. UK2Node\_Event / UK2Node\_CustomEvent

Event-ноды - точки входа в граф. `BeginPlay`, `Tick`, кастомные евенты. У них нет входного exec-пина, только выходной.

#### 3\. UK2Node\_IfThenElse (Branch)

Ноды управления потоком выполнения. Branch, ForLoop, WhileLoop, Select и т.д.

#### 4\. UK2Node\_DynamicCast (Cast To)

Нода приведения типов. Имеет два exec-выхода: успешный каст (Valid) и неуспешный (Invalid). Может быть сконвертирована в pure-версию себя.

#### 5\. UK2Node\_SpawnActorFromClass / UK2Node\_ConstructObjectFromClass

Составные ноды, которые при компиляции раскрываются в несколько вызовов функций + динамические пины для `ExposeOnSpawn` -переменных (так же работают через рефлексию)

#### 6\. UK2Node\_MacroInstance

Макросы в Blueprint - тоже ноды. При компиляции граф макроса «вклеивается» на место ноды (инлайнинг).

#### 7\. Кастомные K2Node

То, что пишете вы. Могут наследоваться от `UK2Node` напрямую, от `UK2Node_CallFunction`, или от любого другого подходящего класса.

---

### Создаём свою K2Node: подготовка проекта

Прежде чем писать ноду, нужно подготовить инфраструктуру проекта.

#### Модуль UncookedOnly

K2Node - это editor-only код. Он не должен попасть в собранный билд игры. Поэтому создаём отдельный модуль с типом `UncookedOnly`. Не Editor!

Модуль типа `Editor` загружается только в редакторе - казалось бы, то что нужно. Но проблема в том, что `Editor` модули подтягивают зависимости на `UnrealEd` в рантайм-граф, и если другой рантайм-модуль случайно ссылается на ваш `Editor` модуль, билд для целевой платформы сломается. Кроме того, `Editor` модули участвуют в горячей перезагрузке (Hot Reload/LiveCoding), что может приводить к крашам при перекомпиляции на лету.

`UncookedOnly` решает обе проблемы: модуль доступен в редакторе и при запаковке контента, но гарантированно исключается из билда. Линкер физически не даст рантайм-модулю сослаться на `UncookedOnly` модуль, так что случайная зависимость невозможна. Именно этот тип Epic использует для всех встроенных нод в `BlueprintGraph`.

Подробнее о модулях можно прочитать в [официальной документации.](https://dev.epicgames.com/community/learning/knowledge-base/GDD9/unreal-engine-modules-overview-and-structure)

В `.uproject` или `.uplugin`:

```json
"Modules": [
    {
        "Name": "MyGame",
        "Type": "Runtime",
        "LoadingPhase": "Default"
    },
    {
        "Name": "MyGameNodes",
        "Type": "UncookedOnly",
        "LoadingPhase": "Default"
    }
]
Объяснить с
```

#### Зависимости в Build.cs

```cs
PrivateDependencyModuleNames.AddRange(new string[]
{
    "CoreUObject",
    "Engine",
    "BlueprintGraph",  // Обязательно!
    "UnrealEd",        // Обязательно!
    "KismetCompiler",  // Для ExpandNode
    "GraphEditor",     // Для кастомного UI (опционально)
    "SlateCore",       // Для иконок (опционально)
});
Объяснить с
```

---

### Практика: разбор реальных нод из моего проекта

Теперь давайте разберём реальный код. Я покажу три ноды из моей системы инвентаря - от простой обёртки до полноценной ноды с `ExpandNode` и wildcard-пинами (подробнее о них ниже)

#### Пример 1: UK2Node\_ItemPropertyByTypeBase - базовый класс

Начнём с базового класса. Он наследуется от `UK2Node_CallFunction` и добавляет логику динамической смены типа выходного пина в зависимости от входного:

```cpp
// K2Node_ItemPropertyByTypeBase.h
UCLASS(Abstract)
class INVENTORYSYSTEMNODES_API UK2Node_ItemPropertyByTypeBase : public UK2Node_CallFunction
{
    GENERATED_BODY()

public:
    virtual void PostReconstructNode() override;
    virtual void PinConnectionListChanged(UEdGraphPin* Pin) override;
    virtual void PinDefaultValueChanged(UEdGraphPin* Pin) override;
    virtual FSlateIcon GetIconAndTint(FLinearColor& OutColor) const override;
    virtual FLinearColor GetNodeTitleColor() const override;

protected:
    void RefreshOutputPropertyType();
    
    UEdGraphPin* GetPropertyTypePin() const;
    UEdGraphPin* GetOutPropertyPin() const;
    
    static const FName PropertyTypePinName;
    static const FName OutPropertyPinName;
};
Объяснить с
```

Класс помечен как `Abstract` - нельзя создать экземпляр напрямую, только наследников. Он оборачивает функции из `UItemPropertyLibrary`, но с добавлением «умного» поведения пина `OutProperty`, который меняет свой тип в зависимости от выбранного `PropertyType`.

Ключевой метод - `RefreshOutputPropertyType()`:

```cpp
void UK2Node_ItemPropertyByTypeBase::RefreshOutputPropertyType()
{
    UEdGraphPin* OutPin = GetOutPropertyPin();
    UEdGraphPin* TypePin = GetPropertyTypePin();
    
    if (!OutPin || !TypePin)
    {
        return;
    }

    const UEdGraphSchema_K2* Schema = GetDefault<UEdGraphSchema_K2>();
    UObject* ChosenType = TypePin->DefaultObject;

    // Если тип не выбран, пробуем взять его из подключённого пина
    if (ChosenType == nullptr && OutPin->LinkedTo.Num() > 0)
    {
        UEdGraphPin* LinkedPin = OutPin->LinkedTo[0];
        if (LinkedPin && LinkedPin->PinType.PinCategory == UEdGraphSchema_K2::PC_Struct)
        {
            ChosenType = LinkedPin->PinType.PinSubCategoryObject.Get();
        }
    }

    // Обновляем тип пина, только если он действительно изменился
    if (ChosenType != OutPin->PinType.PinSubCategoryObject)
    {
        if (OutPin->SubPins.Num() > 0)
        {
            Schema->RecombinePin(OutPin);
        }

        OutPin->PinType.PinSubCategoryObject = ChosenType;
        OutPin->PinType.PinCategory = (ChosenType == nullptr) ? 
            UEdGraphSchema_K2::PC_Wildcard : UEdGraphSchema_K2::PC_Struct;

        // Дефолтное значение стало невалидным для нового типа - сбрасываем
        if (!Schema->IsPinDefaultValid(OutPin, OutPin->DefaultValue, OutPin->DefaultObject, OutPin->DefaultTextValue).IsEmpty())
        {
            Schema->ResetPinToAutogeneratedDefaultValue(OutPin, false);
        }
    }

    if (UEdGraph* Graph = GetGraph())
    {
        Graph->NotifyGraphChanged();
    }
}Объяснить с
```

Что здесь происходит:

1. Берём пин типа (`PropertyType`) и выходной пин (`OutProperty`).
2. Если пользователь выбрал конкретный тип в выпадающем меню - используем его.
3. Если не выбрал, но к выходному пину что-то подключено - выводим тип из подключения (обратная дедукция!).
4. Если тип не определён - ставим `PC_Wildcard` (серый пин-«джокер»).
5. Уведомляем граф об изменениях.  
	У UEdGraph есть метод `NotifyNodeChanged(`const UEdGraphNode\* Node`)`, но мы уведомляем весь граф, т.к. от wilcard пина могут зависеть и другие ноды.

Обратите внимание: `RefreshOutputPropertyType()` вызывается из трёх мест:

```cpp
void UK2Node_ItemPropertyByTypeBase::PostReconstructNode()
{
    Super::PostReconstructNode();
    RefreshOutputPropertyType();  // При реконструкции ноды
}

void UK2Node_ItemPropertyByTypeBase::PinConnectionListChanged(UEdGraphPin* Pin)
{
    Super::PinConnectionListChanged(Pin);
    if (Pin && (Pin == GetPropertyTypePin() || Pin == GetOutPropertyPin()))
    {
        RefreshOutputPropertyType();  // При изменении соединений
    }
}

void UK2Node_ItemPropertyByTypeBase::PinDefaultValueChanged(UEdGraphPin* Pin)
{
    Super::PinDefaultValueChanged(Pin);
    if (Pin == GetPropertyTypePin())
    {
        RefreshOutputPropertyType();  // При изменении дефолта в дропдауне
    }
}
Объяснить с
```

Это обеспечивает отзывчивость ноды: как бы пользователь ни взаимодействовал с ней - тип выходного пина всегда актуален.

#### Пример 2: UK2Node\_GetItemInstanceProperty - конкретный наследник

Простой наследник базового класса. Всё, что нужно - зарегистрировать себя в меню и указать метаданные:

```cpp
void UK2Node_GetItemInstanceProperty::GetMenuActions(
    FBlueprintActionDatabaseRegistrar& ActionRegistrar) const
{
    UClass* ActionKey = UItemPropertyLibrary::StaticClass();
    if (ActionRegistrar.IsOpenForRegistration(ActionKey))
    {
        static const FName FuncName = 
            GET_FUNCTION_NAME_CHECKED(UItemPropertyLibrary, GetItemInstanceProperty);
        UFunction* TargetFunc = 
            UItemPropertyLibrary::StaticClass()->FindFunctionByName(FuncName);
        
        if (TargetFunc)
        {
            UBlueprintFunctionNodeSpawner* Spawner = 
                UBlueprintFunctionNodeSpawner::Create(GetClass(), TargetFunc);
            ActionRegistrar.AddBlueprintAction(TargetFunc, Spawner);
        }
    }
}

FText UK2Node_GetItemInstanceProperty::GetNodeTitle(ENodeTitleType::Type TitleType) const
{
    return LOCTEXT("NodeTitle", "Get Item Instance Property");
}

FText UK2Node_GetItemInstanceProperty::GetMenuCategory() const
{
    return LOCTEXT("MenuCategory", "Inventory System|Item Instance");
}
Объяснить с
```

Обратите внимание на паттерн:

1. `IsOpenForRegistration()` - проверка, что регистрация ещё не произведена (защита от дублирования).
2. `GET_FUNCTION_NAME_CHECKED()` - безопасное получение имени функции (ошибка компиляции, если функция не существует).
3. `UBlueprintFunctionNodeSpawner` - именно он привязывает ноду к конкретной C++ функции.
4. Категория `"Inventory System|Item Instance"` - использование `|` для вложенных подменю.

Поскольку эта нода наследует `UK2Node_CallFunction` (через `UK2Node_ItemPropertyByTypeBase`), ей не нужен свой `ExpandNode()` - базовый класс уже знает, как вызвать привязанную функцию. Вся «магия» - в динамической смене типа пина, которую обеспечивает базовый класс.

![Итоговый результат](https://habrastorage.org/getpro/habr/upload_files/b9d/920/f47/b9d920f47b99160222b722fe15eab378.gif)

Итоговый результат

#### Пример 3: UK2Node\_GetInstancedStructValueByType - полноценный ExpandNode

А вот это уже серьёзная нода. Она работает с `FInstancedStruct` - контейнером, который может хранить любую USTRUCT в рантайме (аналог `std::any` для структур).

Нода не просто вызывает функцию - она генерирует целый подграф при компиляции. Разберём по частям.

**Заголовок:**

```cpp
UCLASS(BlueprintType, Blueprintable)
class INVENTORYSYSTEMNODES_API UK2Node_GetInstancedStructValueByType 
    : public UK2Node_ItemDataBase
{
    GENERATED_BODY()

public:
    virtual FText GetNodeTitle(ENodeTitleType::Type TitleType) const override;
    virtual FText GetTooltipText() const override;
    virtual FText GetKeywords() const override;
    virtual void AllocateDefaultPins() override;
    virtual void GetMenuActions(FBlueprintActionDatabaseRegistrar& ActionRegistrar) const override;
    virtual void ExpandNode(class FKismetCompilerContext& CompilerContext, 
                           UEdGraph* SourceGraph) override;
};
Объяснить с
```

**Создание пинов:**

```cpp
void UK2Node_GetInstancedStructValueByType::AllocateDefaultPins()
{
    // Вход: белый Exec-пин
    CreatePin(EGPD_Input, UEdGraphSchema_K2::PC_Exec, UEdGraphSchema_K2::PN_Execute);
    
    // Вход: Instanced Struct (то, откуда достаём значение)
    CreatePin(EGPD_Input, UEdGraphSchema_K2::PC_Struct, FInstancedStruct::StaticStruct(), 
              UK2Node_ItemData_PinNames::InstancedStructPinName);
    
    // Вход: тип структуры (UScriptStruct*)
    CreatePin(EGPD_Input, UEdGraphSchema_K2::PC_Object, UScriptStruct::StaticClass(), 
              UK2Node_ItemData_PinNames::PropertyTypePinName);
    
    // Выход: Exec-пин (тип совпал)
    CreatePin(EGPD_Output, UEdGraphSchema_K2::PC_Exec, 
              UK2Node_ItemData_PinNames::ValidExecPinName);
    
    // Выход: Exec-пин (тип НЕ совпал)
    CreatePin(EGPD_Output, UEdGraphSchema_K2::PC_Exec, 
              UK2Node_ItemData_PinNames::InvalidExecPinName);
    
    // Выход: данные (wildcard - тип определится позже)
    CreatePin(EGPD_Output, UEdGraphSchema_K2::PC_Wildcard, 
              UK2Node_ItemData_PinNames::OutStructPinName);

    Super::AllocateDefaultPins();
}
Объяснить с
```

У этой ноды два exec-выхода: «Valid» и «Invalid». Это аналог паттерна `Cast To` - выполнение идёт по разным путям в зависимости от того, совпал ли тип.

Для справки: разветвление exec-потока по enum-значению можно получить через спецификатор `ExpandEnumAsExecs`:

```cpp
UENUM(BlueprintType)
enum class EMyResult : uint8
{
    Valid,
    Invalid
};

// Blueprint автоматически получит два exec-выхода: Valid и Invalid
UFUNCTION(BlueprintCallable, meta=(ExpandEnumAsExecs="ReturnValue"))
static EMyResult TryGetStructValue(const FInstancedStruct& Struct, 
                                    UScriptStruct* ExpectedType,
                                    FInstancedStruct& OutValue);Объяснить с
```
```cpp
EMyResult UMyStructLibrary::TryGetStructValue(const FInstancedStruct& Struct,
                                               UScriptStruct* ExpectedType,
                                               FInstancedStruct& OutValue)
{
    if (Struct.IsValid() && Struct.GetScriptStruct()->IsChildOf(ExpectedType))
    {
        OutValue = Struct;
        return EMyResult::Valid;
    }
    return EMyResult::Invalid;
}Объяснить с
```

В нашем же случае этого недостаточно - пины должны ещё и менять тип данных.

![Да, в движке уже есть нода с похожим функционалом, но она не имеет динамической типизации.](https://habrastorage.org/r/w780/getpro/habr/upload_files/a81/91c/731/a8191c7313d71da56405fe51b5dfc886.png)

Да, в движке уже есть нода с похожим функционалом, но она не имеет динамической типизации.

---

### ExpandNode - сердце кастомной ноды

Разберём `ExpandNode` из `UK2Node_GetInstancedStructValueByType`:

```cpp
void UK2Node_GetInstancedStructValueByType::ExpandNode(
    FKismetCompilerContext& CompilerContext, UEdGraph* SourceGraph)
{
    // 1. Валидация: проверяем, что вход подключён
    if (FindPin(UK2Node_ItemData_PinNames::InstancedStructPinName)->LinkedTo.Num() == 0)
    {
        CompilerContext.MessageLog.Error(
            *LOCTEXT("StructToCheck_NotConnected", 
                     "There is no input Instanced Struct. @@").ToString(), this);
    }

    Super::ExpandNode(CompilerContext, SourceGraph);
Объяснить с
```

`@@` в строке ошибки - это специальный маркер. При отображении ошибки движок заменит его на ссылку на проблемную ноду. Кликнете - и редактор покажет именно эту ноду.

```cpp
// 2. Находим целевую функцию
    UFunction* GetInstStructValueFunc = 
        UBlueprintInstancedStructLibrary::StaticClass()->FindFunctionByName(
            GET_FUNCTION_NAME_CHECKED(UBlueprintInstancedStructLibrary, 
                                      GetInstancedStructValue));
    if (!GetInstStructValueFunc)
    {
        CompilerContext.MessageLog.Error(/* ... */);
        return;
    }
Объяснить с
```

Находим `UFunction` функцию из `UBlueprintInstancedStructLibrary`, которую будем вызывать. Если не нашли - ошибка компиляции.

```cpp
// 3. Создаём промежуточные ноды
    const UEdGraphSchema_K2* Schema = CompilerContext.GetSchema();
    bool bIsErrorFree = true;

    // Временная переменная для хранения результата
    const FEdGraphPinType& PinType = GetOutStructPin()->PinType;
    UK2Node_TemporaryVariable* TempVarOutput = 
        CompilerContext.SpawnInternalVariable(
            this, PinType.PinCategory, PinType.PinSubCategory, 
            PinType.PinSubCategoryObject.Get(), 
            PinType.ContainerType, PinType.PinValueType);
    
    // Нода присваивания
    UK2Node_AssignmentStatement* AssignNode = 
        CompilerContext.SpawnIntermediateNode<UK2Node_AssignmentStatement>(
            this, SourceGraph);
    
    // Нода вызова функции GetInstancedStructValue
    UK2Node_CallFunction* const GetStructValueNode = 
        CompilerContext.SpawnIntermediateNode<UK2Node_CallFunction>(
            this, SourceGraph);
Объяснить с
```

`SpawnIntermediateNode` создаёт ноду, которая существует только во время компиляции. Пользователь никогда её не увидит.

`SpawnInternalVariable` создаёт временную переменную нужного типа.

```cpp
// 4. Настраиваем промежуточные ноды
    GetStructValueNode->SetFromFunction(GetInstStructValueFunc);
    GetStructValueNode->AllocateDefaultPins();
    AssignNode->AllocateDefaultPins();

    CompilerContext.MessageLog.NotifyIntermediateObjectCreation(GetStructValueNode, this);
    CompilerContext.MessageLog.NotifyIntermediateObjectCreation(AssignNode, this);
Объяснить с
```

`NotifyIntermediateObjectCreation` регистрирует промежуточную ноду в логе компиляции. Нужно для отладки: если промежуточная нода выдаст ошибку, лог укажет на вашу оригинальную ноду.

```cpp
// 5. Перекидываем соединения с нашей ноды на промежуточные
    UEdGraphPin* ExecPin = GetStructValueNode->GetExecPin();
    UEdGraphPin* ValidPin = GetStructValueNode->FindPinChecked(TEXT("Valid"));
    UEdGraphPin* InvalidPin = GetStructValueNode->FindPinChecked(TEXT("NotValid"));
    UEdGraphPin* OutStructPin = GetStructValueNode->FindPinChecked(TEXT("Value"));
    UEdGraphPin* InstancedStructPin = GetStructValueNode->FindPinChecked(TEXT("InstancedStruct"));

    // Exec: наш вход → функция GetInstancedStructValue
    bIsErrorFree &= CompilerContext.MovePinLinksToIntermediate(
        *GetExecPin(), *ExecPin).CanSafeConnect();
    
    // Данные: наш InstancedStruct вход → функция
    bIsErrorFree &= CompilerContext.MovePinLinksToIntermediate(
        *GetInstancedStructPin(), *InstancedStructPin).CanSafeConnect();

    // Данные: наш выход → временная переменная
    bIsErrorFree &= CompilerContext.MovePinLinksToIntermediate(
        *GetOutStructPin(), *TempVarOutput->GetVariablePin()).CanSafeConnect();
    
    // Присваивание: переменная = результат функции
    bIsErrorFree &= Schema->TryCreateConnection(
        AssignNode->GetVariablePin(), TempVarOutput->GetVariablePin());
    bIsErrorFree &= Schema->TryCreateConnection(
        AssignNode->GetValuePin(), OutStructPin);

    // Exec-поток: Valid → Присваивание → наш Valid выход
    bIsErrorFree &= Schema->TryCreateConnection(ValidPin, AssignNode->GetExecPin());
    bIsErrorFree &= CompilerContext.MovePinLinksToIntermediate(
        *GetInvalidPin(), *InvalidPin).CanSafeConnect();
    bIsErrorFree &= CompilerContext.MovePinLinksToIntermediate(
        *GetValidPin(), *AssignNode->GetThenPin()).CanSafeConnect();
Объяснить с
```

Здесь два ключевых метода:

- `**MovePinLinksToIntermediate()**` - переносит все соединения с одного пина на другой. «Наш пин → промежуточный пин». После этого к нашей ноде ничего не подключено.
- `**TryCreateConnection()**` - создаёт новое соединение между двумя пинами промежуточных нод.

Логика exec-потока: `Valid` выход функции идёт в ноду присваивания, а уже из ноды присваивания (её `Then` пин) в наш `Valid` exec-выход. Это гарантирует, что выходные данные будут записаны до того, как выполнение пойдёт дальше.

```cpp
// 6. Проверка и самоудаление
    if (!bIsErrorFree)
    {
        CompilerContext.MessageLog.Error(
            *LOCTEXT("InternalConnectionError", 
                     "GetInstancedStructValueByType: Internal connection error. @@")
            .ToString(), this);
    }
    
    BreakAllNodeLinks();
}
Объяснить с
```

`BreakAllNodeLinks()` - критически важно! Наша нода удаляет все свои связи, потому что все соединения уже перенесены на промежуточные ноды. Без этого компилятор увидит «подвисшие» связи и может выдать ошибки.

Визуально весь процесс можно представить так:

```
До ExpandNode:
    [Что-то] → [Наша нода] → [Что-то ещё]

После ExpandNode:
    [Что-то] → [GetInstancedStructValue] → [AssignNode] → [Что-то ещё]
                                              ↕
                                        [TempVariable]
    
    [Наша нода] (все связи оборваны, компилятор её игнорирует)
Объяснить с
```

---

### Wildcard-пины и динамическая типизация

Одна из самых мощных возможностей K2Node - wildcard-пины. Это пины типа `PC_Wildcard`, которые изначально не имеют конкретного типа (серые в редакторе) и определяют его позже. В примере выше выходной пин `OutStruct` создаётся как wildcard:

```cpp
CreatePin(EGPD_Output, UEdGraphSchema_K2::PC_Wildcard, 
          UK2Node_ItemData_PinNames::OutStructPinName);Объяснить с
```

Когда пользователь выбирает тип в `PropertyType`, базовый класс ловит изменение и обновляет пин:

```cpp
OutPin->PinType.PinSubCategoryObject = ChosenType;
OutPin->PinType.PinCategory = (ChosenType == nullptr) ? 
    UEdGraphSchema_K2::PC_Wildcard : UEdGraphSchema_K2::PC_Struct;Объяснить с
```

Серый пин превращается в голубой (структура). Работает и в обратную сторону: если к выходу подключить конкретный тип — нода выведет его из подключения (см. `RefreshOutputPropertyType()` в базовом классе).

**Важно:** wildcard-пин сам по себе ничего не делает. Если не переопределить `PinConnectionListChanged()` / `PinDefaultValueChanged()` — он останется серым навсегда.

## Custom Thunk: wildcard без K2Node

Для полноты картины — ещё один способ получить wildcard-поведение. Custom Thunk (`DECLARE_FUNCTION` + `CustomThunk`) даёт доступ к стеку VM напрямую:

```cpp
// MyLibrary.h

UFUNCTION(BlueprintCallable, CustomThunk, 
          meta=(CustomStructureParam="OutValue"))
static void GetStructValue(const FInstancedStruct& Struct, 
                           int32& OutValue);

// "Реальная" реализация (как бы это ни звучало) - движок вызовет её
// вместо сгенерированной обёртки
DECLARE_FUNCTION(execGetStructValue);Объяснить с
```
```cpp
// MyLibrary.cpp

DEFINE_FUNCTION(UMyLibrary::execGetStructValue)
{
    // Ручной разбор параметров со стека Blueprint VM
    Stack.StepCompiledIn<FStructProperty>(nullptr);
    FInstancedStruct* Struct = (FInstancedStruct*)Stack.MostRecentPropertyAddress;

    Stack.StepCompiledIn<FProperty>(nullptr);
    void* OutValuePtr = Stack.MostRecentPropertyAddress;
    FProperty* OutValueProp = Stack.MostRecentProperty;

    P_FINISH;

    if (Struct && Struct->IsValid() && OutValuePtr)
    {
        const UScriptStruct* ScriptStruct = Struct->GetScriptStruct();
        ScriptStruct->CopyScriptStruct(OutValuePtr, Struct->GetMemory());
    }
}Объяснить с
```

`CustomStructureParam` говорит движку: «этот пин принимает любую структуру». В Blueprint он будет выглядеть как wildcard, а тип подставится при подключении. Вы получаете «generic»-поведение без единой строчки K2Node-кода, но с полным контролем над стеком VM.

**Ограничение:** Custom Thunk работает с типами пинов, но не даёт контроля над exec-потоком, динамическим добавлением/удалением пинов.

Custom Thunk - это уже работа на уровне виртуальной машины Blueprint. Чтобы понять, что происходит на этом уровне (и почему `ExpandNode()` в итоге тоже превращается в стековые операции), разберём компиляцию Blueprint.

---

### Компиляция Blueprint: как нода превращается в байткод

Чтобы полностью понять K2Node, нужно хотя бы в общих чертах представлять, как работает компилятор Blueprint.

#### Фазы компиляции

1. **Clean And Sanitize Class** \- старый `UBlueprintGeneratedClass` очищается. Свойства и функции перемещаются во временный «мусорный» класс. Класс компилируется «in-place», указатель на класс не меняется.
2. **Create Class Variables**  - компилятор проходит по массиву  `NewVariables`  в Blueprint (а также по Construction Script и другим местам) и создаёт  `FProperty`  в контексте `UClass`  через  `CreateClassVariablesFromBlueprint()`.
3. **Create Function List** - обрабатываются Event Graph и обычные Function Graph:
	- **Event Graph** - все графы событий объединяются в один «UberGraph». **Именно здесь ноды получают шанс раскрыться через** `**ExpandNode()**`. Для каждого Event создаётся заглушка функции.
	- **Function Graph** - каждый граф копируется во временный граф, и снова вызывается `ExpandNode()`.
4. **Pre-compile Functions** - для каждой функции: планирование исполнения, вычисление зависимостей данных, обрезка неиспользуемых нод, вызов `RegisterNets()` для создания `FKismetTerm` 'ов, создание `UFunction` и свойств.
5. **Bind And Link Class** — заполняется цепочка свойств, размер объекта, карта функций. Создаётся CDO (Class Default Object).
6. **Compile Functions** — генерируются `FKismetCompiledStatement` для каждой ноды через `FNodeHandlingFunctor::Compile()`.
7. **Finish Compiling Class** — финализация флагов, наследование метаданных от родителя.
8. **Backend** — `FKismetCompilerVMBackend` конвертирует скомпилированные стейтменты в **байткод виртуальной машины UE** (массив `uint8` в `UFunction::Script`).
9. **Copy CDO Properties** — значения из старого CDO переносятся в новый через `CopyPropertiesForUnrelatedObjects()`.
10. **Reinstancing** — все существующие экземпляры класса пересоздаются с новой структурой.

**Почему pure-функции дороже, чем кажется.** На этапе 6, описанном выше, становится понятна цена pure-нод (нод без exec-пинов). Компилятор планирует исполнение по exec-цепочке, и у него нет способа закешировать результат pure-ноды - она не участвует в потоке исполнения. Поэтому если вы подключили выход pure-ноды к трём разным входам, она будет вычислена три раза. Impure-нода с exec-пином вычисляется ровно один раз в момент, когда до неё дошёл поток исполнения, а результат сохраняется. Так что тяжёлые вычисления в pure-ноде, растянутой на весь граф - классический способ незаметно просадить перформанс.

#### Где в этой цепочке K2Node?

Ваш `ExpandNode()` вызывается на **этапе 3** при обработке графов. К этому моменту граф уже скопирован во временную версию, и вы можете свободно создавать промежуточные ноды, не затрагивая оригинал.

Если ваша нода не переопределяет `ExpandNode()` (как `UK2Node_CallFunction`), она обрабатывается стандартным `FNodeHandlingFunctor` на шаге 6 - его `RegisterNets()` регистрирует пины, а `Compile()` генерирует стейтменты вызова функции.

#### FNodeHandlingFunctor - для продвинутых

Если `ExpandNode()` недостаточно (например, нужно контролировать exec-поток на уровне байткода), можно написать свой `FNodeHandlingFunctor`:

```cpp
class FKCHandler_MyNode : public FNodeHandlingFunctor
{
public:
    FKCHandler_MyNode(FKismetCompilerContext& InCompilerContext)
        : FNodeHandlingFunctor(InCompilerContext) { }

    virtual void RegisterNets(FKismetFunctionContext& Context, 
                              UEdGraphNode* Node) override;
    virtual void Compile(FKismetFunctionContext& Context, 
                         UEdGraphNode* Node) override;
};
Объяснить с
```

Это самый глубокий уровень кастомизации. `RegisterNets` создаёт временные переменные для промежуточных результатов, `Compile` генерирует `FBlueprintCompiledStatement` напрямую. В большинстве случаев вам это не понадобится — `ExpandNode()` покрывает 95% случаев.

---

### Советы и подводные камни

#### 1\. Всегда используйте LOCTEXT\_NAMESPACE

```cpp
#define LOCTEXT_NAMESPACE "K2Node_MyNode"

// ...весь код...

#undef LOCTEXT_NAMESPACE
Объяснить с
```

Без уникального неймспейса можно получить конфликты строковых идентификаторов с другими нодами. Ошибки будут неочевидными — например, тултип одной ноды покажется на другой.

#### 2\. FindPinChecked vs FindPin

- `FindPinChecked()` — крашнет, если пин не найден. Используйте для пинов промежуточных нод, где вы уверены в именах.
- `FindPin()` — вернёт `nullptr`. Используйте для пинов вашей ноды, где состояние может быть неопределённым.

#### 3\. Save Intermediate Build Products

В Blueprint Editor: **File → Developer → Save Intermediate Build Products**. Это сохраняет промежуточный граф после `ExpandNode()`. Бесценно для отладки — можно увидеть, во что именно раскрылась ваша нода.

#### 4\. Буфер обмена — ваш друг

`Ctrl+C` на ноде в Blueprint Editor, потом вставка в текстовый редактор — покажет полное текстовое представление ноды со всеми пинами и их состоянием. Используйте для понимания, как устроены встроенные ноды.

#### 5\. IsNodeSafeToIgnore()

Если ваша нода полностью раскрывается в промежуточные ноды и не должна присутствовать в финальном графе - верните `true`. Это подскажет компилятору, что ноду можно безопасно пропустить.

#### 6\. Не забывайте NotifyGraphChanged()

После любого изменения типов пинов вызывайте:

```cpp
if (UEdGraph* Graph = GetGraph())
{
    Graph->NotifyGraphChanged();
}Объяснить с
```

Иначе визуальное состояние графа рассинхронизируется с реальным.

#### 7\. Изучайте исходники движка

Лучший учебник по K2Node - это `Source/Editor/BlueprintGraph/Classes/`. Особенно рекомендую:

- `K2Node_SpawnActorFromClass` - хороший пример `ExpandNode()` с комментариями.
- `K2Node_GetDataTableRow` - пример wildcard-пинов.
- `K2Node_SwitchEnum` - пример динамических пинов.

---

## Бонус: статические делегаты в Blueprint

Допустим, нужно подписаться из Blueprint на статический делегат, например, `FViewport::ViewportResizedEvent`. Прямого доступа к нему из Blueprint нет, но задача решается через `BlueprintFunctionLibrary` + handle-структуру для управления временем жизни подписки.

```cpp
// ViewportHelpers.h

/** Делегат, который Blueprint сможет привязать через пин */
DECLARE_DYNAMIC_DELEGATE_TwoParams(FOnViewportResizedDelegate, 
                                    int32, NewWidth, 
                                    int32, NewHeight);

/** Handle для отписки - непрозрачная обёртка над ID */
USTRUCT(BlueprintType)
struct FViewportResizeBindingHandle
{
    GENERATED_BODY()

    FViewportResizeBindingHandle() : Id(0) {}
    explicit FViewportResizeBindingHandle(uint64 InId) : Id(InId) {}

    bool IsValid() const { return Id != 0; }
    void Invalidate() { Id = 0; }

private:
    UPROPERTY()
    uint64 Id = 0;

    friend class UViewportHelpers;
};Объяснить с
```

Подписка и отписка

```cpp
// ViewportHelpers.h

UCLASS()
class UViewportHelpers : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    /**
     * Подписаться на изменение размера вьюпорта.
     * AutoCreateRefTerm="Event" создаёт пин делегата,
     * который Blueprint-пользователь может привязать к кастомному евенту.
     */
    UFUNCTION(BlueprintCallable, Category = "Viewport Helpers|Resize",
              meta = (AutoCreateRefTerm = "Event"))
    static FViewportResizeBindingHandle BindViewportResize(
        const FOnViewportResizedDelegate& Event);

    /** Отписаться по handle */
    UFUNCTION(BlueprintCallable, Category = "Viewport Helpers|Resize")
    static void UnbindViewportResize(
        UPARAM(ref) FViewportResizeBindingHandle& Handle);

    /** Отписать всех */
    UFUNCTION(BlueprintCallable, Category = "Viewport Helpers|Resize")
    static void UnbindAllViewportResize();
};Объяснить с
```

Внутренняя кухня - статический массив подписок

```cpp
// ViewportHelpers.cpp

namespace UE::WidgetRenderExtensions::Private
{
    struct FViewportResizeBinding
    {
        FOnViewportResizedDelegate Delegate;
        uint64 Id;
    };

    static TArray<FViewportResizeBinding> GBindings;
    static FDelegateHandle GEngineHandle;
    static uint64 GNextId = 1;

    static void OnViewportResized(FViewport*, uint32)
    {
        FVector2D ViewportSize = FVector2D::ZeroVector;
        if (GEngine && GEngine->GameViewport)
        {
            GEngine->GameViewport->GetViewportSize(ViewportSize);
        }

        const int32 Width = static_cast<int32>(ViewportSize.X);
        const int32 Height = static_cast<int32>(ViewportSize.Y);

        // Итерируем в обратном порядке - RemoveAtSwap безопасен
        for (int32 i = GBindings.Num() - 1; i >= 0; --i)
        {
            if (GBindings[i].Delegate.IsBound())
            {
                GBindings[i].Delegate.Execute(Width, Height);
            }
            else
            {
                // Авто-очистка: привязанный объект уже уничтожен
                GBindings.RemoveAtSwap(i);
            }
        }

        // Авто-отписка когда подписчиков не осталось
        if (GBindings.Num() == 0 && GEngineHandle.IsValid())
        {
            if (GEngine && GEngine->GameViewport && GEngine->GameViewport->Viewport)
            {
                GEngine->GameViewport->Viewport->ViewportResizedEvent
                    .Remove(GEngineHandle);
            }
            GEngineHandle.Reset();
        }
    }

    static void EnsureRegistered()
    {
        if (GEngineHandle.IsValid()) return;
        if (!GEngine || !GEngine->GameViewport 
            || !GEngine->GameViewport->Viewport) return;

        GEngineHandle = GEngine->GameViewport->Viewport
            ->ViewportResizedEvent.AddStatic(&OnViewportResized);
    }
}Объяснить с
```

Реализация Bind/Unbind

```cpp
FViewportResizeBindingHandle UViewportHelpers::BindViewportResize(
    const FOnViewportResizedDelegate& Event)
{
    using namespace UE::WidgetRenderExtensions::Private;

    if (!Event.IsBound()) return FViewportResizeBindingHandle();

    EnsureRegistered();

    const uint64 Id = GNextId++;
    GBindings.Add({ Event, Id });

    return FViewportResizeBindingHandle(Id);
}

void UViewportHelpers::UnbindViewportResize(
    FViewportResizeBindingHandle& Handle)
{
    using namespace UE::WidgetRenderExtensions::Private;

    if (!Handle.IsValid()) return;

    const uint64 TargetId = Handle.Id;
    Handle.Invalidate();

    GBindings.RemoveAll([TargetId](const FViewportResizeBinding& B)
    {
        return B.Id == TargetId;
    });

    // Отписываемся от движка, если подписчиков не осталось
    if (GBindings.Num() == 0 && GEngineHandle.IsValid())
    {
        if (GEngine && GEngine->GameViewport && GEngine->GameViewport->Viewport)
        {
            GEngine->GameViewport->Viewport->ViewportResizedEvent
                .Remove(GEngineHandle);
        }
        GEngineHandle.Reset();
    }
}Объяснить с
```

#### Что здесь важно

Ключевой трюк - `meta=(AutoCreateRefTerm="Event")`. Без него Blueprint потребует передать уже существующий делегат. С ним - в ноде появляется красный пин, к которому можно привязать кастомный евент прямо на месте.

Вторая важная деталь - авто-очистка. Dynamic-делегат хранит `TWeakObjectPtr` на привязанный объект. Когда объект уничтожается, `IsBound()` возвращает `false`, и мы спокойно чистим подписку при следующем вызове. Никаких висячих указателей.

![](https://habrastorage.org/r/w780/getpro/habr/upload_files/c02/278/95e/c0227895e65db29f586d94ae2455c805.png)

### Заключение

K2Node - это мощный, по-своему красивый, но нишевый инструмент. Надеюсь, статья сэкономит вам те часы, которые я потратил на чтение исходников движка и расставление брейкпоинтов в `KismetCompiler.cpp`.

Мы дошли до момента, где `ExpandNode()` передаёт промежуточные ноды компилятору. Но что дальше? Как `FKismetCompiledStatement` превращается в массив байт внутри `UFunction::Script`? Что такое `EExprToken` и почему Blueprint VM стековая, а не регистровая? Об этом - в следующей статье. Если вам интереснее кастомный UI нод через `SGraphNode` (с разбором [моего плагина Timeline для UObject](https://github.com/PsinaDev/UnrealUObjectTimeline)) или создание нод для Anim Graph - пишите в комментариях.
