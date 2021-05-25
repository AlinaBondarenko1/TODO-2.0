import './App.css';
import React, {useState, useEffect, useCallback}from 'react'
import TodoForm from './Components/TodoForm'
import TodoList from './Components/TodoList'
import Context from './Context'
import SubContext from './SubContext'
import axios from 'axios'
import styles from './assets/css/App.module.css';
import { element } from 'prop-types';

function App() {
  const apiUrl = 'http://185.246.66.84:3000/abondarenko/tasks/'
  const apiSubUrl = 'http://185.246.66.84:3000/abondarenko/subtasks/'
  const apiSubAddUrl = 'http://185.246.66.84:3000/abondarenko/subtasks'

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
    //             ...prev.filter(curr => curr.id === todos.id),
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

  function calcSubTodoSequence(){
    const calcSubTodo = subTodos.filter(tasks => !tasks.completed)
    console.log("calcSubTodo: ", calcSubTodo)
    return calcSubTodo === undefined ? 1 : calcSubTodo.length + 1;
  }

  const newSubTask = {
      completed: false,
      sequence: calcSubTodoSequence(),
      taskId: id,
      title: "Subtask " + id
  }

  axios.post(apiSubAddUrl, newSubTask)
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

//Удаление подзадач
const removeSubTask = useCallback((id) => {
  axios.delete(apiSubUrl + id)
  .then(response => {
    setSubTodos(prev =>
          prev.filter(curr => curr.id !== id)
      );
  })
  .catch(error => console.log(error));
},[setSubTodos])  

//Обновление задачи
const checkTask = useCallback((todos,newSubTodos) => {
  axios.put(apiUrl + todos.id, {
    ...todos, completed: !todos.completed          
  })
  .then(response => {
    setTodos(prev =>{
          return [
              ...prev.filter(curr => curr.id !== todos.id),
              response.data
          ]
      });

  newSubTodos.forEach(item =>{
    axios.put(apiSubUrl + item.id, {...item, completed: !todos.completed});
  })

  setSubTodos(prev => prev.map(item => {
    if(newSubTodos.includes(item))
      return {...item, completed: !todos.completed};
    return item;
  }))
})
  .catch(error => console.log(error));
},[setTodos,setSubTodos])

//Обновление подзадачи 
const checkSubTask = useCallback((todoSub) => {
  axios.put(apiSubUrl + todoSub.id, {
    ...todoSub, completed: !todoSub.completed  
  })
  .then(response => {
    setSubTodos(prev =>{
          return [
              ...prev.filter(curr => curr.id !== todoSub.id),
              response.data
          ]
      });
  })
  .catch(error => console.log(error));
},[setSubTodos])

//Обновление имени
const renameTask = useCallback((task, newTitle) => {
  if (task.title !== newTitle){
      axios.put(apiUrl + task.id, { 
          ...task, title: newTitle     
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

//Обновление имени у подзадач 
const renameSubTask = useCallback((task, newTitle) => {
  if (task.title !== newTitle){
      axios.put(apiSubUrl + task.id, {
        ...task, title: newTitle
      })
      .then(response => {
        setSubTodos(prev =>{
              return [
                  ...prev.filter(curr => curr.id !== task.id),
                  response.data
              ]
          });
      })
      .catch(error => console.log(error));
  }
  
},[setSubTodos])

const updateSequence = useCallback((result) => {

  
  
  const startIndex = result.source.index;
  const endIndex = result.destination.index;
  console.log("startIndex:",startIndex)
  console.log("endIndex:",endIndex)
  const items = Array.from(todos)

  const [reorderedItem] = items.splice(startIndex, 1)
  items.splice(endIndex, 0, reorderedItem) 

  items.forEach((task, index) => {  
    console.log("task: ", task )
    console.log("index: ", index )
  })

  // items.forEach(item =>{
  //   axios.put(apiSubUrl + item.id, {...item, completed: !todos.completed});
  // })

},[todos]);

  return (
    <Context.Provider value = {[todos, setTodos]}>
      <SubContext.Provider value = {[subTodos, setSubTodos]}>
      
    <div className="App">
      <div className="wrapper">
      <h1 className={styles.AppTitle}>ToDO List</h1>
      <h3 className={styles.AppTitle__Active}>Активные задачи: {todosInСompleted.length}</h3>
      <TodoForm addTask ={addTask}/>
      <TodoList removeTask ={removeTask} checkTask ={checkTask} renameTask = {renameTask} updateSequence={updateSequence} addSubTask ={addSubTask} removeSubTask = {removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>
      <h3 className={styles.AppTitle__Inactive}>Завершенные задачи: {todosСompleted.length}</h3>
      <TodoList removeTask ={removeTask} checkTask ={checkTask} renameTask = {renameTask} showCopletedTasks ={true} updateSequence={updateSequence} addSubTask ={addSubTask} removeSubTask = {removeSubTask} renameSubTask={renameSubTask} checkSubTask={checkSubTask}/>
      </div>
    </div>
    </SubContext.Provider>
    </Context.Provider>
  );
}

export default App;
