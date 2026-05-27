import { useTodoContext } from '../context/useTodoContext'

/**
 * Returns the shared todo context state and actions.
 */
export const useTodos = () => useTodoContext()
