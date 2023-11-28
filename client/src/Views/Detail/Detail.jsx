import './Detail.css';
import  {useState,  useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getbyID } from "../../redux/actions";

function Detail() {
  const {id} = useParams()
  const [dogsID, setDogsID] = useState({});
  useEffect(() => {
      axios(`http://localhost:1030/dogs/${id}`).then(({ data }) => {
         if (data.name) {
            setDogsID(data);
         } else {
            window.alert('No hay personajes con ese ID');
         }
      });
      return setDogsID({});
   }, [id]);
  return (
    <div className="detail-container">
      <>
        <img className="image-container" src={dogsID?.image} alt={dogsID?.name} />
      <div className='texts-container'>
         <h2 className='text-container'> id: {dogsID?.id} </h2>
        <h2 className="text-container"> Name: {dogsID?.name}</h2>
        <h2 className="text-container">Temperament: {dogsID?.temperament} </h2>
        <h2 className='text-container'> Peso metrico: { dogsID?.weightMetric} </h2>
        <h2 className='text-container'> Peso imperial: { dogsID?.weightImperial} </h2>
        <h2 className='text-container'> Altura metrico: { dogsID?.heightMetric} </h2>
        <h2 className='text-container'> Altura imperial: { dogsID?.heightImperial} </h2>
        <h2 className='text-container'> Tiempo de vida: { dogsID?.life_span} </h2>
        </div>

      </>
      <button className="boton"> 
      <NavLink className='link' to="/home"> Home </NavLink>
      </button>
    </div> 
  );
}

export default Detail;
