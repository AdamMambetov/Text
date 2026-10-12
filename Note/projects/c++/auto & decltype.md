---
created: 2025-04-05T14:29:22+03:00
category:
  - "[[Программирование]]"
meta:
  - "[[C++]]"
---

# ➡️ auto & decltype

- auto-типизированные переменные выводятся компилятором на основе типа их инициализатора.
- Чрезвычайно полезно с точки зрения удобочитаемости, особенно для сложных типов:

```cpp
// std::vector<int>::const_iterator cit = v.cbegin();
auto cit = v.cbegin(); // альтернатива

// std::shared_ptr<vector<uint32_t>> demo_ptr(new vector<uint32_t>(0);
auto demo_ptr = make_shared<vector<uint32_t>>(0); // альтернатива
```

 - Функции также могут выводить тип возвращаемого значения с помощью auto. В C++11 тип возвращаемого значения должен быть указан либо явно, либо с помощью decltype, например:

```cpp
template <typename X, typename Y>
auto add(X x, Y y) -> decltype(x + y)
{
    return x + y;
}
add(1, 2);     // == 3
add(1, 2.0);   // == 3.0
add(1.5, 1.5); // == 3.0
```

Приведенная выше форма определения возвращаемого типа называется trailing return type, т.е. -> `return-type`.