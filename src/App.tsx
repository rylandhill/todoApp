import { useState } from 'react'
import { AddTodoModal } from './components/forms/AddTodoModal'
import { AppShell } from './components/layout/AppShell'
import { TodoList } from './components/todo/TodoList'
import { TodoProvider } from './context/TodoContext'
import { useTodos } from './hooks/useTodos'

const TodoApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { todos, deleteTodo } = useTodos()

  return (
    <AppShell onOpenCreate={() => setIsModalOpen(true)}>
      <TodoList todos={todos} onDelete={deleteTodo} />
      <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AppShell>
  )
}

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  )
}

export default App
