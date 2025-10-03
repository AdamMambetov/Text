---
created: 2025-04-05T14:29:22+03:00
modified: 2025-04-11T23:18:49+03:00
tags:
  - 📥
category:
  - "[[Программирование]]"
meta:
  - "[[C++]]"
source: https://en.cppreference.com/w/cpp/language/parameter_pack
---

# Parameter pack
since C++11

```cpp
template<class... Types>
void f(Types... args);
 
f();       // OK: args contains no arguments
f(1);      // OK: args contains one argument: int
f(2, 1.0); // OK: args contains two arguments: int and double
```