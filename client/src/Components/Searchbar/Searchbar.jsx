import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getbyName } from "../../redux/actions";
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function Searchbar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

useEffect(() => {
    // Verificar si el input no está en blanco antes de realizar la búsqueda
    if (input.trim() !== "") {
      dispatch(getbyName(input));
    } // si el input está en blanco no hace nada
  }, [dispatch, input]);

  return (
    <div>
      <FaSearch id="search-icon" />
      <input
        placeholder='type to search...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
