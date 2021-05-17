import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from '../assets/css/TodoForm.module.css';

function TodoForm({addTask}) {
const [input, setInput] = useState('')

  return (
    <div className = {styles.TodoForm__conteiner}>
      <input type="text" name ="todos" className = {styles.TodoForm__input}
      value ={input} placeholder ="Введите текст..."
      onChange ={e => setInput(e.target.value)}
      ></input>
      <button className = {styles.TodoForm__button} type ="submit" onClick={ () => {addTask(input)}}>Создать</button>
    </div>
  )
}

TodoForm.propTypes = {
  addTask: PropTypes.func
}

export default TodoForm
