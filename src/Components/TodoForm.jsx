import React, {useState, useContext} from 'react'
import {DataContext} from '../Components/TodoData'



function TodoForm() {
const [todos, setTodos] = useContext(DataContext)
const [input, setInput] = useState('')

const addTodo = e => {
  e.preventDefault()
  setTodos([
    ...todos,
    {
      id: Date.now(),
      title: input,
      completed: false,
      sequence: todos.length
    }
  ])
  setInput('')
}

  return (
    <form onSubmit ={addTodo}>
      <input type="text" name ="todos"
      value ={input} 
      onChange ={e => setInput(e.target.value)}
      ></input>
      <button type ="submit">Создать</button>
    </form>
  )
}

export default TodoForm
