import  {useState,  useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getbyID } from "../../redux/actions";

function Detail() {
 /* const { id } = useParams();
  const dispatch = useDispatch();
  const dogsID = useSelector((state) => state.id);

  useEffect(() => {
    // para que me mande la info cuando el componente está en su fase mount
    dispatch(getbyID(id));
  }, [dispatch, id]);*/
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
    <div>
      <>
        <img className="image" src={dogsID?.image} alt={dogsID?.name} />
        <h2 className='texto'> id: {dogsID?.id} </h2>
        <h2 className="texto"> Name: {dogsID?.name}</h2>
        <h2 className="texto">Temperament: {dogsID?.temperament} </h2>
        <h2 className='texto'> Peso metrico: { dogsID?.weightMetric} </h2>
        <h2 className='texto'> Peso imperial: { dogsID?.weightImperial} </h2>
        <h2 className='texto'> Altura metrico: { dogsID?.heightMetric} </h2>
        <h2 className='texto'> Altura imperial: { dogsID?.heightImperial} </h2>
        <h2 className='texto'> Tiempo de vida: { dogsID?.life_span} </h2>
      </>
    </div>
  );
}

export default Detail;
