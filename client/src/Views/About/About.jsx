import './About.css';
import  {useState,  useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

function About() {
  
  return (
    <div className="detail-container">
      <>


        <h2 > Esta app fue creada por Juls</h2>
        <h2> Me gusta mucho leer y los gatos </h2>
        <h2> Soy estudiante de henry fullstack </h2>

      </>
      <button className="boton"> 
      <NavLink className='link' to="/home"> Home </NavLink>
      </button>
    </div> 
  );
}

export default About;