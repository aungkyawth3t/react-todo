import React, { useState } from 'react'

export default function Todo({ todo, deleteTodo, updateToDo }) {

    let [showEdit, setShowEdit] = useState(false);
    let [title, setTitle] = useState(todo.title);

    let updateToDoHandler = (e) => {
        e.preventDefault();
        let updatedTodo = {
            id: todo.id,
            title: title,
            completed : todo.completed
        }
        updateToDo(updatedTodo);
        setShowEdit(false);
    }

    return (
        <li className="todo-item-container">
            <div className="todo-item">
                <input type="checkbox" />
                    {!showEdit && <span onDoubleClick={() => setShowEdit(true) } className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}>
                        {todo.title}
                </span>}
                {showEdit &&
                    <form onSubmit={updateToDoHandler}>
                        <input type='text' className='todo-item-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </form>
                }
            </div>
            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
        </li>
  )
}
