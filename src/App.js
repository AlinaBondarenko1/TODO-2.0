import './App.css';
import React, {useState, useEffect, useCallback}from 'react'
import TodoForm from './Components/TodoForm'
import TodoList from './Components/TodoList'
import Context from './Context'
import SubContext from './SubContext'
import axios from 'axios'
import styles from './assets/css/App.module.css';

function App() {
  const apiUrl = 'http://185.246.66.84:3000/abondarenko/tasks/'
  const apiSubUrl = 'http://185.246.66.84:3000/abondarenko/subtasks'

  const [, setError] = useState(null);
  const [todos, setTodos] = useState([]); 
  const [subTodos, setSubTodos] = useState([]); 

  const todosСompleted = todos.filter(tasks => tasks.completed)
  const todosInСompleted = todos.filter(tasks => !tasks.completed)

//Запрос данных
  useEffect(() => {
    axios.get(apiUrl).then(res => setTodos(res.data))
    .catch(err => setError(err))

    axios.get(apiSubUrl).then(res => setSubTodos(res.data))
    // .then(response => {
    //   setTodos(prev =>{
    //         return [
    //             ...prev.filter(curr => curr.id === taskId.id),
    //             response.data
    //         ]
    //     });
    // })
    .catch(err => setError(err))
},[])

//Добавление данных в Todo
const addTask = useCallback((title) => {    

function calcTodoSequence(){
  const calcTodo = todos.filter(tasks => !tasks.completed)
  console.log("calcTodo: ", calcTodo)
  return calcTodo === undefined ? 1 : calcTodo.length + 1;
}

  const newTask = {
      completed: false,
      title:  title === "" ? "Task " + (todos.length + 1) : title,
      sequence: calcTodoSequence()
  }
  console.log('addTask',newTask )
  axios.post(apiUrl, newTask)
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

//Добавление данных в SubTodo
const addSubTask = useCallback((id) => {

  const newSubTask = {
      completed: false,
      sequence: 1,
      taskId: id,
      title: "Subtask for Task"
  }
  axios.post(apiSubUrl, newSubTask)
  .then(response => {
    setSubTodos(prev =>
          [
              ...prev,
              response.data
          ]
      );
  })
  .catch(error => console.log(error));
},[subTodos, setSubTodos])

//Удаление данных
const removeTask = useCallback((id) => {
  axios.delete(apiUrl + id)
  .then(response => {
    setTodos(prev =>
          prev.filter(curr => curr.id !== id)
      );
  })
  .catch(error => console.log(error));
},[setTodos]) 

//Обновление задачи
const checkTask = useCallback((todos) => {
  axios.put(apiUrl + todos.id, {
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

//Обновление имени
const renameTask = useCallback((task, newTitle) => {
  if (task.title !== newTitle){
      axios.put(apiUrl + task.id, {
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



const updateSequence = useCallback((result) => {

  const startIndex = result.source.index;
  const endIndex = result.destination.index;
  console.log("startIndex:",startIndex)
  console.log("endIndex:",endIndex)

  // axios.put(apiUrl, {
        
  // })
  // .then(response => {console.log(response.data)})
},[]);

  return (
    <Context.Provider value = {[todos, setTodos]}>
      <SubContext.Provider value = {[subTodos, setSubTodos]}>
      
    <div className="App">
      <div className="wrapper">
      <h1 className={styles.AppTitle}>ToDO List</h1>
      <h3 className={styles.AppTitle__Active}>Активные задачи: {todosInСompleted.length}</h3>
      <TodoForm addTask ={addTask}/>
      <TodoList removeTask ={removeTask} checkTask ={checkTask} renameTask = {renameTask} updateSequence={updateSequence} addSubTask ={addSubTask}/>
      <h3 className={styles.AppTitle__Inactive}>Завершенные задачи: {todosСompleted.length}</h3>
      <TodoList removeTask ={removeTask} checkTask ={checkTask} renameTask = {renameTask} showCopletedTasks ={true} updateSequence={updateSequence} addSubTask ={addSubTask}/>
      </div>
    </div>
    </SubContext.Provider>
    </Context.Provider>
  );
}

export default App;
