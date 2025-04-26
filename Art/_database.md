---
database-plugin: basic
---

```yaml:dbfolder
name: Database
description: Database for anime, manga, ranobe, film, series, books etc.
columns:
  __file__:
    key: __file__
    id: __file__
    input: markdown
    label: File
    accessorKey: __file__
    isMetadata: true
    skipPersist: false
    isDragDisabled: false
    csvCandidate: true
    position: 1
    isHidden: true
    sortIndex: -1
    isSorted: false
    isSortedDesc: false
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Status:
    input: select
    accessorKey: Status
    key: Status
    id: Status
    label: Статус
    position: 7
    skipPersist: false
    isHidden: false
    sortIndex: -1
    isSorted: false
    isSortedDesc: false
    width: 103
    options:
      - { label: "watch", value: "watch", color: "hsl(218, 95%, 90%)"}
      - { label: "complete", value: "complete", color: "hsl(152, 95%, 90%)"}
      - { label: "drop", value: "drop", color: "hsl(335, 95%, 90%)"}
      - { label: "plan", value: "plan", color: "hsl(333, 95%, 90%)"}
      - { label: "defer", value: "defer", color: "hsl(271, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Episode:
    input: number
    accessorKey: Episode
    key: Episode
    id: Episode
    label: Эпизод
    position: 9
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 87.47439575195312
    isSorted: false
    isSortedDesc: false
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Type:
    input: select
    accessorKey: Type
    key: Type
    id: Type
    label: Тип
    position: 10
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 108
    options:
      - { label: "anime", value: "anime", color: "hsl(336, 95%, 90%)"}
      - { label: "series", value: "series", color: "hsl(103, 95%, 90%)"}
      - { label: "manhwa", value: "manhwa", color: "hsl(217, 95%, 90%)"}
      - { label: "ranobe", value: "ranobe", color: "hsl(106, 95%, 90%)"}
      - { label: "anime film", value: "anime film", color: "hsl(183, 95%, 90%)"}
      - { label: "film", value: "film", color: "hsl(338, 95%, 90%)"}
      - { label: "book", value: "book", color: "hsl(319, 95%, 90%)"}
      - { label: "manga", value: "manga", color: "hsl(114, 95%, 90%)"}
      - { label: "course", value: "course", color: "hsl(344, 95%, 90%)"}
      - { label: "manhua", value: "manhua", color: "hsl(193, 95%, 90%)"}
      - { label: "game", value: "game", color: "hsl(259, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      option_source: manual
  Stream:
    input: number
    accessorKey: Stream
    key: Stream
    id: Stream
    label: Стрим
    position: 11
    skipPersist: false
    isHidden: true
    sortIndex: -1
    width: 78.67684936523438
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Time:
    input: text
    accessorKey: Time
    key: Time
    id: Time
    label: Время
    position: 12
    skipPersist: false
    isHidden: true
    sortIndex: -1
    width: 94.64820861816406
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Name:
    input: text
    accessorKey: Name
    key: Name
    id: newColumn8
    label: Название
    position: 6
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 190.29403686523438
    isSorted: false
    isSortedDesc: false
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      wrap_content: true
      content_alignment: text-align-center
      content_vertical_alignment: align-middle
  Season:
    input: number
    accessorKey: Season
    key: Season
    id: newColumn10
    label: Сезон
    position: 8
    skipPersist: false
    isHidden: true
    sortIndex: -1
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Views:
    input: number
    accessorKey: Views
    key: Views
    id: newColumn9
    label: Просмотры
    position: 13
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 101
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Cover:
    input: text
    accessorKey: Cover
    key: Cover
    id: newColumn11
    label: Обложка
    position: 4
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 92.030517578125
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 125
      media_height: 90
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      wrap_content: false
      content_alignment: text-align-center
      content_vertical_alignment: align-middle
  __tags__:
    key: __tags__
    id: __tags__
    input: metadata_tags
    label: File Tags
    accessorKey: __tags__
    isMetadata: true
    isDragDisabled: false
    skipPersist: false
    csvCandidate: false
    position: 0
    isHidden: false
    sortIndex: -1
    width: 44.64313507080078
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Year:
    input: number
    accessorKey: Year
    key: Year
    id: Year
    label: Год
    position: 100
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 53
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  created:
    input: calendar_time
    accessorKey: created
    key: created
    id: created
    label: Создан
    position: 100
    skipPersist: false
    isHidden: true
    sortIndex: -1
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  modified:
    input: calendar_time
    accessorKey: modified
    key: modified
    id: modified
    label: Изменён
    position: 100
    skipPersist: false
    isHidden: true
    sortIndex: -1
    isSorted: false
    isSortedDesc: true
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
config:
  remove_field_when_delete_column: false
  cell_size: normal
  sticky_first_column: false
  group_folder_column: 
  remove_empty_folders: false
  automatically_group_files: false
  hoist_files_with_empty_attributes: true
  show_metadata_created: false
  show_metadata_modified: false
  show_metadata_tasks: false
  show_metadata_inlinks: false
  show_metadata_outlinks: false
  show_metadata_tags: true
  source_data: current_folder
  source_form_result: 
  source_destination_path: /
  row_templates_folder: Text/Note/templates
  current_row_template: templates/database template.md
  pagination_size: 200
  font_size: 15
  enable_js_formulas: false
  formula_folder_path: /
  inline_default: false
  inline_new_position: last_field
  date_format: yyyy-MM-dd
  datetime_format: "yyyy-MM-dd HH:mm:ss"
  metadata_date_format: "yyyy-MM-dd HH:mm:ss"
  enable_footer: false
  implementation: default
filters:
  enabled: true
  conditions:
      - condition: OR
        disabled: true
        label: "Смотрю"
        color: "hsl(120,100%,50%)"
        filters:
        - field: Status
          operator: EQUAL
          value: "watch"
          type: select
      - condition: OR
        disabled: true
        label: "Просмотрено"
        color: "hsl(120,100%,50%)"
        filters:
        - field: Status
          operator: EQUAL
          value: "complete"
          type: select
      - condition: OR
        disabled: false
        label: "Книги"
        color: "hsl(180,100%,50%)"
        filters:
        - field: Type
          operator: EQUAL
          value: "book"
          type: select
      - condition: OR
        disabled: true
        label: "Фильмы"
        color: "hsl(300,100%,50%)"
        filters:
        - field: Type
          operator: EQUAL
          value: "film"
          type: select
      - condition: OR
        disabled: true
        label: "Аниме"
        color: "hsl(240,100%,50%)"
        filters:
        - field: Type
          operator: EQUAL
          value: "anime"
          type: select
      - condition: OR
        disabled: true
        label: "Аниме фильмы"
        color: "hsl(177, 95%, 90%)"
        filters:
        - field: Type
          operator: EQUAL
          value: "anime film"
          type: select
      - condition: OR
        disabled: true
        label: "Любимые"
        color: "hsl(0,100%,50%)"
        filters:
        - field: tags
          operator: CONTAINS
          value: "❤"
          type: text
      - condition: AND
        disabled: true
        label: "Без обложки"
        color: "hsl(134, 95%, 90%)"
        filters:
        - field: Cover
          operator: IS_EMPTY
          value: ""
          type: text
      - condition: AND
        disabled: true
        label: "Без года"
        color: "hsl(58, 95%, 90%)"
        filters:
        - field: Year
          operator: IS_EMPTY
          value: ""
          type: number
      - condition: AND
        disabled: true
        label: "Игры"
        color: "hsl(0,100%,38%)"
        filters:
        - field: Type
          operator: EQUAL
          value: "game"
          type: select
```