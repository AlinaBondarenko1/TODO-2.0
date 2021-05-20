import React, {useState,useContext} from 'react'
import PropTypes from 'prop-types'
import styles from '../assets/css/TodoListItem.module.css';
import cn from 'class-names'
import SubContext from '../SubContext'
import TodoListSubItem from '../Components/TodoListSubItem'

function TodoListItem({todo,checkTask,renameTask,removeTask,addSubTask,removeSubTask,renameSubTask,checkSubTask}) {
const [onEdit, setOnEdit] = useState(false)
const [editValue, setEditValue] = useState(todo.title)
const [subTodos, setSubTodos] = useContext(SubContext)

const newSubTodos = subTodos.filter(subTodo => subTodo.taskId === todo.id);
// console.log("newSubTodos " , newSubTodos)
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
        <input className = {styles.TodoListItem__input} type ="text" value = {editValue}
         onChange ={e => setEditValue(e.target.value)}/>
  
      <button className = {cn( styles.TodoListItem__Btn, styles.hoverAddSave)}  onClick={() =>{renameTask(todo,editValue);  setOnEdit(false)}} >Сохранить</button>
    </li>
  )
}else{
  return (
    <li>
      <div className ={styles.wrapper}>   
      <div className ={styles.container__Todo}>
        <label className = {cn({[styles.completed]: todo.completed})}>
          <input type ="checkbox"
          defaultChecked = {todo.completed}
          onChange ={() => checkTask(todo,newSubTodos)}
          />
          {todo.title}
        </label>

      <div className ={styles.container__btn}>
      <button className = {cn( styles.TodoListItem__Btn, {[styles.BtnColor_Add]: !todo.completed}, {[styles.hoverAddSave]: !todo.completed})} type ="submit" disabled= {todo.completed} onClick ={() => {addSubTask(todo.id)}}>+</button>
        <button className = {cn( styles.TodoListItem__Btn, {[styles.hoverEdit]: !todo.completed})}

        type ="submit" disabled= {todo.completed} onClick={() =>{setOnEdit(true)}}>Редактировать</button>
        <button className = {cn( styles.TodoListItem__Btn, {[styles.hoverDel]: !todo.completed})}  type ="submit" disabled= {todo.completed} onClick ={() => {removeTask(todo.id)}}>Удалить</button>
      </div>
      
    </div>

        <div className ={styles.container__subTodo}>
          <ul>    
            {newSubTodos.map((todoSub) => {
              return (  
              <TodoListSubItem 
              todo={todo}
              key={todoSub.id}
              todoSub={todoSub}
              removeSubTask ={removeSubTask}
              renameSubTask ={renameSubTask}
              checkSubTask ={checkSubTask}
              /> 
              );
              })}
          </ul>
        </div>
    </div>
    </li>
  )
}
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  checkTask: PropTypes.func,
  renameTask: PropTypes.func,
  removeTask: PropTypes.func,
  todoSub:PropTypes.object,
  removeSubTask: PropTypes.func,
  renameSubTask: PropTypes.func,
  checkSubTask: PropTypes.func
}

export default TodoListItem
