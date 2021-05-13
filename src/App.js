import './App.css';
import TodoForm from './Components/TodoForm'
import TodoList from './Components/TodoList'
import {TodoData} from './Components/TodoData'

function App() {
  return (
    <TodoData>
    <div className="App">
      <h1>ToDO List</h1>
      <h3>Активные задачи</h3>
      <TodoForm />
      <TodoList />
      <h3>Завершенные задачи</h3>
    </div>
    </TodoData>
  );
}

export default App;
