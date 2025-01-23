import React from 'react'
import ToDo from './ToDo'

export default function ToDoList({todos, deleteToDo}) {
  return (
    <div>
        <ul className="todo-list">
        { todos && todos.map(todo => (
            <ToDo todo={todo} deleteToDo={deleteToDo} key={todo.id}/>
        ))
         
        }
        </ul>
    </div>
  )
}
