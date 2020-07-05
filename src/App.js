import React from 'react';
import {useState, useRef, useEffect} from 'react'
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

  useEffect(() => {
    
    let existingToDos = JSON.parse(localStorage.getItem("toDoItems"));
    if (!existingToDos) return;
    let existingToDosInit = existingToDos.map((todo)=> {
      return new ToDo(todo.content, todo.completed)
    })
    setToDoItems(existingToDosInit)

  },[])

  function toggleCompleted(indexToDo) {

    const _todo = [...toDoItems]
    if (_todo[indexToDo].completed) {
      _todo[indexToDo].completed = false
    }
    else {
      _todo[indexToDo].completed = true
    }
    localStorage.setItem('toDoItems', JSON.stringify(_todo));
    setToDoItems(_todo)
  }

  function updateToDo(event, indexToDo) {

    const _todo = [...toDoItems]
    _todo[indexToDo].content = event.target.value
    
    localStorage.setItem('toDoItems', JSON.stringify(_todo));
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
    focusOnToDoAboveIndex(indexToDo)
  }

  
  function downArrowKeyDown(event, indexToDo) {

    if (event.keyCode !== 40) return;  
    focusOnToDoBelowIndex(indexToDo)
  }


  function backSpaceKeyDown(event, indexToDo) {

    if( event.keyCode !== 8) return;
    if (toDoItems.length === 1) return;
    if (toDoItems.length === 0) return;
    // console.log(toDoItems.length)

    removeToDoAtIndex(indexToDo)
  }

  function enterKeyDown(event, indexToDo) {

    if( event.keyCode !== 13 ) return;
    addNewToDoAtIndex(indexToDo);
  }

  function focusOnToDoAboveIndex(index) {
    console.log(index)
    if (index === 0 ) return;
    setTimeout(() => {
      refsArray.current[index-1].focus()
    }, 0);
  }

  function focusOnToDoBelowIndex(index) {

    if (toDoItems.length-1 === index) return ;
    setTimeout(() => {
      refsArray.current[index+1].focus()
    }, 0);
  }

  function removeToDoAtIndex(index) {

    if (toDoItems[index].content.length>0) return;

    const _todo = [...toDoItems]
    _todo.splice(index, 1)

    
    
    setTimeout(() => {
      localStorage.setItem('toDoItems', JSON.stringify(_todo));
      setToDoItems(_todo)
      if (index===0) return;
      refsArray.current[index-1].focus()
    }, 100);
  }

  function addNewToDoAtIndex(index) {

    if (toDoItems[index].content.length===0) return ;

    const _todo = [...toDoItems]
    _todo.splice(index+1, 0, new ToDo("", false))
    setTimeout(() => {
      // localStorage.setItem('toDoItems', JSON.stringify(_todo));
      setToDoItems(_todo)
      
      refsArray.current[index+1].focus()
    }, 100);
    
  }

  return (
    <React.Fragment>
      <ul className='ToDoContainer'>
      {toDoItems.map((todo, index)=> {
        return (
        <li key={index}>
          {/* <label class="main"> */}
          <input className="checkbox" type="checkbox" onChange={(event) => toggleCompleted(index)} checked={todo.completed} hidden={todo.empty()}/>
          <span class="geekmark"></span>          
          {/* </label> */}
          <input className="inputbox"
          type="text" 
          ref={ref => { refsArray.current[index] = ref; }} 
          style={todo.style()}
          // placeholder="Enter item"
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
