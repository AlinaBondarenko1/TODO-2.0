import React, {useContext} from 'react'
import TodoListItem from '../Components/TodoListItem'
import {DataContext} from '../Components/TodoData'

function TodoList() {

  const [todos, setTodos] = useContext(DataContext)
  console.log(todos)
  
  return (
    <ul>
    {todos.map((todo) => {
        return (
            <TodoListItem
                todo={todo} 
                key={todo.id}
            />
        )
    })}
</ul>
  )
}

export default TodoList
