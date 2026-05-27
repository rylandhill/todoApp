import type { PropsWithChildren } from 'react'
import { Button } from '../primitives/Button'

interface AppShellProps {
  onOpenCreate: () => void
}

/**
 * Top-level app layout with page header and main content slot.
 */
export const AppShell = ({ onOpenCreate, children }: PropsWithChildren<AppShellProps>) => {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1 className="app-shell__title">Todo List</h1>
        <Button onClick={onOpenCreate} aria-label="Add todo" className="add-button">
          + Add
        </Button>
      </header>
      <main>{children}</main>
    </div>
  )
}
