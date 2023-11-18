/* Sector en el que se vea un listado de cards con los perros.
 Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta 
 **`GET /dogs`** y deberá mostrar su:
   -  Imagen.
   -  Nombre.
   -  Temperamentos.
   -  Peso.
-  Cuando se le hace click a una Card deberá redirigir al detalle de esa raza específica. */


import './Card.css';

import {NavLink } from "react-router-dom";

function Card({dog}) {
  const{name, temperament, image, id, weightMetric} = dog
 
  return (
    <div className='cardcontainer'>
      <NavLink className= "nav-link" to={`/detail/${id}`} >
         <img className="image" src={image} alt={name} ></img> 
         <h1 className="texto"> {name}</h1>
         <p className="texto"> {temperament} </p>
          <p> { weightMetric} </p> 
    </NavLink>  
         
    </div>
  )
}

export default Card;

