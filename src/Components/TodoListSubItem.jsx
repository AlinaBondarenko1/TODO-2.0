import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from '../assets/css/TodoListSubItem.module.css';
import cn from 'class-names'


function TodoListItem({todo,todoSub ,removeSubTask,renameSubTask,checkSubTask}) {
  const [onEdit, setOnEdit] = useState(false)
  const [editValue, setEditValue] = useState(todoSub.title)

if(onEdit){
  return (    
  <div className ={styles.subItem__container}>
      <li>
      <label>
      <input className = {styles.TodoSubListItem__input} type ="text" value = {editValue}
         onChange ={e => setEditValue(e.target.value)}/>
        
      </label>
      <button className = {cn( styles.TodoSubListItem__Btn, styles.hoverAddSave)} onClick={() =>{renameSubTask(todoSub,editValue);  setOnEdit(false)}} >Сохранить</button>
      </li>
    </div>
    )
}else{
  return (

    <div className ={styles.subItem__container}>

    <li>
    <label className = {cn({[styles.completed]: todoSub.completed})}>
      <input type ="checkbox"   
      defaultChecked = {todoSub.completed}
      onChange ={() => checkSubTask(todoSub)}/>
      {todoSub.title}
      
    </label>
    <button type ="submit" onClick={() =>{setOnEdit(true)}} className = {cn( styles.TodoSubListItem__Btn, {[styles.hoverEdit]: !todo.completed})} disabled= {todo.completed || todoSub.completed}>Редактировать</button>
    <button type ="submit" onClick ={() => {removeSubTask(todoSub.id)}} className = {cn( styles.TodoSubListItem__Btn, {[styles.hoverDel]: !todo.completed})} disabled= {todo.completed || todoSub.completed}>Удалить</button>
    </li>
  </div>
  )
}
}





export default TodoListItem
