# Todo App (Take-Home Assignment)

A local-only Todo app focused on frontend architecture and user experience.

## Features
- Create todo items with:
  - title
  - description
  - required positive integer priority
  - optional custom trim color
- Delete existing todo items.
- List all items as dark-themed cards:
  - title top-left
  - priority top-right
  - description body
  - card trim color
- Show missing priorities from `1..max(usedPriority)` as compact ranges in add flow tooltip.
- Auto-assign an unused hex color when user skips color picker.
- In-memory state only (no persistence by design).

## Tech Stack
- Node: `22.21.1` (see `.nvmrc`)
- npm: `10.9.4`
- React: `19.2.6`
- Vite: `8.0.12`
- TypeScript: `6.0.2`
- ESLint: `10.3.0`
- Vitest + Testing Library for unit/UI tests

## Getting Started
1. Install Node `22.21.1` (recommended via `nvm`).
2. Install dependencies:
   - `npm install`
3. Run locally:
   - `npm run dev`
4. Open the local Vite URL shown in terminal.

## Available Scripts
- `npm run dev` - start local dev server.
- `npm run build` - typecheck and create production build.
- `npm run preview` - preview production build locally.
- `npm run lint` - run ESLint.
- `npm run typecheck` - run TypeScript project checks.
- `npm run test` - run tests in watch mode.
- `npm run test:run` - run tests once for CI/interview validation.

## Architecture Notes
- Global app state is managed in `src/context/TodoContext.tsx`.
- State is consumed through `src/hooks/useTodos.ts`.
- Derived values are memoized in context:
  - used priorities
  - missing priorities
  - missing-priority range text
  - used colors
- Pure business logic lives in `src/utils`:
  - `priorities.ts` for missing-priority calculations/range formatting
  - `colors.ts` for unused-color selection
- UI is split into focused component groups:
  - `layout`, `todo`, `forms`, `primitives`

## Interview Demo Flow
1. Click `+ Add`.
2. Create a todo at priority `3` without selecting custom color.
3. Re-open add dialog and show tooltip displays missing range `1-2`.
4. Add priority `1` and `5` todos, then verify tooltip updates to `2, 4`.
5. Delete highest priority item and verify missing ranges recalculate immediately.

## Tradeoffs
- No persistence as requested (resets on refresh).
- Modal and tooltip are intentionally lightweight (no external UI framework) to keep focus on architecture and clarity.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
