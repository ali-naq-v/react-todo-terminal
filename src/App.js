import React from 'react';
import {useState} from 'react'

import './App.css';

function App() {
  return (
    <div className="App">
     <form className="center" >
    
  <ToDoItem/>
     
     </form>
    </div>
  );
}



function CheckBox({onUpdate, checkStatus}) {
  return (
    <input type="checkbox" onChange={onUpdate} checked={checkStatus}/> 
  )
}

function ToDoItem() {
  const [Checked, ToggleCheck] = useState(false)

  const ToggleCheckItem = () => {
    Checked ? ToggleCheck(false): ToggleCheck(true)

  }
  return ( 
         <React.Fragment>
           <CheckBox onUpdate={ToggleCheckItem} checkStatus={Checked}/>
           <UserInput done={Checked}/>
         </React.Fragment>
  )
}

function UserInput({done}) {
  const strikeThrough = {
    textDecoration: 'line-through'
  };
  return (
    <React.Fragment>
      {done ? 
    <input 
    type="text"
    placeholder="Enter item"
    autoComplete="off"
    style={strikeThrough}
    />:
    <input 
    type="text"
    placeholder="Enter item"
    autoComplete="off"
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
