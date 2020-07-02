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
  
  var item1 = new ToDo("", false)
  const initToDoItems = [item1]
  const [toDoItems, setToDoItems] = useState(initToDoItems)
  const refsArray = useRef([])

  function toggleCompleted(indexToDo) {

    const _todo = [...toDoItems]
    if (_todo[indexToDo].completed) {
      _todo[indexToDo].completed = false
    }
    else {
      _todo[indexToDo].completed = true
    }
    setToDoItems(_todo)
  }

  function updateToDo(event, indexToDo) {

    const _todo = [...toDoItems]
    _todo[indexToDo].content = event.target.value
    setToDoItems(_todo)
  }

  function keyDown(event, indexToDo) {

    upArrowKeyDown(event, indexToDo)
    downArrowKeyDown(event, indexToDo)
    backSpaceKeyDown(event, indexToDo)
    enterKeyDown(event, indexToDo)
  }


  function upArrowKeyDown(event, indexToDo) {

    if (event.keyCode !== 38) return;
    
    if (indexToDo> 0) {
      setTimeout(() => {
        refsArray.current[indexToDo-1].focus()
      }, 0);
    }
  }

  function downArrowKeyDown(event, indexToDo) {

    if (event.keyCode !== 40) return;
  
    if (toDoItems.length-1 !== indexToDo) {
      setTimeout(() => {
        refsArray.current[indexToDo+1].focus()
      }, 0);
    }
  }

  function backSpaceKeyDown(event, indexToDo) {

    if( event.keyCode !== 8) return;

    if (toDoItems.length === 1) return;
 
    if (toDoItems[indexToDo].content.length===0){
      const _todo = [...toDoItems]
      _todo.splice(indexToDo, 1)
      setTimeout(() => {
        setToDoItems(_todo)
        refsArray.current[indexToDo-1].focus()
      }, 100);
    }
  }

  function enterKeyDown(event, indexToDo) {
    
    if( event.keyCode !== 13 ) return;

    if (toDoItems[indexToDo].content.length>=0){
      const _todo = [...toDoItems]
      _todo.splice(indexToDo+1, 0, new ToDo("", false))
      
      setTimeout(() => {
        setToDoItems(_todo)
        refsArray.current[indexToDo+1].focus()
      }, 100);
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
