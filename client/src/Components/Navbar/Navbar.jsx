
import './Navbar.css';
import Searchbar from '../Searchbar/Searchbar';
import {NavLink } from "react-router-dom";



function Navbar({ onSearch }) {
  return (
    <nav>
      <Searchbar onSearch={onSearch} />
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