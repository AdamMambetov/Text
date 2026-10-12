Полностью клонировать ChannelView не нужно: обработчику и проверке активности нужен только ChannelId (он Copy), а отображению — name, который можно переместить в DOM.

В `channel_item.rs` можно разложить пропс сразу:
```rust
pub fn ChannelItem(channel_view: ChannelView) -> View {
	let context = use_context::<ChannelContext>();
	let channel_id = channel_view.id; // Copy
	let channel_name = channel_view.name;

	let is_active = create_memo(move || {
		context.current.get_clone().is_some_and(|channel| channel.id == channel_id)
	});

	let on_click = move |_| {
		spawn_local_scoped(async move {
			let context = use_context::<ChannelContext>();

			if let Some(channel) = context.current.get_clone() {
				if channel.id == channel_id {
					return;
				}
				
				context.current.set(None);
				context.messages.set(vec![]);
				invoke_command(CommandArgs::LeftChannel {
					channel_id: channel.id,
				}.to_json()).await;
			}
			
			let res = invoke_command(CommandArgs::JoinChannel {
				channel_id,
			}.to_json()).await;
			
			if let CommandResult::Error(err) = res {
				console_error!("join channel error: {err:#?}");
			}
			
			invoke_command(
			CommandArgs::ChannelHistoryBefore {
			channel_id,
			timestamp: time::OffsetDateTime::now_utc(),
			}.to_json()
			).await;
		});
	};

  view! {
	  div(
		  class=classes(vec![
			  "channel-item".into(),
			  ("active", is_active.into()).into(),
		  ]),
		  on:click=on_click,
	  ) {
		  (channel_name)
	  }
  }
}
```

  Это устраняет три клона внутри компонента и ненужный Box. Остаётся channel.clone() в channel_panel.rs: он, вероятно, нужен из-за того, что Indexed выдаёт ссылку/реактивное значение, а
  компонент принимает владение. Если хочется убрать и его, стоит изменить ChannelItem так, чтобы он принимал ReadSignal<ChannelView> — но это сильнее привяжет компонент к реактивному контейнеру.
  Для текущего API один клон на границе списка — разумный компромисс.
  
Если ChannelView действительно нужен целиком и одновременно захватывается несколькими move-замыканиями, обычное решение — хранить его в Rc<ChannelView> (для WASM; Arc нужен только при Send +
  Sync).

  use std::rc::Rc;

  let channel = Rc::new(channel_view);

  let active_channel = Rc::clone(&channel);
  let is_active = create_memo(move || {
      context.current.get_clone()
          .is_some_and(|current| current.id == active_channel.id)
  });

  let click_channel = Rc::clone(&channel);
  let on_click = move |_| {
      let channel = Rc::clone(&click_channel); // дешёвый инкремент счётчика
      spawn_local_scoped(async move {
          // можно использовать весь channel: channel.id, channel.name и т.д.
      });
  };

  Rc::clone не копирует String и остальные поля ChannelView: копируется только указатель и увеличивается счётчик ссылок. Это устраняет дорогие channel_view.clone().

  Есть нюанс: для отображения имени обычно всё равно понадобится одна копия строки либо передача ссылки, смотря что ожидает view!:

  let channel_name = channel.name.clone();

  Это уже один предсказуемый клон для DOM, а не клон всей DTO на каждое замыкание/нажатие.

  Альтернатива, более «sycamore-ная»:

  let channel = create_signal(channel_view);

  Сигналы удобно копируются между memo и обработчиком, но если в async move требуется весь объект после await, придётся сделать channel.get_clone(). Поэтому для неизменяемого DTO, который надо
  разделить между несколькими владельцами, я бы выбрал Rc<ChannelView>; для реактивно изменяемого — Signal<ChannelView>.