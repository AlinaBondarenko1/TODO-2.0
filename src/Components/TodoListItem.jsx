import React, {useState} from 'react'

function TodoListItem({todo,checkCompleted,editTodos}) {
const [onEdit, setOnEdit] = useState(false)
const [editValue, setEditValue] = useState(todo.title)

const editTodo =() =>{
  setOnEdit(true)
}

const saveTodo =() =>{
  setOnEdit(false)
  if(editValue) {
    editTodos(editValue, todo.id)
  } else {
    setEditValue(todo.title)
  }
}


if(onEdit){
  return (
    <li>
        <input type ="text" value = {editValue}
         onChange ={e => setEditValue(e.target.value)}/>
  
      <button  onClick={() => saveTodo(todo.id)}>Сохранить</button>

    </li>
  )
}else{
  return (
    <li>
      <label className ={todo.completed ? "true":""}>
        <input type ="checkbox"
        checked = {todo.completed}
        onChange ={() => checkCompleted(todo.id)}
        />
        {todo.title}
      </label>
      <button type ="submit" disabled= {todo.completed} onClick={editTodo}>Редактировать</button>
      <button type ="submit" disabled= {todo.completed}>Удалить</button>
    </li>
  )
}

}

export default TodoListItem
