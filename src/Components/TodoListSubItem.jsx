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
      <div className = {styles.subItem_container_text}>
        <label className = {cn(styles.subItem_label,{[styles.completed]: todoSub.completed})}>
         <div>
            <input type ="checkbox" 
            disabled= {todo.completed}
            checked = {todoSub.completed}
            onChange ={() => checkSubTask(todoSub)}/>
            {todoSub.title}
          </div>
        </label>
    </div>
    <div className = {styles.subItem_container_btn}>
        <button type ="submit" onClick={() =>{setOnEdit(true)}} className = {cn( styles.TodoSubListItem__Btn, {[styles.hoverEdit]: !todoSub.completed})} disabled= {todo.completed || todoSub.completed}>Редактировать</button>
        <button type ="submit" onClick ={() => {removeSubTask(todoSub.id)}} className = {cn( styles.TodoSubListItem__Btn, {[styles.hoverDel]: !todoSub.completed})} disabled= {todo.completed || todoSub.completed}>Удалить</button>
    </div>
    </li>
  </div>
  )
}
}





export default TodoListItem
