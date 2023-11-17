
import './Filterbar.css';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { orderDogs, filterbyLifespan, filterbyTemp, filterbyOrigin, gettemperament } from '../../redux/actions';
import { startTransition } from 'react';

function Filterbar() {
  const dispatch = useDispatch();
  const temperament = useSelector((state)=> state.temperament)
  const order = useSelector((state)=> state.orderAndFilter.order)
  const temperamentFilter = useSelector((state)=> state.orderAndFilter.temperamentFilter)
  const originFilter = useSelector((state)=> state.orderAndFilter.originFilter)
 

  useEffect(() => {
    dispatch(gettemperament());
      dispatch(filterbyTemp("All")); // Establece el valor inicial
    }, [dispatch]);


  console.log(temperament)
  const handleOrder = (e)=>{
    dispatch(orderDogs(e.target.value))
  }

  const handleFilterByTemperament = (e)=>{
    dispatch(filterbyTemp(e.target.value))
  }


  return (
    <div className='Filterbarcontainer'>
    
      <select name="order" value={order} onChange={handleOrder}>
                    <option value="A">A-Z</option>
                    <option value="Z">Z-A</option>
      </select>

      <select name="filterbyTemperament" value={temperamentFilter} onChange={handleFilterByTemperament}>
        <option value="All"> All</option>
        {temperament.length > 0 && temperament.map((temperamentItem) => (
  <option value={temperamentItem.name} key={temperamentItem.name}>
    {String(temperamentItem.name).toUpperCase()}
  </option>
))}



      </select>
         
    </div>
  )
}

export default Filterbar;

