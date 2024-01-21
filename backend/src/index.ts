import express, { Request, Response } from 'express'

const app = express()
app.use(express.json())

const PORT: string | number = process.env.PORT || 4000

interface TodoItem {
  id: number
  title: string
  completed: boolean
}

let todos: TodoItem[] = []

// Get all todos
app.get('/todos', (req: Request, res: Response) => {
  res.json(todos)
})

// Add a new todo
app.post('/todos', (req: Request, res: Response) => {
  const { title } = req.body

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).send('Invalid input: title is required')
  }

  const newTodo: TodoItem = {
    id: todos.length + 1,
    title,
    completed: false,
  }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// Update a todo
app.patch('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { title, completed } = req.body

  const index = todos.findIndex((todo) => todo.id === id)

  if (index !== -1) {
    todos[index] = { ...todos[index], title, completed }
    res.json(todos[index])
  } else {
    res.status(404).send('Todo not found')
  }
})

// Delete a todo
app.delete('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  todos = todos.filter((todo) => todo.id !== id)
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
