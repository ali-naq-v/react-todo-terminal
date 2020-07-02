import React from 'react';
import {useState, useRef} from 'react'
import './App.css';


class ToDo {
  constructor(text, completed) {
    this.content = text;
    this.completed = completed
  }
  empty() {
    return this.content.length===0
  }

  style() {
    if (this.completed) {
      return {
        textDecoration: 'line-through'
      }
    }
  }

}

function App() {
  
  var item1 = new ToDo("stuff", false)
  var item2 = new ToDo("stuff also", false)
  var item3 = new ToDo("finished this one", true)
  var item4 = new ToDo("", false)
  
  const initToDoItems = [item1, item2, item3, item4]
  const [toDoItems, setToDoItems] = useState(initToDoItems)
  const refsArray = useRef([])

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

  const keyDown = (event, indexToDo) => {

    //backspace
    if( event.keyCode === 8 && toDoItems[indexToDo].content.length===0){
      const _todo = [...toDoItems]
      _todo.splice(indexToDo, 1)
      setToDoItems(_todo)
      setTimeout(() => {
        refsArray.current[indexToDo-1].focus()
      }, 0);
    }
    //Enter key
    if( event.keyCode === 13 && toDoItems[indexToDo].content.length>=0){
      const _todo = [...toDoItems]
      _todo.splice(indexToDo+1, 0, new ToDo("", false))
      setToDoItems(_todo)
      setTimeout(() => {
        refsArray.current[indexToDo+1].focus()
      }, 0);
    }
  }

  return (
    <React.Fragment>
      <ul className='ToDoContainer'>
      {toDoItems.map((todo, index)=> {
        return (
        <li key={index}>
          <input type="checkbox" onChange={(event) => toggleCompleted(index)} checked={todo.completed} hidden={todo.empty()}/>
          <input className="inputbox"
          type="text" 
          ref={ref => { refsArray.current[index] = ref; }} 
          style={todo.style()}
          placeholder="Enter item"
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
