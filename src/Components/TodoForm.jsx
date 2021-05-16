import React, {useState, useContext} from 'react'
import {DataContext} from '../Components/TodoData'
// import {TodoData} from './Components/TodoData'


function TodoForm({addTask}) {
const [input, setInput] = useState('')


// const addTodo = (e,{addTask}) => {
//   debugger
//   e.preventDefault()
//   addTask()
//   console.log('addTodo')
//   setTodos([
//     ...todos,
//     {
//       id: Date.now(),
//       title: input,
//       completed: false,
//       sequence: todos.length
//     }
//   ])
//   setInput('')
// }

  return (
    <div>
      <input type="text" name ="todos"
      value ={input} 
      onChange ={e => setInput(e.target.value)}
      ></input>
      <button type ="submit" onClick={ () => {addTask(input)}}>Создать</button>
    </div>
  )
}

export default TodoForm
