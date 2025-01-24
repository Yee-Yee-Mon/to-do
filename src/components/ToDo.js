import React, { useState } from 'react'

export default function ToDo({todo, deleteToDo, updateToDo }) {
let [isEdit, setIsEdit] = useState(false)
let [title, setTitle] = useState(todo.title)

let updateToDoHandler = (e) =>{
    e.preventDefault()
    let updatedToDo = {
        "id" : todo.id,
        "title" : title,
        "completed" : todo.completed
    }
    updateToDo(updatedToDo)
    setIsEdit(false)
}

let handleCheckboxChange = () => {
    let updatedToDo = {
        "id" : todo.id,
        "title" : title,
        "completed" : !todo.completed
    }
    updateToDo(updatedToDo)
  };

  return (
    <li className="todo-item-container">
        <div className="todo-item">
        <input type="checkbox" 
            checked={todo.completed}
            onChange={handleCheckboxChange}
        />
        {!isEdit && <span onDoubleClick={ () => setIsEdit(true) } className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
        </span>}
        {isEdit && 
            <form onSubmit={updateToDoHandler}>
                <input type="text" className="todo-item-input" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </form>
        }
        </div>
        <button className="x-button" onClick={() => deleteToDo(todo.id)}>
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
