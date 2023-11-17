import './Home.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getbyName } from "../../redux/actions";
import Navbar from "../../Components/Navbar/Navbar";
import Cards from "../../Components/Cards/Cards";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const dogsName = useSelector((state) => state.dogsName);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className="homecontainer">
      <Navbar />

      {dogsName && dogsName.length > 0 ? (
        <Cards allDogs={dogsName} />
      ) : (
        <Cards allDogs={allDogs} />
      )}
    </div>
  );
}

export default Home;

