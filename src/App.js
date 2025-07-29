import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import FilterButtons from './components/FilterButtons.js';
import ClearCompletedButton from './components/ClearCompletedButton';

function App() {
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm/>
        <TodoList/>
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
