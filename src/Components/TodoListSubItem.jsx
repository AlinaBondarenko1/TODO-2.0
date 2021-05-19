import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from '../assets/css/TodoListSubItem.module.css';
import cn from 'class-names'

function TodoListItem({todoSub ,removeSubTask,renameSubTask}) {
  const [onEdit, setOnEdit] = useState(false)
  const [editValue, setEditValue] = useState(todoSub.title)

if(onEdit){
  return (    
  <div className ={styles.subItem__container}>
      <li>
      <label>
      <input type ="text" value = {editValue}
         onChange ={e => setEditValue(e.target.value)}/>
        
      </label>
      <button  onClick={() =>{renameSubTask(todoSub,editValue);  setOnEdit(false)}}  >Сохранить</button>
      </li>
    </div>
    )
}else{
  return (
    <div className ={styles.subItem__container}>
    <li>
    <label>
      <input type ="checkbox"/>
      {todoSub.title}
      
    </label>
    <button type ="submit" onClick={() =>{setOnEdit(true)}}>Редактировать</button>
    <button type ="submit" onClick ={() => {removeSubTask(todoSub.id)}}>Удалить</button>
    </li>
  </div>
  )
}
}





export default TodoListItem
