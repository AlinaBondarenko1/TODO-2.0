import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from '../assets/css/TodoListItem.module.css';
import cn from 'class-names'

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
  
      <button className = {styles.TodoListItem__button} onClick={() =>{renameTask(todo,editValue);  setOnEdit(false)}} >Сохранить</button>
    </li>
  )
}else{
  return (
    <li>
      <label className ={cn({[styles.completed]: todo.completed})}>
        <input type ="checkbox"
        defaultChecked = {todo.completed}
        onChange ={() => checkTask(todo)}
        />
        {todo.title}
      </label>

    <div>
      <button className = {styles.TodoListItem__EditBtn} type ="submit" disabled= {todo.completed} onClick={() =>{setOnEdit(true)}}>Редактировать</button>
      <button className = {styles.TodoListItem__DelBtn} type ="submit" disabled= {todo.completed} onClick ={() => {removeTask(todo.id)}}>Удалить</button>
    </div>
    </li>
  )
}
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  checkTask: PropTypes.func,
  renameTask: PropTypes.func,
  removeTask: PropTypes.func
}

export default TodoListItem
