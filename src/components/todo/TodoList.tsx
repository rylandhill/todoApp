import type { TodoItem } from '../../types/todo'
import { TodoCard } from './TodoCard'

interface TodoListProps {
  todos: TodoItem[]
  onDelete: (id: string) => void
}

export const TodoList = ({ todos, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add your first task to get started.</p>
  }

  const sortedTodos = [...todos].sort((left, right) => left.priority - right.priority)

  return (
    <section className="todo-grid" aria-label="Todo items">
      {sortedTodos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </section>
  )
}
