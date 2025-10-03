---
created: 2024-06-06T19:08:08+03:00
modified: 2025-04-11T22:22:26+03:00
category:
  - "[[Программирование]]"
meta:
  - "[[Ruby]]"
---

# String

[Документация](https://docs.ruby-lang.org/en/master/String.html)

## Merge variables

```ruby
"The #{name} is cool man."
```

## Methods

### chomp

Убирает [[whitespace#n | \n]] в конце строки, если он есть.  
Можно использовать [[ruby syntax#Оператор ! | оператор !]]

### strip

Убирает все [[whitespace | специальные символы]] и пробелы в начале и в конце строки.  
Можно использовать [[ruby syntax#Оператор ! | оператор !]]

### capitalize

Делает первый символ в строке заглавным, а все остальные строчными.  
Можно использовать [[ruby syntax#Оператор ! | оператор !]]

### include?

Проверяет есть ли в строке подстрока. Принимает String и возвращает Bool.

```ruby
str = "yvugyctcdeniedvuvuvyv"
puts str.include? "denied"
```
