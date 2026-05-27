import { useMemo, useState, type FormEvent } from 'react'
import { Tooltip } from '../primitives/Tooltip'
import { Input } from '../primitives/Input'
import { TextArea } from '../primitives/TextArea'
import { Button } from '../primitives/Button'
import { useTodos } from '../../hooks/useTodos'
import { normalizeHexColor } from '../../utils/colors'

interface AddTodoModalProps {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  priority: '',
  color: '#3B82F6',
  useCustomColor: false,
}

export const AddTodoModal = ({ isOpen, onClose }: AddTodoModalProps) => {
  const { addTodo, missingPriorityRangesText } = useTodos()
  const [title, setTitle] = useState(INITIAL_FORM_STATE.title)
  const [description, setDescription] = useState(INITIAL_FORM_STATE.description)
  const [priority, setPriority] = useState(INITIAL_FORM_STATE.priority)
  const [color, setColor] = useState(INITIAL_FORM_STATE.color)
  const [useCustomColor, setUseCustomColor] = useState(INITIAL_FORM_STATE.useCustomColor)
  const [error, setError] = useState('')

  const canSubmit = useMemo(() => title.trim().length > 0 && priority.trim().length > 0, [priority, title])

  if (!isOpen) {
    return null
  }

  const resetState = () => {
    setTitle(INITIAL_FORM_STATE.title)
    setDescription(INITIAL_FORM_STATE.description)
    setPriority(INITIAL_FORM_STATE.priority)
    setColor(INITIAL_FORM_STATE.color)
    setUseCustomColor(INITIAL_FORM_STATE.useCustomColor)
    setError('')
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedPriority = Number.parseInt(priority, 10)

    if (!Number.isInteger(parsedPriority) || parsedPriority <= 0) {
      setError('Priority must be a positive integer.')
      return
    }

    addTodo({
      title,
      description,
      priority: parsedPriority,
      color: useCustomColor ? normalizeHexColor(color) : undefined,
    })

    handleClose()
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={handleClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-todo-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="add-todo-heading">Add Todo</h2>
          <Button variant="secondary" onClick={handleClose} aria-label="Close add todo dialog">
            Close
          </Button>
        </div>

        <Tooltip
          label="Unused priorities"
          content={missingPriorityRangesText}
        />

        <form className="form" onSubmit={handleSubmit}>
          <Input
            id="todo-title"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Finish API docs"
            required
          />

          <TextArea
            id="todo-description"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Include edge cases and setup notes."
            rows={4}
          />

          <Input
            id="todo-priority"
            label="Priority"
            inputMode="numeric"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            placeholder="1"
            required
          />

          <label className="checkbox-row" htmlFor="todo-use-custom-color">
            <input
              id="todo-use-custom-color"
              type="checkbox"
              checked={useCustomColor}
              onChange={(event) => setUseCustomColor(event.target.checked)}
            />
            <span>Pick custom trim color</span>
          </label>

          {useCustomColor ? (
            <Input
              id="todo-color"
              label="Card color"
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          ) : (
            <p className="hint">No color selected: app will auto-assign an unused color.</p>
          )}

          {error ? <p className="error-text">{error}</p> : null}

          <div className="form__footer">
            <Button type="submit" disabled={!canSubmit}>
              Create Todo
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
