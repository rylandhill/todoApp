import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Todo app flow', () => {
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
    expect(screen.queryByText('Write interview summary')).not.toBeInTheDocument()
  })
})
