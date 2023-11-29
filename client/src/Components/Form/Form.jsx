import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDog } from '../../redux/actions/index';
import validation from '../validation';

function Form() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperament);

  const [input, setInput] = useState({
    name: "",
    reference_image_id: "",
    weightMetricMin: "",
    weightMetricMax: "",
    heightMetricMin: "",
    heightMetricMax: "",
    temperament: [],
    life_spanMin: "",
    life_spanMax: ""
  });


  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    reference_image_id: "",
    weightMetricMin: "",
    weightMetricMax: "",
    heightMetricMin: "",
    heightMetricMax: "",
    temperament: "",
    life_spanMin: "",
    life_spanMax: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "temperament") {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value.split(','),
      }));
      // Validar inmediatamente cuando cambia el valor de 'temperament'
      const validationErrors = validation({ ...input, [name]: value.split(',') });
      setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
    } else if (name === "selectedTemperament") {
      setSelectedTemperament(value);
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value
      }));
      // Validar inmediatamente cuando cambian otros campos
      setErrors(validation({
        ...input,
        [name]: value
      }));
    }
  };

  const handleAddSelectedTemperament = () => {
    if (selectedTemperament.trim() !== "") {
      setInput((prevInput) => ({
        ...prevInput,
        temperament: [...prevInput.temperament, selectedTemperament]
      }));
      setSelectedTemperament("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validation(input);
    setErrors(validationErrors);

    if (validationErrors && Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }

    try {
      dispatch(postDog(input));

      setInput({
        name: "",
        reference_image_id: "",
        weightMetricMin: "",
        weightMetricMax: "",
        heightMetricMin: "",
        heightMetricMax: "",
        temperament: [],
        life_spanMin: "",
        life_spanMax: ""
      });

      setErrors({
        name: "",
    reference_image_id: "",
    weightMetricMin: "",
    weightMetricMax: "",
    heightMetricMin: "",
    heightMetricMax: "",
    temperament: "",
    life_spanMin: "",
    life_spanMax: ""
      });

      setSelectedTemperament("");

      console.log("post correcto");
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="mi-titulo">Name:  </label>
        <input
          className="respuestas"
          type="text"
          name="name"
          placeholder="Ingrese un Nombre"
          value={input.name}
          onChange={handleInputChange}
        />
        <span>{errors?.name}</span>
        <br /><br />

        <label className="mi-titulo">reference_image_id:  </label>
        <input
          className="respuestas"
          type="text"
          name="reference_image_id"
          placeholder="Ingrese un link"
          value={input.reference_image_id}
          onChange={handleInputChange}
        />
        <span>{errors?.reference_image_id}</span>
        <br /><br />

        <label className="mi-titulo">Minimum Weight (kg):  </label>
        <input
          className="respuestas"
          type="text"
          name="weightMetricMin"
          placeholder="Ingrese el peso en kg"
          value={input.weightMetricMin}
          onChange={handleInputChange}
        />
        <span>{errors?.weightMetricMin}</span>
        <br /><br />

        <label className="mi-titulo">Maximum Weight (kg):  </label>
        <input
          className="respuestas"
          type="text"
          name="weightMetricMax"
          placeholder="Ingrese el peso en lb"
          value={input.weightMetricMax}
          onChange={handleInputChange}

        />
        <span>{errors?.weightMetricMax}</span>
        <br /><br />

        <label className="mi-titulo">Minimum Height (cm):  </label>
        <input
          className="respuestas"
          type="text"
          name="heightMetricMin"
          placeholder="Ingrese la altura en cm"
          value={input.heightMetricMin}
          onChange={handleInputChange}

        />
        <span>{errors?.heightMetricMin}</span>
        <br /><br />

        <label className="mi-titulo">Maximum Height (cm):  </label>
        <input
          className="respuestas"
          type="text"
          name="heightMetricMax"
          placeholder="Ingrese la altura en pies"
          value={input.heightMetricMax}
          onChange={handleInputChange}
        />
        <span>{errors?.heightMetricMax}</span>
        <br /><br />

        <label className="mi-titulo"> Minimum life span:  </label>
        <input
          className="respuestas"
          type="text"
          name="life_spanMin"
          placeholder="Ingrese tiempo de vida en años"
          value={input.life_spanMin}
          onChange={handleInputChange}
        />
        <span>{errors?.life_spanMin}</span>
        <label className="mi-titulo"> Maximum life span:  </label>
        <input
          className="respuestas"
          type="text"
          name="life_spanMax"
          placeholder="Ingrese tiempo de vida en años"
          value={input.life_spanMax}
          onChange={handleInputChange}
        />
        <span>{errors?.life_spanMax}</span>

        <label className="mi-titulo">Temperament: </label>
<div>
  {input.temperament.map((temp, index) => (
    <span key={index} className="temperament-tag">{temp}</span>
  ))}
</div>
<br />

<label className="mi-titulo">Seleccionar Temperamento: </label>
<select
  className="respuestas"
  name="selectedTemperament"
  value={selectedTemperament}
  onChange={handleInputChange}
>
  <option value="">Seleccionar...</option>
  {temperaments
    .filter((temp) => !input.temperament.includes(temp.name))
    .map((temp) => (
      <option key={temp.id} value={temp.name}>
        {temp.name}
      </option>
    ))}
</select>
<button type="button" onClick={handleAddSelectedTemperament}>
  Agregar
</button>

        <br /><br />
        <span>{errors?.temperament}</span>
        <br /><br />

        <button className="boton" type="submit" disabled={Object.values(errors).some(error => error !== "")}>
          Enviar
        </button>

      </form>

    </div>
  );
}

export default Form;