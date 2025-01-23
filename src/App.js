import './reset.css';
import './App.css';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import ToDoFilters from './components/ToDoFilters';
import ClearCompleteBtn from './components/ClearCompleteBtn';
import { useEffect, useState } from 'react';

function App() {
  let [todos, setToDos] = useState([])

  let addToDo = (todo)=>{
    //update server side
    fetch("http://localhost:3001/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(todo),
    });
    //update client side
    setToDos(prevState => [...prevState, todo ])
  }

  let deleteToDo = (todoId) => {
    console.log(todoId)
    //delete server side
    fetch(`http://localhost:3001/todos/${todoId}`,{
      method: "DELETE",
    })
    //delete client side
    setToDos(prevState => {
      return prevState.filter(todo =>{
        return todo.id != todoId
      })
  })
  }

  useEffect(() => {
    fetch("http://localhost:3001/todos")
    .then(response => response.json())
    .then(data =>{
      setToDos(data)
    })
  }, []);

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <ToDoForm addToDo={addToDo} />

        <ToDoList todos={todos} deleteToDo={deleteToDo}/>

       <CheckAllAndRemaining />

        <div className="other-buttons-container">
          <ToDoFilters />
          <ClearCompleteBtn />
        </div>
      </div>
    </div>
  );
}

export default App;
