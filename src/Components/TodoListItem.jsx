import React, {useState} from 'react'
// import {DataContext} from '../Components/TodoData'


function TodoListItem({todo,checkTask,renameTask,removeTask}) {
const [onEdit, setOnEdit] = useState(false)
const [editValue, setEditValue] = useState(todo.title)

// const editTodo =() =>{
//   setOnEdit(true)
// }

// const saveTodo =() =>{
//   setOnEdit(false)
//   if(editValue) {
//     editTodos(editValue, todo.id)
//   } else {
//     setEditValue(todo.title)
//   }
// }

if(onEdit){
  return (
    <li>
        <input type ="text" value = {editValue}
         onChange ={e => setEditValue(e.target.value)}/>
  
      <button  onClick={() =>{renameTask(todo,editValue);  setOnEdit(false)}}>Сохранить</button>

    </li>
  )
}else{
  return (
    <li>
      <label className ={todo.completed ? "true":""}>
        <input type ="checkbox"
        defaultChecked = {todo.completed}
        onChange ={() => checkTask(todo)}
        />
        {todo.title}
      </label>
      <button type ="submit" disabled= {todo.completed} onClick={() =>{setOnEdit(true)}}>Редактировать</button>
      <button type ="submit" disabled= {todo.completed} onClick ={() => {removeTask(todo.id)}}>Удалить</button>
    </li>
  )
}

}

export default TodoListItem
