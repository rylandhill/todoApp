import type { TodoItem } from '../../types/todo'
import { Button } from '../primitives/Button'

interface TodoCardProps {
  todo: TodoItem
  onDelete: (id: string) => void
}

export const TodoCard = ({ todo, onDelete }: TodoCardProps) => {
  return (
    <article className="todo-card" style={{ borderColor: todo.color }}>
      <div className="todo-card__header">
        <h2 className="todo-card__title">{todo.title}</h2>
        <span className="todo-card__priority">P{todo.priority}</span>
      </div>
      <p className="todo-card__description">{todo.description || 'No description added.'}</p>
      <div className="todo-card__footer">
        <Button variant="danger" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.title}`}>
          Delete
        </Button>
      </div>
    </article>
  )
}
