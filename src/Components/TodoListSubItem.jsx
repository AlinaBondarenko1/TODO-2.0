import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from '../assets/css/TodoListSubItem.module.css';
import cn from 'class-names'

function TodoListItem({todoSub ,setSubTodos}) {


  return (
    <div className ={styles.subItem__container}>
      <li>
      <label>
        <input type ="checkbox"/>
        {todoSub.title}
        
      </label>
      <button type ="submit" >Редактировать</button>
      <button type ="submit" >Удалить</button>
      </li>
    </div>
  )
}





export default TodoListItem
