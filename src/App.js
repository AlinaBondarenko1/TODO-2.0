import './App.css';
import React, {useState, useEffect, useCallback}from 'react'
import TodoForm from './Components/TodoForm'
import TodoList from './Components/TodoList'
// import {TodoData} from './Components/TodoData'
import Context from './Context'
import axios from 'axios'

function App() {
 
  const [, setError] = useState(null);
  const [todos, setTodos] = useState([]); 
  
  useEffect(() => {
    const apiUrl = 'http://185.246.66.84:3000/abondarenko/tasks';
    axios.get(apiUrl).then(res => setTodos(res.data))
    .catch(err => setError(err))
},[])

const addTask = useCallback((title) => {    

  const newTask = {
      completed: false,
      title: title,
      sequence: 1
  }
  console.log('addTask')
  axios.post("http://185.246.66.84:3000/abondarenko/tasks", newTask)
  .then(response => {
    setTodos(prev =>
          [
              ...prev,
              response.data
          ]
      );
  })
  .catch(error => console.log(error));
},[todos, setTodos]) 

const removeTask = useCallback((id) => {
  debugger
  axios.delete("http://185.246.66.84:3000/abondarenko/tasks/" + id)
  .then(response => {
    setTodos(prev =>
          prev.filter(curr => curr.id !== id)
      );
  })
  .catch(error => console.log(error));
},[setTodos]) 

const checkTask = useCallback((todos) => {
  
  axios.put("http://185.246.66.84:3000/abondarenko/tasks/" + todos.id, {
      completed: !todos.completed,
      title: todos.title,
      sequence: todos.sequence           
  })
  .then(response => {
    setTodos(prev =>{
          return [
              ...prev.filter(curr => curr.id !== todos.id),
              response.data
          ]
      });
  })
  .catch(error => console.log(error));
},[setTodos])

const renameTask = useCallback((task, newTitle) => {
  if (task.title !== newTitle){
      axios.put("http://185.246.66.84:3000/abondarenko/tasks/" + task.id, {
          completed: task.completed,
          title: newTitle,
          sequence: task.sequence           
      })
      .then(response => {
        setTodos(prev =>{
              return [
                  ...prev.filter(curr => curr.id !== task.id),
                  response.data
              ]
          });
      })
      .catch(error => console.log(error));
  }
  
},[setTodos])    


  return (
    <Context.Provider value = {[todos, setTodos]}>
    <div className="App">
      <h1>ToDO List</h1>
      <h3>Активные задачи: {todos.length}</h3>
      <TodoForm addTask ={addTask}/>
      <TodoList removeTask ={removeTask} checkTask ={checkTask} renameTask ={renameTask}/>
      <h3>Завершенные задачи: {todos.length}</h3>
      <TodoList removeTask ={removeTask} checkTask ={checkTask} renameTask ={renameTask} showCopletedTasks ={true}/>
    </div>
    </Context.Provider>
  );
}

export default App;
