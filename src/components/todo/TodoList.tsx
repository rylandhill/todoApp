import type { TodoItem } from '../../types/todo'
import { TodoCard } from './TodoCard'
import { PriorityHeader } from './PriorityHeader'

interface TodoListProps {
  todos: TodoItem[]
  onDelete: (todo: TodoItem) => void
  onUpdatePriorityColor: (priority: number, color: string) => void
}

/**
 * Renders todos grouped by priority in ascending order.
 */
export const TodoList = ({ todos, onDelete, onUpdatePriorityColor }: TodoListProps) => {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add your first task to get started.</p>
  }

  const todosByPriority = [...todos].reduce<Map<number, TodoItem[]>>((accumulator, todo) => {
    const current = accumulator.get(todo.priority) ?? []
    current.push(todo)
    accumulator.set(todo.priority, current)
    return accumulator
  }, new Map())

  const sortedPriorityEntries = Array.from(todosByPriority.entries()).sort(
    ([leftPriority], [rightPriority]) => leftPriority - rightPriority,
  )

  return (
    <section className="priority-sections" aria-label="Todo items">
      {sortedPriorityEntries.map(([priority, items]) => (
        <div key={priority} className="priority-section">
          <PriorityHeader
            priority={priority}
            color={items[0].color}
            onChangeColor={onUpdatePriorityColor}
          />
          <div className="todo-grid">
            {items.map((todo) => (
              <TodoCard key={todo.id} todo={todo} onDelete={onDelete} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
