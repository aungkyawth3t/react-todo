import React from 'react'
import Todo from '../components/Todo.js';

export default function TodoList({ todos, deleteTodo, updateToDo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} updateToDo={updateToDo} />
      ))}
    </ul>
  )
}
