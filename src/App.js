import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import FilterButtons from './components/FilterButtons.js';
import ClearCompletedButton from './components/ClearCompletedButton';
import { useCallback, useEffect, useState } from 'react';

function App() {

  let [todos, setTodos] = useState([]);
  let [filterTodos, setFilterTodos] = useState([todos]);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then((todo) => {
        setTodos(todo);
      })
  }, [])

  let filterBy = useCallback((filter) => {
    if (filter === 'All') {
      setFilterTodos(todos);
    }
    else if (filter === 'Active') {
      setFilterTodos(todos.filter(t => !t.completed));
    }
    else if (filter === 'Completed') {
      setFilterTodos(todos.filter(t => t.completed))
    }
  }, [todos])

  let addToDo = (todo) => {
    fetch('http://localhost:3001/todos', {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(todo),
    });
    setTodos(prevState => [...prevState, todo]) //array destructuring
  }

  let deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE"
    });
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id !== id
      });
    })
  }

  let updateToDo = (todo) => {
    // server side 
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(todo),
    });

    setTodos(prevState => {
      return prevState.map(t => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      });
    });
  }

  let checkAll = () => {
    todos.forEach(t => {
      t.completed = true;
      updateToDo(t);
    });
    //client side
    setTodos((prevState) => {
      return prevState.map(t => {
        return { ...t, completed: true }
      })
    })
  }

  let clearCompleted = () => {
    todos.forEach(t => {
      if (t.completed) {
        deleteTodo(t.id);
      }
    })
    // client side
    setTodos((prevState) => {
      return prevState.filter(t => !t.completed)
    })
  }

  let remainingTodos = todos.filter(t => !t.completed).length;

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addToDo={addToDo} />
        <TodoList todos={filterTodos} deleteTodo={deleteTodo} updateToDo={updateToDo} />
        <CheckAllAndRemaining remainingTodos={remainingTodos} checkAll={checkAll} />

        {/* TodoFilter */}
        <div className="other-buttons-container">
          <FilterButtons filterBy={filterBy} />
          <ClearCompletedButton clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
