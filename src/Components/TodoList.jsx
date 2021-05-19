import React, {useContext, useState} from 'react'
import TodoListItem from '../Components/TodoListItem'
import Context from '../Context'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '../assets/css/TodoList.module.css';


function TodoList({removeTask,checkTask,renameTask,showCopletedTasks,updateSequence, addSubTask}) {

 const [todos, setTodos] = useContext(Context)
  const todosFilter = showCopletedTasks ? todos.filter(tasks => tasks.completed) : todos.filter(tasks => !tasks.completed)
  {/*
const switchCompleted = (id) =>{
const newTodos = [...todos]
newTodos.forEach((todo) => {
  if(todo.id === id)
  todo.completed = !todo.completed
})

setTodos(newTodos)
//    setTodos(todos.map((curr) => {
//     if (curr.id === id) {
//       curr.completed = !curr.completed
//       console.log(curr)
//     }
//       return curr;
// }))
}

const editTodos = (editValue, id) =>{
  const newTodos = [...todos]
  newTodos.forEach((todo) => {
    if(todo.id === id)
    todo.title = editValue
    console.log(newTodos)
  })
  setTodos(newTodos)
}

const deleteTodo = (id) =>{
 
 setTodos(todos.filter(todo => todo.id !== id))
 console.log(id)
}*/}



function handleOnDragEnd(result) {

  if (!result.destination) {
    return;
  };
  console.log("result", result)

  updateSequence(result);
// const startIndex = result.source.index;
// const endIndex = result.destination.index;
// console.log("startIndex:",startIndex)
// console.log("endIndex:",endIndex)



  // const items = Array.from(task);
  // const [reorderedItem] = todosFilter.splice(result.source.index, 1);
  // todosFilter.splice(result.destination.index, 0, reorderedItem);

  // updateTask(todo sFilter);

  // if (result.destination.index === result.source.index) {
  //   return;
  // }

  // updateTask(result.source.index, result.destination.index);
}

  return (

<DragDropContext onDragEnd={handleOnDragEnd}>
  <div className = {styles.TodoList__container}>
            <Droppable droppableId="task">  
                {(provided,snapshot ) => (
                    <div className ={styles.TodoList__itemDnd} 
                    {...provided.droppableProps} 
                    ref = {provided.innerRef}
                    style= {{
                      background: snapshot.isDraggingOver ? "lightblue": "",
                      width: 400,
                    }}
                    >
                      <ul>
                        {todosFilter.map((todo) => {
                          
                            return (
                                <Draggable 
                                key={todo.id} 
                                draggableId={"" + todo.id} 
                                index={todo.sequence}
                                isDragDisabled={todo.completed}
                                // index={index}
                                > 
                                    {(provided) => (
                                        <div 
                                        {...provided.draggableProps} 
                                        {...provided.dragHandleProps} 
                                        ref={provided.innerRef}>
                                        <TodoListItem
                                            todo={todo} 
                                            key={todo.id}
                                            checkTask = {checkTask}
                                            renameTask = {renameTask}
                                            removeTask = {removeTask} 
                                            addSubTask = {addSubTask}/>
                                            
                                        </div>
                                        
                                    )}

                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                        </ul>
                        
                    </div>
                )}
            </Droppable>
            </div>
        </DragDropContext>
  )
}

TodoList.propTypes = {
  removeTask: PropTypes.func,
  checkTask: PropTypes.func,
  renameTask: PropTypes.func,
  showCopletedTasks: PropTypes.bool,
  updateSequence: PropTypes.func,
}

export default TodoList
