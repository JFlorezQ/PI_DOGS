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
    weightMetric: "",
    weightImperial: "",
    heightImperial: "",
    temperament: [],
    heightMetric: "",
    life_span: ""
  });

  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    reference_image_id: "",
    weightMetric: "",
    temperament: "",
    weightImperial: "",
    heightImperial: "",
    heightMetric: "",
    life_span: ""
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
        weightMetric: "",
        temperament: [],
        heightMetric: "",
        life_span: "",
        weightImperial: "",
        heightImperial: "",
      });

      setErrors({
        name: "",
        reference_image_id: "",
        weightMetric: "",
        temperament: "",
        weightImperial: "",
        heightImperial: "",
        heightMetric: "",
        life_span: ""
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

        <label className="mi-titulo">Weight metric:  </label>
        <input
          className="respuestas"
          type="text"
          name="weightMetric"
          placeholder="Ingrese el peso en kg"
          value={input.weightMetric}
          onChange={handleInputChange}
        />
        <span>{errors?.weightMetric}</span>
        <br /><br />

        <label className="mi-titulo">Weight Imperial:  </label>
        <input
          className="respuestas"
          type="text"
          name="weightImperial"
          placeholder="Ingrese el peso en lb"
          value={input.weightImperial}
          onChange={handleInputChange}

        />
        <span>{errors?.weightImperial}</span>
        <br /><br />

        <label className="mi-titulo">Height metric:  </label>
        <input
          className="respuestas"
          type="text"
          name="heightMetric"
          placeholder="Ingrese la altura en cm"
          value={input.heightMetric}
          onChange={handleInputChange}

        />
        <span>{errors?.heightMetric}</span>
        <br /><br />

        <label className="mi-titulo">Height Imperial:  </label>
        <input
          className="respuestas"
          type="text"
          name="heightImperial"
          placeholder="Ingrese la altura en pies"
          value={input.heightImperial}
          onChange={handleInputChange}
        />
        <span>{errors?.heightImperial}</span>
        <br /><br />

        <label className="mi-titulo">life span:  </label>
        <input
          className="respuestas"
          type="text"
          name="life_span"
          placeholder="Ingrese tiempo de vida"
          value={input.life_span}
          onChange={handleInputChange}
        />
        <span>{errors?.life_span}</span>

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
          {temperaments.map((temp) => (
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