---
created: 2026-02-12T01:25:36+03:00
category:
  - "[[Программирование]]"
meta:
  - "[[Unreal Engine]]"
---

# Blueprint Predicate

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