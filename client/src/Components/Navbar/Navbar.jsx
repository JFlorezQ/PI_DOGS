
import './Navbar.css';
import Searchbar from '../Searchbar/Searchbar';
import Filterbar from '../Filterbar/Filterbar';
import {NavLink } from "react-router-dom";



function Navbar({ onSearch }) {
  return (
    <nav>
      <Searchbar className='Searchbar' onSearch={onSearch} />
      <Filterbar/>
      <div className="botones">
      <button className="boton"> 
      <NavLink className='link' to="/about"> About </NavLink>
      </button>
      <button className="boton"> 
      <NavLink className='link' to="/create"> create </NavLink>
      </button>
      <button className="boton">  
      <NavLink className='link' to="/"> landing </NavLink>
      </button>
      </div>
    </nav>
  )
}

export default Navbar;