import { TodoActionType } from '../enums/todo'

export interface TodoItem {
  id: string
  title: string
  description: string
  priority: number
  color: string
  createdAt: string
}

export interface NewTodoInput {
  title: string
  description: string
  priority: number
  color?: string
}

export interface TodoState {
  todos: TodoItem[]
}

export type TodoAction =
  | { type: typeof TodoActionType.Add; payload: TodoItem }
  | { type: typeof TodoActionType.Delete; payload: { id: string } }
  | {
      type: typeof TodoActionType.UpdatePriorityColor
      payload: { priority: number; color: string }
    }
