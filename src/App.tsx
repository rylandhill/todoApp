import { useState } from 'react'
import { AddTodoModal } from './components/forms/AddTodoModal'
import { AppShell } from './components/layout/AppShell'
import { DeleteConfirmModal } from './components/todo/DeleteConfirmModal'
import { TodoList } from './components/todo/TodoList'
import { TodoProvider } from './context/TodoContext'
import { useTodos } from './hooks/useTodos'
import type { TodoItem } from './types/todo'

/**
 * Internal app composition that consumes todo context.
 */
const TodoApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [todoPendingDelete, setTodoPendingDelete] = useState<TodoItem | null>(null)
  const { todos, deleteTodo, updatePriorityColor } = useTodos()

  /**
   * Confirms deletion for the selected todo.
   */
  const handleDeleteConfirm = () => {
    if (todoPendingDelete) {
      deleteTodo(todoPendingDelete.id)
      setTodoPendingDelete(null)
    }
  }

  return (
    <AppShell onOpenCreate={() => setIsModalOpen(true)}>
      <TodoList
        todos={todos}
        onDelete={setTodoPendingDelete}
        onUpdatePriorityColor={updatePriorityColor}
      />
      <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DeleteConfirmModal
        isOpen={Boolean(todoPendingDelete)}
        title={todoPendingDelete?.title ?? ''}
        onCancel={() => setTodoPendingDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </AppShell>
  )
}

/**
 * Root application component with TodoProvider.
 */
function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  )
}

export default App
