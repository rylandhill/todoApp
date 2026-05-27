import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

/**
 * Integration-style UI tests for main todo flows.
 */
describe('Todo app flow', () => {
  /**
   * Verifies add/delete behavior and missing-priority updates.
   */
  it('creates and deletes a todo while updating missing priorities', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add todo/i }))

    expect(screen.getByText('None')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Title'), 'Write interview summary')
    await user.type(screen.getByLabelText('Description'), 'Cover architecture and tradeoffs.')
    await user.type(screen.getByLabelText('Priority'), '3')
    await user.click(screen.getByRole('button', { name: /create todo/i }))

    expect(screen.getByText('Write interview summary')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add todo/i }))
    expect(screen.getByText('1-2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /close add todo dialog/i }))

    await user.click(screen.getByRole('button', { name: /delete write interview summary/i }))
    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /^delete$/i }))
    expect(screen.queryByText('Write interview summary')).not.toBeInTheDocument()
  })

  /**
   * Ensures add-form draft survives backdrop close/open cycle.
   */
  it('keeps form values when modal is closed by backdrop click', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add todo/i }))
    await user.type(screen.getByLabelText('Title'), 'Persist me')

    await user.click(screen.getByRole('presentation'))

    await user.click(screen.getByRole('button', { name: /add todo/i }))
    expect(screen.getByLabelText('Title')).toHaveValue('Persist me')
  })
})
