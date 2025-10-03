---
created: 2024-12-26T19:23:52+03:00
aliases:
  - how use blueprint class in c++
category:
  - "[[Программирование]]"
issue:
  - "[[Как получить блюпринт класс в C++]]"
meta:
  - "[[Unreal Engine]]"
  - "[[C++]]"
---

# Как получить блюпринт класс в C++

```cpp
static ConstructorHelpers::FClassFinder<AActor> ExampleActor(TEXT("/Game/BP_Example.BP_Example_C"));
if (ExampleActor.Class)
{
	// your code
}
```
