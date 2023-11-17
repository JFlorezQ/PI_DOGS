
import './Filterbar.css';

import { useDispatch, useSelector  } from "react-redux";
import { orderDogs, filterbyLifespan, filterbyTemp, filterbyOrigin } from '../../redux/actions';
import { startTransition } from 'react';

function Filterbar() {
  const dispatch = useDispatch();
  const temperament = useSelector((state)=> state.temperament)
  const order = useSelector((state)=> state.orderAndFilter.order)
  const temperamentFilter = useSelector((state)=> state.orderAndFilter.temperamentFilter)
  const originFilter = useSelector((state)=> state.orderAndFilter.originFilter)
 

  const handleOrder = (e)=>{
    dispatch(orderDogs(e.target.value))
  }

  return (
    <div className='Filterbarcontainer'>
    
      <select name="order" value={order} onChange={handleOrder}>
                    <option value="A">A-Z</option>
                    <option value="D">Z-A</option>
      </select>
         
    </div>
  )
}

export default Filterbar;

