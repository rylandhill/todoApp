import { Button } from '../primitives/Button'
import type { MouseEventHandler } from 'react'

interface DeleteConfirmModalProps {
  isOpen: boolean
  title: string
  onCancel: () => void
  onConfirm: () => void
}

/**
 * Modal that confirms destructive todo deletion.
 */
export const DeleteConfirmModal = ({
  isOpen,
  title,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) => {
  if (!isOpen) {
    return null
  }

  /**
   * Closes only when the initial mouse down happens on the overlay itself.
   */
  const handleOverlayMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onCancel()
    }
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={handleOverlayMouseDown}
    >
      <section
        className="modal modal--confirm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="delete-confirm-heading">Delete Todo</h2>
        </div>
        <p className="confirm-text">
          Are you sure you want to delete <strong>{title}</strong>?
        </p>
        <div className="confirm-actions">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </section>
    </div>
  )
}
