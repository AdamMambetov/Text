---
created: 2025-04-05T14:29:22+03:00
modified: 2025-04-11T22:22:07+03:00
category:
  - "[[Программирование]]"
meta:
  - "[[Ruby]]"
---

# Синтаксис в Ruby

## Комментарий
```ruby
# однострочный комментарий

=begin
многострочный комментарий
=end
```

## Ввод и вывод в консоли

### Вывод

Есть 2 команды вывода текста в консоль: `puts`  и `print`. Разница между ними в том, что `puts` автоматически переводит на новую строку после вывода.

```ruby
puts "Hello"
puts "World!"
# Hello
# World!

print "Hello"
print "World!"
# HelloWorld!

puts "hello" # print "hello\n"
```

### Ввод

Для ввода данных в консоль используется функция `gets`. По умолчанию `gets` возвращает *[[ruby string|String]]*. Причём в конце окажется [[whitespace#n | специальный символ \n]]. Чтобы получить текст без этого символа используйте метод *[[ruby string#chomp|chomp]]* или *[[ruby string#strip|strip]]*.

## Типы данных

![[ruby types.excalidraw|650]]

Все типы переменных образованы от базового типа *Object*. Следовательно, все переменные являются объектами со своими полями и методами.

## Приведение типов

У каждого объекта есть методы для приведения типов:
```ruby
var_name.to_i # к типу Integer
var_name.to_f # к типу Float
var_name.to_s # к типу String
var_name.to_a # к типу Array
```

## String Interpolation

Подстановка переменных в строку. Работает только с двойными кавычками!

```ruby
x = 4
y = 1
puts "x = #{x}, y = #{y}" # Выведет: x = 4, y = 1
```

## Оператор !

Значит, что результат данной функции будет присвоен данной переменной.

```ruby
x = gets
x.chomp! # x = x.chomp
```

## Доступные методы

```ruby
var_name.methods
```

Метод `methods` вернёт массив всех доступных методов для переменной данного типа.

## Pipes

Параметры получаемые в функции оборачиваются в `| |` скобки называемые *pipes*. 
```ruby
10.times { |i| puts i }
```


## Random number

Возвращает псевдо-случайное число. Если ничего не передавать то вернёт *Float* \[0..1]. Если передать число `x` то вернёт *Integer* \[0..x). Если передать *Range* то вернёт число в этом в переданном диапазоне.

```ruby
rand()     # [0..1]
rand(5)    # [0..5)
rand(3..7) # [3..7]
```


## If

```ruby
a = 10

if a == 5
	puts "a == 5"
end

if a == 0
	puts "a == 0"
elsif a == 10
	puts "a == 10"
else
	puts "a is undefined"
end
```

## Операторы сравнения

```ruby
a == 0  # equal
a != 0  # not equal
a > 0   # more
a < 0   # less
a >= 0  # more equal
a <= 0  # less equal
```

## Логические операторы

```ruby
a and b  # and operator
a && b   # and operator
a or b   # or operator
a || b   # or operator
```

## Символ `_` в числах

При записи чисел можно добавить символ `_` как разделитель. Этот символ будет игнорироваться.

```ruby
a = 1_000_000
```

## [Range](https://docs.ruby-lang.org/en/master/Range.html)

```ruby
(1..5)  # => [1, 2, 3, 4, 5]
(1...5) # => [1, 2, 3, 4]
```

## [Array](https://docs.ruby-lang.org/en/master/Array.html)

```ruby
arr = [1, 2, 3]
arr = %w[Mike Walter Saul] # => ["Mike", "Walter", "Saul"]
arr = %i[foo bar baz] # => [:foo, :bar, :baz]
arr = Array(10) # => [10]
arr = Array(1..3) # => [1, 2, 3]
arr = Array.new # => []
```

## [Hash](https://docs.ruby-lang.org/en/master/Hash.html)

Ассоциативный массив, `std::map` в C++ или `Dictionary` в GDScript.  
Для инициализации можно использовать либо '=>' (*hash rocket*) либо `:`. При использовании *:* ключ превращается в `Symbol`.

```ruby
hh = {} # => {}
hh = {'id' => 0} # => {"id"=>0}
hh = {foo: 0, :bar => 1, 'baz': 2} # => {:foo=>0, :bar=>1, :baz=>2}

x = 0
y = 100
h = {x:, y:} # => {:x=>0, :y=>100}
```

###  Полезные методы

```ruby
# Есть ли ключ в хеше.
if hh.has_key? "KEY"
	...
end
if hh["KEY"]
	...
end
```

## Class

```ruby
class YourClassName
	attr_reader :member, :member2   # добавляет getter для данной переменной
	attr_accessor :member # добавляет getter и setter для данной переменной

	# Constructor
	def initialize
		@member = 0
	end
end
```

## Switch case

```ruby
case member
when 1
	puts "one"
when 2
	puts "two"
else
	puts "other"
end
```

## Continue

В Руби `continue` пишется записывается как `next`.