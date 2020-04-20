import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/todos', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setTodos(data)
    });
  }, []);

  const handleCheckbox = (event) => {
    const newList = [...todos];    
    const index = event.target.dataset["index"];
    newList[index] = {
      ...newList[index],
      completed: event.target.checked
    };
    setTodos(newList);
    
    /* TODO: Add REST API call to persist change to DB */
  }

  const addNewItem = (e) => {
    if(e.key === 'Enter'){
      /* TODO: Add REST API call to submit new item */
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        To-Do List
      </header>
      <div className="container">
        <ul>
          {todos.map((item, index) => (
            <li key={`todo-${index}`}>
              <input data-index={index} type="checkbox" checked={item.completed} onChange={handleCheckbox}/>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
        <input type="text" onKeyPress={addNewItem} placeholder="Add new task"/>
      </div>
    </div>
  );
}

export default App;
