import React from 'react'
import ToDo from './ToDo'

export default function ToDoList({todos, deleteToDo, updateToDo}) {
  return (
    <div>
        <ul className="todo-list">
        { todos && todos.map(todo => (
            <ToDo todo={todo} deleteToDo={deleteToDo} updateToDo={updateToDo} key={todo.id} />
        ))
         
        }
        </ul>
    </div>
  )
}
