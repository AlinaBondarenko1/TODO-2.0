import React, {useState, useEffect, createContext}from 'react'
import axios from 'axios'
export const DataContext = createContext();

export const TodoData = (props) =>{
  
  const [, setError] = useState(null);
  const [todos, setTodos] = useState([]); 
  
  useEffect(() => {
    const apiUrl = 'http://185.246.66.84:3000/abondarenko/tasks';
    axios.get(apiUrl).then(res => setTodos(res.data))
    .catch(err => setError(err))
},[])

return (
  <DataContext.Provider value={[todos, setTodos]}>
    {props.children}
  </DataContext.Provider>
  )
  }