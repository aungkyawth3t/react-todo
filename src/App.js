import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import FilterButtons from './components/FilterButtons.js';
import ClearCompletedButton from './components/ClearCompletedButton';
import { useEffect, useState } from 'react';

function App() {

  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then((todo) => {
        setTodos(todo);
      })
  }, [])

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm/>
        <TodoList todos={ todos } />
        <CheckAllAndRemaining/>

        {/* TodoFilter */}
        <div className="other-buttons-container">
          <FilterButtons />
          <ClearCompletedButton/>
        </div>
      </div>
    </div>
  );
}

export default App;
