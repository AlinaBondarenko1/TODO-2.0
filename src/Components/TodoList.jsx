import React, {useContext, useState} from 'react'
import TodoListItem from '../Components/TodoListItem'
import Context from '../Context'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList({removeTask,checkTask,renameTask,showCopletedTasks}) {

 const [todos, setTodos] = useContext(Context)
  const todosFilter = showCopletedTasks ? todos.filter(tasks => tasks.completed) : todos.filter(tasks => !tasks.completed)
  const [task, updateTask] = useState(todosFilter);
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
  console.log(result)
  // const items = Array.from(task);
  // const [reorderedItem] = todosFilter.splice(result.source.index, 1);
  // todosFilter.splice(result.destination.index, 0, reorderedItem);

  // updateTask(todosFilter);

  // if (result.destination.index === result.source.index) {
  //   return;
  // }

  // updateTask(result.source.index, result.destination.index);
}

  return (

<DragDropContext onDragEnd={handleOnDragEnd}> {/*Контейнер для перетаскивания*/}
  <div className = "TodoList__container">
            <Droppable droppableId="task">  
                {(provided,snapshot ) => (
                    <div 
                    {...provided.droppableProps} 
                    ref = {provided.innerRef}
                    style= {{
                      background: snapshot.isDraggingOver ? "lightblue": "",
                      width: 300,
                    }}
                    >
                      <ul>
                        {todosFilter.map((todo,index) => {
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
                                                        />
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        </ul>
                        {provided.placeholder}
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
  showCopletedTasks: PropTypes.bool
}

export default TodoList
