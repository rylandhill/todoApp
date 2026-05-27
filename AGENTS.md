# AGENTS.md

## Purpose
This file helps a secondary coding agent onboard quickly during pair programming and extend features without re-deriving architecture decisions.

## Project Snapshot
- Stack: Vite + React + TypeScript.
- Scope: Local-only, in-memory todo app.
- State strategy: Shared state and selectors in React Context (`TodoProvider`).
- Assignment requirements covered: create, delete, list, and show missing priorities.

## Repo Map
- `src/context`: Context provider and action wiring.
- `src/hooks`: Context consumption helpers.
- `src/types`: Domain and payload types.
- `src/enums`: Shared enums/constants.
- `src/utils`: Pure utility logic (priority and color behavior).
- `src/components/layout`: App shell and layout pieces.
- `src/components/forms`: Todo creation flow.
- `src/components/todo`: Todo card/list rendering.
- `src/components/primitives`: Reusable UI primitives.
- `src/test`: test setup/bootstrap.

## Conventions
- Keep one component per file.
- Avoid hardcoded behavior strings; use enums/constants when extending domain workflows.
- Keep business rules in `src/utils` or context selectors, not UI components.
- Prefer `useMemo`/`useCallback` for derived context values and action handlers.
- Keep UI copy concise and accessible (labels, roles, button names for tests).

## Fast Extension Recipes
- Add a new derived selector:
  1. Implement pure logic in `src/utils`.
  2. Compute with `useMemo` in `TodoProvider`.
  3. Expose selector through context value and consume via `useTodos`.
- Add a new todo action:
  1. Extend `TodoActionType` enum.
  2. Add typed action in `src/types/todo.ts`.
  3. Handle reducer branch in `TodoContext`.
  4. Expose callback in context and wire UI.
- Add new UI section:
  1. Create component under the relevant subfolder.
  2. Use primitives first; add primitive only if used in multiple places.

## Verification Checklist
- `npm run lint`
- `npm run typecheck`
- `npm run test:run`
- `npm run build`
