import React from 'react'

function TodoListItem({todo}) {
  return (
    <li>
      <label>
        <input type ="checkbox"></input>
        {todo.title}
      </label>
      <button type ="submit">Редактировать</button>
      <button type ="submit">Удалить</button>
    </li>
  )
}

export default TodoListItem
