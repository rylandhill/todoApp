# AGENTS.md

## Purpose
This file is the **single onboarding source** for a follow-up coding agent. A new agent should be able to continue work from this file alone without relying on `ARCHITECTURE.md`.

## Project Snapshot
- Stack: Vite + React + TypeScript + Vitest.
- Scope: Local-only, in-memory todo app.
- Dev server: `http://localhost:4179` (`strictPort: true`).
- State strategy: Single shared context provider (`TodoProvider`) with reducer + memoized selectors/actions.
- Current UX highlights:
  - priority-grouped sections (`Priority X`) with section-level color picker
  - delete confirmation modal
  - add modal with live priority validation + missing-priority tooltip

## Repo Map
- `src/App.tsx`: top-level app wiring (add modal + delete confirm modal + list).
- `src/context/TodoContext.tsx`: reducer, selectors, and actions (`addTodo`, `deleteTodo`, `updatePriorityColor`).
- `src/context/todo-context-store.ts`: `TodoContextValue` contract.
- `src/hooks/useTodos.ts`: app-facing context hook.
- `src/utils/priorities.ts`: missing-priority computation + range formatting.
- `src/utils/colors.ts`: random RGB-based color generation.
- `src/components/forms/AddTodoModal.tsx`: add workflow + live validation + overlay/escape close behavior.
- `src/components/todo/TodoList.tsx`: priority grouping + section rendering.
- `src/components/todo/PriorityHeader.tsx`: priority label + color picker trigger.
- `src/components/todo/TodoCard.tsx`: card rendering + delete trigger.
- `src/components/todo/DeleteConfirmModal.tsx`: destructive action confirmation.
- `src/components/primitives/*`: reusable UI controls.
- `src/App.test.tsx`, `src/utils/priorities.test.ts`: behavior coverage.

## Current Data Flow (Authoritative)
1. UI actions call context actions via `useTodos()`.
2. Reducer updates `todos[]`.
3. Selectors recompute from `todos[]`:
   - `usedPriorities`
   - `missingPriorities`
   - `missingPriorityRangesText`
   - `priorityColorMap`
4. UI re-renders grouped priority sections and cards.

## Critical Behavioral Rules
- Same priority must always share the same color.
- Priority color editing happens at section header level and updates all todos of that priority.
- New priority color is random RGB (0-255 channels), duplicates are allowed.
- Add modal closes on:
  - `Escape`
  - overlay mouse-down only (not mouse-up/click release outside).
- Add modal priority validation message:
  - appears immediately for invalid non-empty input
  - disappears immediately once fixed
  - hidden for empty input.
- Delete always requires confirm modal.

## Extension Recipes
- Add new derived selector:
  1. Implement pure function in `src/utils`.
  2. Compute via `useMemo` in `TodoProvider`.
  3. Expose in context value + consume in UI.
- Add new reducer action:
  1. Extend `TodoActionType` in `src/enums/todo.ts`.
  2. Add action type in `src/types/todo.ts`.
  3. Handle case in reducer in `TodoContext.tsx`.
  4. Expose callback action in provider value.
- Add new modal:
  - follow overlay close convention using mouse-down target check (`event.target === event.currentTarget`).

## Coding Conventions
- One component per file.
- Keep business logic in context/utils, not in presentational components.
- Prefer `useMemo`/`useCallback` for derived/context values and stable actions.
- Keep button labels and aria-labels stable; tests depend on them.
- Add JSDoc for exported functions/components and non-obvious internal handlers.

## Verification Checklist
- `npm run lint`
- `npm run typecheck`
- `npm run test:run`
- `npm run build`
