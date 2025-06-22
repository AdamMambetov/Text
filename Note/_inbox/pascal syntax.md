---
created: 2024-07-03T21:02:40+03:00
modified: 2025-04-04T07:32:51+03:00
creator: "[[@Адам Мамбетов]]"
related:
  - "[[Программирование]]"
---

# Pascal Operators
## Return
``` pascal
result := 1; // new pas
funcName := 1; // old pas
exit; // Выход из функции
```

## Switch
``` pascal
case 1 of
  1: write;
  2, 3: begin
    Writeln;
  end;
  else: writeln;
end;
```

## Function
``` pascal
// void VoidFunc(int a, int b) {}
procedure VoidFunc(a: integer; b: real);
begin
end;

// float FloatFunc() { return 0.f; }
function FloatFunc(): real;
begin
  result := 0.0;
end;

// void ForwardFunc();
procedure ForwardFunc(); forward;
```

## Alias
``` pascal
// Нужен для передачи массива в функцию или получения как результат
type
  TArray = array[0..10] of real;

begin
end.
```