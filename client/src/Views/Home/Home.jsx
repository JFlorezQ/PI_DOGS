import './Home.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getbyName } from "../../redux/actions";
import Navbar from "../../Components/Navbar/Navbar";
import Cards from "../../Components/Cards/Cards";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const dogsName = useSelector((state) => state.dogsName);
  const currentPage = useSelector((state) => state.orderAndFilter.pagination);
   [currentPage, setCurrentPage] = useState(1); // Descomentar esta línea
  const dogsPerPage = 8;

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const totalPages = Math.ceil(allDogs.length / dogsPerPage);

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }

  function resetPage() {
    setCurrentPage(1);
  }

  return (
    <div className="homecontainer">
      <Navbar onClick={resetPage} />

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="boton"
        >
          Anterior
        </button>
        <h3>
          {currentPage} / {totalPages}
        </h3>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="boton"
        >
          Siguiente
        </button>
      </div>

      <Cards allDogs={currentDogs} />
    </div>
  );
}

export default Home;

