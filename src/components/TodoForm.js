import React, { useState } from 'react'

export default function TodoForm({addToDo}) {

  let [title, setTitle] = useState('');
  let handleSubmit = (e) => {
    e.preventDefault();
    let newToDo = {
      id: Math.random(),
      title: title,
      completed: false
    }
    addToDo(newToDo);
    setTitle(''); //clear input
  }
  return (
    <form action="#" onSubmit={handleSubmit}>
        <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={e => setTitle(e.target.value)}
        value={title}
        />
    </form>
  )
}
