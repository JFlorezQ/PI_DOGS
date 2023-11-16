import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getbyName } from "../../redux/actions";
import Navbar from "../../Components/Navbar/Navbar";
import Cards from "../../Components/Cards/Cards";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);

  useEffect(() => {
// para que me mande las cards cuando el componente está en su fase mount
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      {// que verifique si existe cartas o si no que me aparezca cargando
      }
      
      {allDogs && allDogs.length > 0 ? (
        <Cards allDogs={allDogs} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
