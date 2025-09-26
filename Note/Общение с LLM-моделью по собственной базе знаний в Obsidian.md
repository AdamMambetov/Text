---
created: 2025-04-23T00:00:00+03:00
modified: 2025-04-23T01:06:55+03:00
source: https://habr.com/ru/articles/901562/
category:
  - "[[Искусственный интеллект|AI]]"
meta:
  - "[[Obsidian]]"
---

# Общение с LLM-моделью по собственной базе знаний в Obsidian

[Copilot](https://www.obsidiancopilot.com/en) в [[Obsidian]] — полноценное решение для загрузки личной базы знаний в LLM-модель. С её помощью можно лучше понять себя, собрать мысли и найти новые связи в своих заметках.

Для подключения модели можно использовать множество различных поставщиков LLM-моделей.

В этой статье мы будем использовать локальную модель, запущенную с помощью Ollama. Поэтому нам понадобится командная строка, Docker и видеокарта (лучше от 24 Гб видеопамяти, или же для эксперимента можно арендовать GPU-сервер на пару часов).

## Установка Ollama

Для NVIDIA

```bash
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

Для AMD

```bash
docker run -d --device /dev/kfd --devidocker run -d --device /dev/kfd --device /dev/dri -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama:rocm
```

Загружаем модель и модель встраивания

```bash
docker exec -it ollama ollama pull qwq
docker exec -it ollama ollama pull bge-m3
```

## Установка Copilot в Obsidian

В настройках [[Obsidian]] в разделе «Community plugins» нажимаем кнопку «Browse». Набираем в поиске «Copilot», в найденных плагинах выбираем «Copilot by Logan Yang» и нажимаем «Install», а затем «Enable».

В настройках [[Obsidian]] переходим в новый раздел «Copilot».

На вкладке «Model» в разделе «Chat Models» нажимаем кнопку «Add Custom Model». Устанавливаем «Model Name» — qwq, «Display Name» — qwq, «Provider» — Ollama, «Base URL» — оставляем пустым, если Ollama запущена локально, или указываем её адрес [http://IP:11434](http://ip:11434/) и устанавливаем галку Reasoning, т. к. qwq — модель с рассуждением, и нажимаем кнопку «Add Model».

На вкладке «Model» в разделе «Embedding Models» нажимаем кнопку «Add Custom Model». Устанавливаем «Model Name» — bge-m3, «Display Name» — bge-m3, «Provider» — Ollama, «Base URL» — пустой или [http://IP:11434](http://ip:11434/) и нажимаем кнопку «Add Model».

На вкладке «QA». Устанавливаем «Auto-Index Strategy» — NEVER.

На вкладке «Basic». Устанавливаем «Default Chat Model» — qwq, «Embedding Model» — bge-m3 и «Default Mode» — Vault QA.

Закрываем [[Obsidian]], чтобы применились изменения.

## Общение с LLM-моделью

В чате с Copilot выбираем режим «vault QA» и убеждаемся, что внизу выбрана модель «qwq».

Так как мы выбрали ручную индексацию хранилища («Auto-Index Strategy» — NEVER), то перед тем как задать вопрос, необходимо вручную запустить индексацию. Нажимаем клавиши Ctrl+P и вводим «Copilot: Force reindex vault». После завершения индексации модель готова к работе.

![Пример общения с LLM-моделью](https://habrastorage.org/r/w1560/getpro/habr/upload_files/15b/602/e14/15b602e148cc5b2e7fb58060d28b0590.png)

Пример общения с LLM-моделью

## Замечание

После общения на заданную тему, если сменить разговор на другую, модель начинает путаться.

Эта ошибка решается закрытием и повторным открытием [[Obsidian]]. А после — запуск ручной индексации (Ctrl+ P и ввод «Copilot: Force reindex vault»).
