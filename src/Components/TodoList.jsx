import React, {useContext} from 'react'
import TodoListItem from '../Components/TodoListItem'
import Context from '../Context'
import PropTypes from 'prop-types'

function TodoList({removeTask,checkTask,renameTask,showCopletedTasks}) {

 const [todos, setTodos] = useContext(Context)

  const todosFilter = showCopletedTasks ? todos.filter(tasks => tasks.completed) : todos.filter(tasks => !tasks.completed)

  {/*
const switchCompleted = (id) =>{
const newTodos = [...todos]
newTodos.forEach((todo) => {
  if(todo.id === id)
  todo.completed = !todo.completed
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

const deleteTodo = (id) =>{
 
 setTodos(todos.filter(todo => todo.id !== id))
 console.log(id)
}*/}

  return (
    <div className = "TodoList__container">
    <ul>
    {todosFilter.map((todo) => {
        return (
            <TodoListItem
                todo={todo} 
                key={todo.id}
                checkTask = {checkTask}
                renameTask = {renameTask}
                removeTask = {removeTask}
            />
        )
    })}
</ul>
</div>
  )
}

TodoList.propTypes = {
  removeTask: PropTypes.func,
  checkTask: PropTypes.func,
  renameTask: PropTypes.func,
  showCopletedTasks: PropTypes.bool
}

export default TodoList
