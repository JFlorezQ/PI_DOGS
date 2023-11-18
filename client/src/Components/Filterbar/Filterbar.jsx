
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

  const handleOrder = (e)=>{
    dispatch(orderDogs(e.target.value))
  }

  const handleFilterByTemperament = (e)=>{
    dispatch(filterbyTemp(e.target.value))
  }

  const handleFilterbyOrigin = (e)=>{
    dispatch(filterbyOrigin(e.target.value))
  }


  return (
    <div className='Filterbarcontainer'>
    
      <select name="order" value={order} onChange={handleOrder}>
                    <option value="A">A-Z</option>
                    <option value="Z">Z-A</option>
                    <option value = "minweight"> peso minimo </option>
                    <option value = "maxweight"> peso maximo </option>
      </select>

      <select name="filterbyTemperament" value={temperamentFilter} onChange={handleFilterByTemperament}>
        <option value="All"> All</option>
        {temperament.length > 0 && temperament.map((temperamentItem) => (
  <option value={temperamentItem.name} key={temperamentItem.name}>
    {String(temperamentItem.name).toUpperCase()}
  </option>
))}    </select>

<select name="filterbyOrigin" value={originFilter} onChange={handleFilterbyOrigin}>
        <option value="All"> All</option>
        <option value="Api"> Api</option>
        <option value="Created"> Created</option>
        
   </select>
         
    </div>
  )
}

export default Filterbar;

