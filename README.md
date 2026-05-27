# Todo App (Take-Home Assignment)

Local-only Todo app focused on clean frontend architecture and UX.

## Current Feature Set
- Create todo items with:
  - title
  - description
  - required positive integer priority
- Delete flow uses a confirmation modal (`Cancel`/`Delete`).
- Todos are grouped by priority in ascending order:
  - section headers: `Priority X`
  - cards are shown in rows up to 3 columns (responsive down to 2/1).
- Missing priorities are shown in the Add modal as compressed ranges (example: `2-4, 6`).
- Priority color is controlled at the home page section level:
  - each `Priority X` header has a color picker trigger
  - changing it updates all cards for that priority
- New priorities auto-generate random RGB color values (`0-255` per channel), duplicates allowed.
- Add modal behavior:
  - closes on `Escape`
  - closes on overlay mouse-down only (prevents accidental close on mouse-up after text selection)
  - live priority validation shows immediately for invalid non-empty input and clears when fixed
  - `Close` button in bottom-left, `Create Todo` in bottom-right
- In-memory state only (no persistence).

## Tech Stack
- Node: `22.21.1` (see `.nvmrc`)
- npm: `10.9.4`
- React: `19.2.6`
- Vite: `8.0.14`
- TypeScript: `6.0.2`
- ESLint: `10.3.0`
- Vitest + Testing Library

## Run Locally
1. Install Node `22.21.1` (recommended via `nvm`).
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`
4. Open:
   - `http://localhost:4179`

## Scripts
- `npm run dev` - start local dev server.
- `npm run build` - typecheck and production build.
- `npm run preview` - preview production build.
- `npm run lint` - run ESLint.
- `npm run typecheck` - run TypeScript project checks.
- `npm run test` - run tests in watch mode.
- `npm run test:run` - run tests once.

## Where Core Logic Lives
- State/reducer/selectors/actions: `src/context/TodoContext.tsx`
- Context contract: `src/context/todo-context-store.ts`
- Context consumers: `src/context/useTodoContext.ts`, `src/hooks/useTodos.ts`
- Priority logic: `src/utils/priorities.ts`
- Random color generation: `src/utils/colors.ts`
- Main app wiring: `src/App.tsx`

## Quick Demo Flow
1. Click `+ Add`, enter title/description/priority, create.
2. Add a second item with same priority and confirm both cards share the same trim color.
3. Change color from that priority header and confirm both cards update.
4. Open Add modal and verify missing-priority tooltip updates after create/delete.
5. Click delete on a card, confirm modal appears, then confirm deletion.
