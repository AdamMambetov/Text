---
created: 2025-01-28T14:31:06+03:00
modified: 2025-04-11T22:29:10+03:00
aliases:
  - git
category:
  - "[[Программирование]]"
source: https://git-scm.com/
---

# Git

## Команды

>[!note]- Удалить коммит
> Удалить коммит и оставить изменения
> 1 - количество коммитов
> ```bash
> git reset HEAD~1
> ```
> 
> Удалить коммит и изменения
> 1 - количество коммитов
> ```bash
> git reset --hard HEAD~1
> ``` 

>[!note]- Локальный репозиторий
> Инициализация. Не знаю зачем, но чувак создал папку с суффиксом .git. Допустим мы в папке repo.git
> ```bash
> git --bare init
> ```
> 
> Подключение
> ```bash
> git remote add origin С:/Path/to/repo.git
> ```

>[!note]- Сбросить удалённый репозиторий
> ```bash
> git remote remove origin
> ```

## Ссылки

 - https://www.conventionalcommits.org/en/v1.0.0/#specification
 - https://semver.org/
 - https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
 - https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines

## Прочее

![[photo_382406_132 - 20231203173834308.jpg]]
