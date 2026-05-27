import {
  useCallback,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react'
import { TodoActionType } from '../enums/todo'
import type { NewTodoInput, TodoAction, TodoItem, TodoState } from '../types/todo'
import { TodoContext, type TodoContextValue } from './todo-context-store'
import { pickUnusedColor } from '../utils/colors'
import {
  formatMissingPriorityRanges,
  getMissingPriorities,
} from '../utils/priorities'

const initialState: TodoState = {
  todos: [],
}

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionType.Add:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    case TodoActionType.Delete:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }
    case TodoActionType.UpdatePriorityColor:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.priority === action.payload.priority
            ? { ...todo, color: action.payload.color }
            : todo,
        ),
      }
    default:
      return state
  }
}

const createTodoId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const usedPriorities = useMemo(
    () => state.todos.map((todo) => todo.priority).sort((a, b) => a - b),
    [state.todos],
  )

  const missingPriorities = useMemo(
    () => getMissingPriorities(usedPriorities),
    [usedPriorities],
  )

  const missingPriorityRangesText = useMemo(
    () => formatMissingPriorityRanges(missingPriorities),
    [missingPriorities],
  )

  const priorityColorMap = useMemo(() => {
    return state.todos.reduce<Record<number, string>>((accumulator, todo) => {
      if (!accumulator[todo.priority]) {
        accumulator[todo.priority] = todo.color.toUpperCase()
      }
      return accumulator
    }, {})
  }, [state.todos])

  const usedColors = useMemo(
    () => Object.values(priorityColorMap),
    [priorityColorMap],
  )

  const addTodo = useCallback(
    (input: NewTodoInput) => {
      const existingPriorityColor = priorityColorMap[input.priority]
      const resolvedColor = existingPriorityColor
        ? existingPriorityColor
        : input.color
          ? input.color.toUpperCase()
          : pickUnusedColor(usedColors)

      const nextTodo: TodoItem = {
        id: createTodoId(),
        title: input.title.trim(),
        description: input.description.trim(),
        priority: input.priority,
        color: resolvedColor,
        createdAt: new Date().toISOString(),
      }

      dispatch({
        type: TodoActionType.Add,
        payload: nextTodo,
      })
    },
    [priorityColorMap, usedColors],
  )

  const deleteTodo = useCallback((id: string) => {
    dispatch({
      type: TodoActionType.Delete,
      payload: { id },
    })
  }, [])

  const updatePriorityColor = useCallback((priority: number, color: string) => {
    dispatch({
      type: TodoActionType.UpdatePriorityColor,
      payload: {
        priority,
        color: color.toUpperCase(),
      },
    })
  }, [])

  const value = useMemo<TodoContextValue>(
    () => ({
      todos: state.todos,
      usedPriorities,
      missingPriorities,
      missingPriorityRangesText,
      usedColors,
      priorityColorMap,
      addTodo,
      deleteTodo,
      updatePriorityColor,
    }),
    [
      addTodo,
      deleteTodo,
      missingPriorities,
      missingPriorityRangesText,
      priorityColorMap,
      state.todos,
      updatePriorityColor,
      usedColors,
      usedPriorities,
    ],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
