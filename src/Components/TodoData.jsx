// import React, {useState, useEffect, createContext,useCallback }from 'react'
// import axios from 'axios'
// export const DataContext = createContext();

// export const TodoData = (props) =>{
  
//   const [, setError] = useState(null);
//   const [todos, setTodos] = useState([]); 
  
//   useEffect(() => {
//     const apiUrl = 'http://185.246.66.84:3000/abondarenko/tasks';
//     axios.get(apiUrl).then(res => setTodos(res.data))
//     .catch(err => setError(err))
// },[])

// const removeTask = useCallback((id) => {
//   axios.delete("http://185.246.66.84:3000/abondarenko/tasks" + id)
//   .then(response => {
//     setTodos(prev =>
//           prev.filter(curr => curr.id !== id)
//       );
//   })
//   .catch(error => console.log(error));
// },[setTodos]) 

// const checkTask = useCallback((todos) => {
//   axios.put("http://185.246.66.84:3000/abondarenko/tasks" + todos.id, {
//       completed: !todos.completed,
//       title: todos.title,
//       sequence: todos.sequence           
//   })
//   .then(response => {
//     setTodos(prev =>{
//           return [
//               ...prev.filter(curr => curr.id !== task.id),
//               response.data
//           ]
//       });
//   })
//   .catch(error => console.log(error));
// },[setTodos])

// const renameTask = useCallback((task, newTitle) => {
//   if (task.title !== newTitle){
//       axios.put("http://185.246.66.84:3000/abondarenko/tasks/" + task.id, {
//           completed: task.completed,
//           title: newTitle,
//           sequence: task.sequence           
//       })
//       .then(response => {
//         setTodos(prev =>{
//               return [
//                   ...prev.filter(curr => curr.id !== task.id),
//                   response.data
//               ]
//           });
//       })
//       .catch(error => console.log(error));
//   }
  
// },[setTodos])    


// return (
//   <DataContext.Provider value={[todos, setTodos]}>
//     {props.children}
//   </DataContext.Provider>
//   )
//   }