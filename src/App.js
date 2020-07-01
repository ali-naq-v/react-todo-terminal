import React from 'react';
import {useState} from 'react'

import './App.css';


class ToDo {
  constructor(text, completed) {
    this.content = text;
    this.completed = completed
  }
  empty() {
    return this.content.length===0
  }
}



function App() {


  var item1 = new ToDo("stuff", false)
  var item2 = new ToDo("stuff also", false)
  var item3 = new ToDo("finished this one", true)
  var item4 = new ToDo("", false)

  const initToDoItems = [item1, item2, item3, item4]
  const [toDoItems, setToDoItems] = useState(initToDoItems)

  const toggleCompleted = (indexToDo) => {

    const _todo = [...toDoItems]
    
    if (_todo[indexToDo].completed) {
      _todo[indexToDo].completed = false
    }
    else {
      _todo[indexToDo].completed = true
    }
    // const newToDoItem = new ToDo("", false);
    // _todo.push(newToDoItem)
    setToDoItems(_todo)
  }

  const updateToDo = (event, indexToDo)  => {

    
    const _todo = [...toDoItems]
    _todo[indexToDo].content = event.target.value
    // if (_todo.length-1 === indexToDo && event.target.value.length===0) {
    //   const newToDoItem = new ToDo("", false);
    //   _todo.push(newToDoItem)
    // }
    setToDoItems(_todo)
  }

  const keyDown = (event, indexToDo) => {
    //backspace
    if( event.keyCode === 8 && toDoItems[indexToDo].content.length===0){
      const _todo = [...toDoItems]
      _todo.splice(indexToDo, 1)
      setToDoItems(_todo)
      console.log("backspace!!!")
    }

    if( event.keyCode === 13 && toDoItems[indexToDo].content.length>=0){
      const _todo = [...toDoItems]
      _todo.splice(indexToDo+1, 0, new ToDo("", false))
      setToDoItems(_todo)
      console.log("Enter!!!")
    }

    
  }

  return (
    <React.Fragment>
      <ul className='ToDoContainer'>
      {toDoItems.map((todo, index)=> {
        return (
        <li key={index}>
          <input type="checkbox" onChange={(event) => toggleCompleted(index)} checked={todo.completed} hidden={todo.empty()}/>
          <input type="text" placeholder="Enter item"
          onKeyDown={(event) => keyDown(event, index)} 
          onChange={(event) => updateToDo(event, index) } 
          value={todo.content}/>
        </li>
      )
      })}

      </ul>
  
    </React.Fragment>
  )
}

export default App;
