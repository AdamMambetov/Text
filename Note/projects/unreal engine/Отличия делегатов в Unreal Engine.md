---
created: 2024-07-17T16:17:12+03:00
modified: 2025-04-11T23:12:21+03:00
tags:
  - source/article
category:
  - "[[Программирование]]"
meta:
  - "[[Unreal Engine]]"
  - "[[C++]]"
source: https://dtf.ru/u/44029-mitek/1031892-otlichiya-delegatov-v-unreal-engine
---

# Отличия делегатов в Unreal Engine

Это перевод статьи из моего англоязычного блога. Оригинал [тут](https://superyateam.com/2021/12/06/difference-between-delegates-in-ue4)

Делегаты в _Unreal Engine_ - это реализация известного паттерна проектирования _Observer_. Клиентский класс подписывается на делегат и слушает программные события, а класс, публикующий делегат, может в свою очередь уведомлять всех клиентов, даже не зная, существуют они или нет. В целом, это делает код менее связанным.

Я решил написать эту небольшую шпаргалку, чтобы самому разобраться в отличиях между делегатами. Потому что раньше, чтобы ответить на вопрос: "**_Какой делегат использовать сейчас?_**" мне приходилось лазить по туториалам и докам, собирая всю информацию вместе.

> Какой делегат использовать сейчас?

## Static Delegates

Static Delegate - это самый простой делегат, он позволяет добавлять только один обработчик событий.

Допустим, каждый раз когда вы стреляете, вам надо отправлять событие. Вот так вы декларируете и объявляете делегат:

```cpp
DECLARE_DELEGATE(FStaticDelegate);

class FFireHandler
{
    void OnFire();
}

class AGunner : public ACharacter
{
    FFireHandler* FireHandler;
    FStaticDelegate OnFireDelegate;
}
```

А вот так использовать его:

```cpp
FireHandler = new FFireHandler();
OnFireDelegate.BindRaw(FireHandler, &FFireHandler::OnFire);
...
OnFireDelegate.ExecuteIfBound();
```

Статический делегат работает только с обычными классами, но если вы хотите слушать его из наследника ==UObject==, то используйте функцию: ==OnFireDelegate.BindUObject==

> Когда использовать?
> 
> Когда вам нужен самый простой и быстрый способ обработать событие.

## Static Multicast Delegates

В отличии от простого статического делегата, к Static Multicast Delegate можно добавлять несколько обработчиков событий с помощью метода ==AddRaw:==

```cpp
DECLARE_MULTICAST_DELEGATE(FStaticMulticastDelegate);

class FFireHandler
{
    void OnFire();
}

class AGunner : public ACharacter
{
    FFireHandler* FireHandler;
    FFireHandler* FireHandler2;
    FStaticMulticastDelegate OnFireDelegate;
}
```

И код клиентского класса:

```cpp
FireHandler = new FFireHandler();
FireHandler2 = new FFireHandler();
OnFireDelegate.AddRaw(FireHandler, &FFireHandler::OnFire);
OnFireDelegate.AddRaw(FireHandler2, &FFireHandler::OnFire);
...
OnFireDelegate.Broadcast();
```

Обратите внимание, что для отправления события используется метод ==Broadcast==. Он хорош тем, что не нужно проверять, есть ли обработчики событий у данного делегата или нет.

> Когда использовать?
> 
> Когда вам нужен больше чем один обработчик.

## Dynamic Delegates

Простые динамические делегаты - самые скучные из всех. Их отличие от статических в том, что их можно сериализовывать. При этом они медленнее.

Объявлять их надо так:

```cpp
DECLARE_DYNAMIC_DELEGATE(FDynamicDelegate);

class AGunner : public ACharacter
{
    FDynamicDelegate OnFireDelegate;

    UFUNCTION()
    void OnFireHandler();
}
```

Важный момент: функцию-обработчик следует аннотировать макросом ==UFUNCTION==.

А так использовать:

```cpp
OnFireDelegate.BindDynamic(this, &AGunner::OnFireHandler)
...
OnFireDelegate.ExecuteIfBound();
```

> Когда использовать?  
>   
> Когда вы имеете дело с сериализацией.

## Dynamic Multicast Delegates

И наконец, самый многофункциональный делегат. Dynamic Multicast Delegates обладают характеристиками всех остальных. И это позволяет использовать их в блюпринтах.

Вот так они объявляются:

```cpp
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FDynamicMulticastDelegate);

class AGunner : public ACharacter
{
    UPROPERTY(BlueprintAssignable);
    FDynamicMulticastDelegate OnFireDelegate;
}
```

Делегат нужно аннотировать макросом ==UPROPERTY(BlueprintAssignable)==, чтобы использовать его в блюпринте:

![[Pasted image 20240717162253.png]]

Конечно же, такой делегат можно обрабатывать и в C++:

```cpp
OnFireDelegate.AddDynamic(this, &AGunner::OnFireHandler)
...
OnFireDelegate.Broadcast();
```

Так же, как и в случае с Dynamic Delegate, функцию-обработчик нужно аннотировать макросом ==UFUNCTION==.

> Когда использовать?
> 
> Когда обрабатывать событие нужно в блюпринте.