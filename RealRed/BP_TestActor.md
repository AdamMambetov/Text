# BP_TestActor Documentation

This document outlines the structure and functionality of the `BP_TestActor` Blueprint asset, generated for documentation testing with CursorAI.

## Overview

`BP_TestActor` is an Actor Blueprint designed for testing documentation generation. It contains custom events, functions, and variables to demonstrate various aspects of Blueprint functionality.

## Graphs

### EventGraph

The `EventGraph` handles event-driven logic within the Blueprint.

-   **MyCustomEvent**: A custom event that triggers a `K2_RunGameplayTask` function.
    -   **Connected Nodes**:
        -   `K2Node_CallFunction_0` (K2_RunGameplayTask): This node calls the `K2_RunGameplayTask` function from the `GameplayTasksComponent`.
        -   `K2Node_VariableGet_0` (GameplayTasks): This node retrieves a reference to the `GameplayTasksComponent`.

### MyCustomEvent (Function Graph)

This is a separate function graph named `MyCustomEvent`.

-   **Function Reference**: `ExecuteUbergraph_BP_TestActor`
-   **Description**: This graph appears to be related to the execution of the Ubergraph for `BP_TestActor`.

### UserConstructionScript

The `UserConstructionScript` is executed when an instance of the Blueprint is created or modified in the editor.

-   **Function Reference**: `UserConstructionScript` (from `Engine.Actor`)
-   **Description**: This script typically handles initial setup and construction logic for the Actor.

### MyNewFunction

A custom function defined within the Blueprint.

-   **Function Reference**: `MyNewFunction`
-   **Description**: This is an editable function.

## Variables

### UseAI

-   **Type**: Boolean
-   **Friendly Name**: Use AI
-   **Category**: Test
-   **Tooltip**: Использовать искусственный интеллект по умолчанию (Use artificial intelligence by default)
-   **Properties**: BlueprintPrivate (true)

### UseSQLite

-   **Type**: Boolean
-   **Friendly Name**: Use SQLite
-   **Category**: Test
-   **Properties**: ExposeOnSpawn (true)

## Blueprint Description

`Создан для проверки документированя с помощью CursorAI` (Created for testing documentation with CursorAI)

---
