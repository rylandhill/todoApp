import { useContext } from 'react'
import { TodoContext } from './todo-context-store'

/**
 * Reads TodoContext and enforces provider usage.
 */
export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider')
  }
  return context
}
