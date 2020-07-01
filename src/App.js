import React from 'react';
import {useState} from 'react'

import './App.css';

function App() {

  
  const initToDoItems = [
    { content: "stuff",
    completed: false,
    hidden: function() {
      return this.content.length === 0
    }
  },
    { content: "stuff2",
    completed: false,
    hidden: function() {
      return this.content.length === 0
    }
  },
    { content: "",
    completed: true,
    hidden: function() {
      return this.content.length === 0
    }
  }
    ]

  


  const [toDoItems, setToDoItems] = useState(initToDoItems)

  const toggleCompleted = (indexToDo) => {

    const _todo = [...toDoItems]
    
    if (_todo[indexToDo].completed) {
      _todo[indexToDo].completed = false
    }
    else {
      _todo[indexToDo].completed = true
    }
    

    setToDoItems(_todo)

  }

  const updateToDo = (event, indexToDo)  => {

    const _todo = [...toDoItems]
    _todo[indexToDo].content = event.target.value

    setToDoItems(_todo)

  }

  return (
    <React.Fragment>
      <ul className='ToDoContainer'>
      {toDoItems.map((todo, index)=> {
        return (
        <li key={index}>
          <input type="checkbox" onChange={(event) => toggleCompleted(index)} checked={todo.completed} hidden={todo.hidden()}/>
          <input type="text" onChange={(event) => updateToDo(event, index) } value={todo.content}/>
        </li>
      )
      })}

      </ul>
  
    </React.Fragment>
  )
}

export default App;
