import React from 'react';
import {useState} from 'react'

import './App.css';

function App() {
  return (
    <React.Fragment>
  <ToDoContainer/>
    </React.Fragment>
  )
}

function ToDoContainer() {



  const enterKeyStuff = (e) => {
    e.preventDefault();
    console.log("hey i hit enter!!!!")
  }
  return (
    <div className="App">
     <form className="center" onSubmit={enterKeyStuff} >
    
  <ToDoItem/>
     
     </form>
    </div>
  );
}


function CheckBox({onUpdate, checkStatus, hidden}) {
  
  return (
    <input type="checkbox" onChange={onUpdate} checked={checkStatus} hidden={hidden}/> 
  )
}

function ToDoItem() {
  const [hiddenCheckBox, toggleHidingCheckBox] = useState(true)
  const [checked, toggleCheck] = useState(false)

  const toggleCheckItem = () => {
    checked ? toggleCheck(false): toggleCheck(true)
  }

  const onUserInput = (values) => {
    if (values.length > 0) {
      toggleHidingCheckBox(false)
    } 
    else {
      toggleCheck(false)
      toggleHidingCheckBox(true)
    }
  }



  return ( 
         <React.Fragment>
           <CheckBox onUpdate={toggleCheckItem} checkStatus={checked} hidden={hiddenCheckBox} />
           <UserInput onUpdate={onUserInput} checkStatus={checked}/>
         </React.Fragment>
  )
}

function UserInput({onUpdate, checkStatus}) {


  const [inputValue, setInputValue] = useState('')

  const updateInput = (e) => {
    onUpdate(e.target.value)
    setInputValue(e.target.value)
    
  }


  const strikeThrough = {
    textDecoration: 'line-through'
  };
  return (
    <React.Fragment>
      {checkStatus ? 
    <input 
    type="text"
    placeholder="Enter item"
    autoComplete="off"
    style={strikeThrough}
    onChange={updateInput}
    value={inputValue}
    />:
    <input 
    type="text"
    placeholder="Enter item"
    autoComplete="off"
    onChange={updateInput}
    value={inputValue}
    />
      }
   </React.Fragment>

  )
}


// function dostuff(e){
//   //e.preventDefault()
//   console.log(e.target.value)
//  // console.log(e.target.value)
// }


// function selected(e){
//   console.log("one of these is selected!")
// }
export default App;
