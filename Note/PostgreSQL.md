---
created: 2026-06-28T07:37:54+03:00
aliases: ["PostgreSQL", "psql"]
category: ["[[Программирование]]"]
---

# PostgreSQL

## Как установить с помощью Termux

Обновите пакеты и установите PostgreSQL:
```bash
pkg update
pkg install postgresql
```

Создайте каталог данных и инициализируйте базу:
```bash
mkdir -p $PREFIX/var/lib/postgresql
initdb $PREFIX/var/lib/postgresql
```
Именно этот каталог рекомендуется как хранилище данных для Termux.

Запустите сервер:
```bash
pg_ctl -D $PREFIX/var/lib/postgresql start
```

Остановка выполняется той же командой, "но с `stop`.

Подключитесь к консоли:
```bash
psql postgres
```

После этого можно создавать пользователей и базы через `createuser` и `createdb`.

Создать суперпользователя:
```bash
createuser --superuser --pwprompt myuser
```

Создать базу:
```bash
createdb mydb
```

Зайти в базу:
```bash
psql mydb
```

### Добавление расширения Apache AGE

Обнови пакеты и поставь базовые инструменты сборки:
```bash
pkg update && pkg upgrade
pkg install git clang make pkg-config flex bison openssl zlib readline perl
```

Собрать Apache AGE:
```bash
git clone https://github.com/apache/age.git
cd age
make PG_CONFIG=$PREFIX/bin/pg_config LDFLAGS="-lm"
make PG_CONFIG=$PREFIX/bin/pg_config LDFLAGS="-lm" install
```

Для проверки:
```sql
CREATE EXTENSION age;
LOAD 'age';
SET search_path = ag_catalog", "$user", public;
SELECT create_graph('music');
```