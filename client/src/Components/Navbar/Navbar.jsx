
import './Navbar.css';
import Searchbar from '../Searchbar/Searchbar';



function Navbar({ handleChange, handleSubmit, showAll}) {
  return (
    <nav>
      <h1> hola este es mi navbar</h1>
      <Searchbar/>
    </nav>
  )
}

export default Navbar;