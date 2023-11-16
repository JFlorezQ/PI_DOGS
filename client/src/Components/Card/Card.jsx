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
      <NavLink to={`/detail/${id}`} >
         {<img className="image" src={image} alt={name} /> }
         <h2 className="texto"> {name}</h2>
         <h2 className="texto">Temperament: {temperament} </h2>
         <h2 className='texto'> Peso: { weightMetric} </h2>
    </NavLink> 
         
    </div>
  )
}

export default Card;

