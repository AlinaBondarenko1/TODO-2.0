import React, {useContext} from 'react'
import TodoListItem from '../Components/TodoListItem'
import {DataContext} from '../Components/TodoData'

function TodoList() {

  const [todos, setTodos] = useContext(DataContext)
  console.log(todos)
  
const switchCompleted = (id) =>{
const newTodos = [...todos]
newTodos.forEach((todo) => {
  if(todo.id === id)
  todo.completed = !todo.completed
  console.log(newTodos)
})
setTodos(newTodos)
//    setTodos(todos.map((curr) => {
//     if (curr.id === id) {
//       curr.completed = !curr.completed
//       console.log(curr)
//     }
//       return curr;
// }))
}

const editTodos = (editValue, id) =>{
  const newTodos = [...todos]
  newTodos.forEach((todo) => {
    if(todo.id === id)
    todo.title = editValue
    console.log(newTodos)
  })
  setTodos(newTodos)
}


  return (
    <ul>
    {todos.map((todo) => {
        return (
            <TodoListItem
                todo={todo} 
                key={todo.id}
                checkCompleted = {switchCompleted}
                editTodos = {editTodos}
            />
        )
    })}
</ul>
  )
}

export default TodoList
