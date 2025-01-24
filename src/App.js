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

  let [url, setUrl] = useState(["http://localhost:3001/todos"])

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

  let updateToDo = (todo) =>{
    //update in server side
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(todo),
    });
    //update in cliet side
    setToDos(prevState => {
      return prevState.map(t =>{
        if(t.id == todo.id){
          return todo;
        }else{
          return t;
        }
      })
    })
  }

  let remainingCount = todos.filter(t => !t.completed).length;

  let checkAll = () =>{
    //update in server side
    todos.forEach(t=>{ 
      t.completed = true
      updateToDo(t);
    })
    //update in client side
    todos.map((t) => ({ ...t, completed: true }));

  }

  let clearCompleted = () => {
    //update in server side
    todos.forEach(t=>{ 
      if(t.completed){
        deleteToDo(t.id);
      }    
    })

    //update in client side
    setToDos(prevState => {
      return prevState.filter(todo => !todo.completed)
    })
  }

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data =>{
      setToDos(data)
    })
  }, [url]);

  let getData = (status) =>{
    if(status == "active"){
    setUrl("http://localhost:3001/todos?completed=false")
    }else if(status == "completed"){
      setUrl("http://localhost:3001/todos?completed=true")
    }else{
      setUrl("http://localhost:3001/todos")
    }
  } 

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <ToDoForm addToDo={addToDo} />

        <ToDoList todos={todos} deleteToDo={deleteToDo} updateToDo={updateToDo}/>

       <CheckAllAndRemaining remainingCount={remainingCount} checkAll={checkAll}/>

        <div className="other-buttons-container">
          <ToDoFilters getData={getData}/>
          <ClearCompleteBtn clearCompleted={clearCompleted}/>
        </div>
      </div>
    </div>
  );
}

export default App;
