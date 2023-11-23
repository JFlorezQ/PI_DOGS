import './Create.css';

import Form from '../../Components/Form/Form';
import {NavLink } from "react-router-dom";



function Create() {

  return (

    <div>
      <h1> Create a new Dog!</h1>
      <nav>
      <button className="boton"> 
      <NavLink className='link' to="/about"> About </NavLink>
      </button>
      <button className="boton"> 
      <NavLink className='link' to="/home"> Home </NavLink>
      </button>
      <button className="boton">  
      <NavLink className='link' to="/"> landing </NavLink>
      </button>
    </nav>
      <Form/>

    </div>
  )
}


export default Create;
