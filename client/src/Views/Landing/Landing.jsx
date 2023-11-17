import React from 'react';
import './Landing.css';
import { NavLink } from 'react-router-dom';


function Landing() {
  return (
    <div className='landing-container'>
      <h1 className='landing-text'>¿Eres un curioso por los perros?</h1>

      <button className="landing-button">
        <NavLink className='navlink-no-underline' to="/home">Ingresa</NavLink>
      </button>
    </div>
  );
}
 
export default Landing;


