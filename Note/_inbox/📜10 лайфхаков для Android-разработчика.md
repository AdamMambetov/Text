---
created: 2025-04-11T00:00:00+03:00
Creators: http://t.me/backender0
related:
  - "[[Программирование]]"
source: https://telegra.ph/10-lajfhakov-dlya-Android-razrabotchika-poleznye-extensions-na-Kotlin-04-25
---

# 10 лайфхаков для Android-разработчика

[Бэкендер](http://t.me/backender0) April 25, 2022

![](https://telegra.ph/file/e6620c0a3aeefb457e97f.png)

### Совет 1: Добивайтесь зелёной галочки

Android Studio предоставляет множество встроенных [проверок](https://www.jetbrains.com/help/idea/code-inspection.html): от юнит-тестов до линтёра. К сожалению, пока нет хорошего способа убедиться, что на CI нет предупреждений, поэтому мы разместили [наш профиль для проверки](https://gist.github.com/gpeal/97177ad27f38ef006495b0690415eba9) в репозитории, чтобы все видели один и тот же набор предупреждений.

Затем мы взяли за правило **ВСЕГДА** избавляться от предупреждений (фиксить или заглушать их). При появлении новых предупреждений (из-за рефакторинга или добавления новых проверок), мы следуем [правилу бойскаута](https://martinfowler.com/bliki/OpportunisticRefactoring.html) (всегда оставляй после себя код в лучшем состоянии, чем до тебя).

Зеленая галочка, которая находится в правом верхнем углу окна Android Studio.

Однако есть более сложный случай — точки входа, такие как фрагменты, на которые ссылаются только с помощью рефлексии (Android Studio помечает их как неиспользуемые). Чтобы избавиться от таких предупреждений мы сделали [TonalEntryPoint](https://gist.github.com/gpeal/4bddd5c5f52765fb47df234d4a4b2ba8).

Используя эту аннотацию в классе или конструкторе, который помечен как неиспользуемый, и нажимая alt+enter, мы получим возможность добавить неиспользуемый код в список точек входа.

### Совет 2: Относитесь к предупреждениям Kotlin, как к ошибкам

Для этого добавим следующий код в файл build.gradle:

```kotlin
allprojects {
    gradle.projectsEvaluated {
        tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach
        {
            kotlinOptions {
                allWarningsAsErrors = true
            }
        }
    }
}
```

### Совет 3: Делегат ViewBinding

Мы очень любим [View Binding](https://developer.android.com/topic/libraries/view-binding). Он отлично работает, и мы полностью перешли на него с ButterKnife/Kotlin Synthetics. Однако, синтаксис его создания не идеален, поэтому мы создали собственный делегат, чтобы создавать его в соответствии с жизненным циклом, это выглядит следующим образом:

```kotlin
class WifiNetworksFragment : TonalFragment(R.layout.wifi_networks_fragment) {
    private val binding: WifiNetworksFragmentBinding by viewBinding()
  ...
}

class WifiNetworkView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
    defStyleRes: Int = 0
) : FrameLayout(context, attrs, defStyleAttr, defStyleRes) {
    private val binding: WifiNetworkViewBinding by viewBinding()
  ...
}
```

Здесь можно посмотреть [полный код](https://gist.github.com/gpeal/9925b6333220dcdd3ad29d7c5081c5ea).

### Совет 4: fadeTo(visible)

Необходимость скрыть/показать view возникает часто. Для улучшения пользовательского опыта мы создали функцию `fadeTo()` в качестве замены для `View.setVisibility()` или `View.isVisible = true/false`.

```kotlin
// Функцию можно вызывать повторно, она не будет прерывать анимацию
myView.fadeTo(true)
myView.fadeTo(false)
myView.fadeTo(true, toAlpha = 0.8f)
myView.fadeTo(true, startDelay = 300)
myView.fadeTo(true, duration = 500)
```

Код функции можно найти на [GitHub](https://gist.github.com/gpeal/2784b455cfd22d7ba567fa9c24144656).

### Совет 5: mapDistinct()

Это простое сокращение для `Flow.map().distinctUntilChanged()`.

```kotlin
/**
 * Сокращение map(...).distinctUntilChanged()
 */
fun <T, V> Flow.mapDistinct(mapper: suspend (T) -> V): Flow = map(mapper).distinctUntilChanged()
```

### Совет 6: uniqueObservable()

[Delegates.observable](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.properties/-delegates/observable.html) в Kotlin очень полезен. Однако:

1. Иногда нам нужно делать что-то только при изменении значения.
2. В таком случае писать лямбда-выражение с тремя параметрами и проверку на равенство чересчур шаблонно.

Поэтому мы написали [uniqueObservable()](https://gist.github.com/gpeal/7505f6308e20a0dd59c2fd2141e19159), который будет вызывать лямбду только если значение изменится.

```kotlin
class Label @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {
    var inverted by uniqueObservable(false) { refreshDrawableState() }
    ...
}
```

### Совет 7: Отладка + Корутины и Broadcast Receivers

В настоящее время Broadcast Receivers (широковещательные приёмники) редко используются в Android. Однако они могут быть крайне полезны для тестов в процессе отладки.

Мы используем debug-only широковещательные приемники, которые, по сути, дают нам CLI для установки/обновления параметров в коде без необходимости вызывать меню отладки в UI или пересобирать приложение.

Наш coroutine friendly код будет выглядеть так:

```kotlin
context.registerReceiverInScope(scope, WifiManager.WIFI_STATE_CHANGED_ACTION) { intent ->
    val state = intent.getIntExtra(WifiManager.EXTRA_WIFI_STATE, WifiManager.WIFI_STATE_DISABLED)
    // Use wifi state here
}
```

### Совет 8: ConflatedJob

Корутины часто используются для отмены выполнения Job, перед запуском нового (например когда пользователь делает pull to refresh). [ConflatedJob](https://gist.github.com/gpeal/b77509b46bd6d1db557b952731d01101) автоматически отменяет старый Job, перед запуском нового.

```kotlin
class MyClass(private val scope: CoroutineScope) {
  private val job = ConflatedJob()

  fun retry() {
    retryJob += scope.launch {
      delay(Long.MAX_VALUE)
    }
  }
}
```

### Совет 9: Timber Property Delegate

Для логирования мы используем Timber, однако его синтаксис `Timber.tag(TAG).i(…)` - слишком громоздкий.

По аналогии с View Binding Delegate, мы написали делегат, который упрощает вызов:

```kotlin
class MyClass {
    private val log by timber()
	
    fun logSomething() {
        log.i("Hello")
        log.w(Exception(), "World")
    }
}
```

Он автоматически создает TAG на каждое свойство (а не на строку журнала, как [Timber.DebugTree](https://jakewharton.github.io/timber/timber/log/Timber.DebugTree.html)), сокращает общие суффиксы, такие как «Impl» и «ViewModel» и обрезает теги до 23 символов.

Полный код на [GitHub](https://gist.github.com/gpeal/2666c668c9e02e3064e87bcd0557e070).

### Совет 10: Number.dp

Так как в макетах обычно используют dp, а в свойствах View пиксели, часто в коде требуется конвертировать dp в пиксели. Именно поэтому [вопрос о том как это сделать](https://stackoverflow.com/questions/4605527/converting-pixels-to-dp?answertab=votes#tab-top) пользуется популярностью на StackOverflow. Мы используем для этого следующий extension на Kotlin:

```kotlin
/**
 * Вызовите эту функцию для dp и она вернет эквивалентное значение
 * в пикселях для текущего дисплея.
 * e.g. 8.dp
 */
val Number.dp get() = toFloat() * (Resources.getSystem().displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
```

С помощью этой функции очень просто обновить padding:

```kotlin
recyclerView.updatePadding(top = 14.dp.toInt())
```
