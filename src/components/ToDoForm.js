import React, { useState } from 'react'

export default function ToDoForm({addToDo}) {
let [ title, setTitle ] = useState('');

let handleEvent = (e) =>{
    e.preventDefault();
    setTitle('')
    let todo = {
        "id" : Math.random(),
        "title" : title,
        "completed" : false
    }
    console.log(todo)

    addToDo(todo)
}
  return (
    <form action="#" onSubmit={handleEvent}>
        <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={ e => setTitle(e.target.value)}
        value={title}
        />
    </form>
  )
}
