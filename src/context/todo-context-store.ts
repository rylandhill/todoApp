import { createContext } from 'react'
import type { NewTodoInput, TodoItem } from '../types/todo'

export interface TodoContextValue {
  todos: TodoItem[]
  usedPriorities: number[]
  missingPriorities: number[]
  missingPriorityRangesText: string
  usedColors: string[]
  priorityColorMap: Record<number, string>
  addTodo: (input: NewTodoInput) => void
  deleteTodo: (id: string) => void
  updatePriorityColor: (priority: number, color: string) => void
}

export const TodoContext = createContext<TodoContextValue | null>(null)
