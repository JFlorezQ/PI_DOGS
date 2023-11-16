import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getbyName } from "../../redux/actions";
import Navbar from "../../Components/Navbar/Navbar";
import Cards from "../../Components/Cards/Cards";

// En tu componente Home
function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const filteredDogs = useSelector((state) => state.filteredDogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      {filteredDogs && filteredDogs.length > 0 ? (
        <Cards allDogs={filteredDogs} />
      ) : (
        <Cards allDogs={allDogs} />
      )}
    </div>
  );
}

export default Home;

