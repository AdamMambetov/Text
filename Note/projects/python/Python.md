---
created: 2025-03-29T23:32:09+03:00
aliases:
  - python
  - Питон
  - питон
category:
  - "[[Программирование]]"
  - "[[Искусственный интеллект|AI]]"
---

# Python

Python - язык программирования, вроде как используется для бэкенда.


## Примеры

### Ввод через консоль

``` python
name = input()
print(name, sep=", ", end="!")
```


### Обход по всем файлам в папке

```python
import os

def files(path):
	for file in os.listdir(path):
		if os.path.isfile(os.path.join(path, file)):
			yield file

for file in files("."):
	print(file)
```


### Переименовать файл

```python
import os

os.rename(PATH + file, PATH + new_name)
```

