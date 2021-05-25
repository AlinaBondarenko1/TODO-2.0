import React, {useContext, useState} from 'react'
import TodoListItem from '../Components/TodoListItem'
import Context from '../Context'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '../assets/css/TodoList.module.css';


function TodoList({removeTask,checkTask,renameTask,showCopletedTasks,updateSequence, addSubTask ,removeSubTask ,renameSubTask,checkSubTask}) {

 const [todos, setTodos] = useContext(Context)

  console.log("todos: ", todos)

  const todosFilter = showCopletedTasks ? todos.filter(tasks => tasks.completed) : todos.filter(tasks => !tasks.completed)
  // console.log("todosFilter", todosFilter)

  const filttrInProgress = todos.filter(tasks => !tasks.completed);
  console.log("In: ", filttrInProgress)


  const [newTodos, setNewTodos] = useState(filttrInProgress);
  console.log("newTodos: ", newTodos)

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

  // const startIndex = result.source.index;
  // const endIndex = result.destination.index;
  // console.log("startIndex:",startIndex)
  // console.log("endIndex:",endIndex)


//   if (endIndex === startIndex) {
//     return
// }
updateSequence(result);
  // filttrInProgress.splice(endIndex,0,todosFilter.splice(startIndex,1))

  // const [reorderedItem] = filttrInProgress.splice(startIndex, 1);
  //filttrInProgress.splice(endIndex, 0, reorderedItem);
  // console.log("reorderedItem: ", reorderedItem)

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
                                    {(provided, snapshot) => {
                                        if (snapshot.isDragging) {
                                          const offset = { x: 380, y: 0 } //фиксирует позицию элемента
                                          const x = provided.draggableProps.style.left - offset.x;
                                          const y = provided.draggableProps.style.top - offset.y;
                                          provided.draggableProps.style.left = x;
                                          provided.draggableProps.style.top = y;
                                            }
                                              return (
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
                                                    addSubTask = {addSubTask}
                                                    removeSubTask = {removeSubTask}
                                                    renameSubTask = {renameSubTask}
                                                    checkSubTask={checkSubTask}/>
                                                </div>
                                                    );
                                              }}
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
