import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Tooltip } from '../primitives/Tooltip'
import { Input } from '../primitives/Input'
import { TextArea } from '../primitives/TextArea'
import { Button } from '../primitives/Button'
import { useTodos } from '../../hooks/useTodos'

interface AddTodoModalProps {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  priority: '',
}

export const AddTodoModal = ({ isOpen, onClose }: AddTodoModalProps) => {
  const { addTodo, missingPriorityRangesText } = useTodos()
  const [title, setTitle] = useState(INITIAL_FORM_STATE.title)
  const [description, setDescription] = useState(INITIAL_FORM_STATE.description)
  const [priority, setPriority] = useState(INITIAL_FORM_STATE.priority)

  const canSubmit = useMemo(() => title.trim().length > 0 && priority.trim().length > 0, [priority, title])
  const priorityValidationMessage = useMemo(() => {
    const trimmed = priority.trim()
    if (trimmed.length === 0) {
      return ''
    }

    const parsedPriority = Number.parseInt(trimmed, 10)
    const isValidPositiveInteger =
      Number.isInteger(parsedPriority) && parsedPriority > 0 && `${parsedPriority}` === trimmed

    return isValidPositiveInteger ? '' : 'Priority must be a positive integer.'
  }, [priority])

  /**
   * Resets form state after successful creation.
   */
  const resetState = () => {
    setTitle(INITIAL_FORM_STATE.title)
    setDescription(INITIAL_FORM_STATE.description)
    setPriority(INITIAL_FORM_STATE.priority)
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    // Support keyboard dismissal while the modal is open.
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleClose = () => onClose()

  /**
   * Validates and submits a new todo entry.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedPriority = Number.parseInt(priority.trim(), 10)

    if (priorityValidationMessage) {
      return
    }

    addTodo({
      title,
      description,
      priority: parsedPriority,
    })

    resetState()
    onClose()
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

          {priorityValidationMessage ? <p className="error-text">{priorityValidationMessage}</p> : null}

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
