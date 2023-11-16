/* GET | /dogs/:idDog
-  Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
-  La raza es recibida por parámetro (ID).
-  Tiene que incluir los datos de los temperamentos asociadas a esta raza.
-  Debe funcionar tanto para los perros de la API como para los de la base de datos.*/

const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds`;
const { Dog } = require('../db.js')

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;

    const uuidRegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    let dog;

    //evalua si el id es un integro

    if (/^\d+$/.test(id)) {
      // Si el ID es un número, busca La raza en la API
      const response = await axios.get(`${URL}/${id}?api_key=${YOUR_API_KEY}`);

      if (!response.data.name) {
        throw new Error(`Faltan datos de la raza con ID (api): ${id}`);
      }
      // Si encuentra el id, la constante dog toma estos datos
      dog = {
        id: response.data.id,
        image: `https://cdn2.thedogapi.com/images/${response.data.reference_image_id}.jpg`,
        name: response.data.name,
        // Verificar que haya recibido el objeto de peso para ir hasta el sistema metrico
        weightMetric: response.data.weight ? `${response.data.weight.metric} kg` : "Raza sin peso",
        weightImperial: response.data.weight ? `${response.data.weight.imperial} lb` : "Raza sin peso",
        temperament: response.data.temperament || "Raza sin temperamento",
        heightMetric: response.data.height ? `${response.data.height.metric} m` : "Raza sin altura",
        heightImperial: response.data.height ? `${response.data.height.imperial} ft` : "Raza sin altur",
        life_span: response.data.life_span
      };
    } else if (uuidRegExp.test(id)) {
      // Si el ID es un UUID, busca el conductor en la base de datos
      const dogFromDB = await Dog.findByPk(id);

      //Si no lo encuentra en la base de datos tira el error

      if (!dogFromDB) {
        throw new Error(`Faltan datos de la raza con ID: ${id}`);
      }

      //Si encuentra el id, dog toma estos datos


      dog = {
        id: dogFromDB.id,
        image: dogFromDB.reference_image_id,
        name: dogFromDB.name,
        // Verificar que haya recibido el objeto de peso para ir hasta el sistema metrico
        weightMetric: dogFromDB.weight ? `${dogFromDB.weight.metric} kg` : "Raza sin peso",
        weightImperial: dogFromDB.weight ? `${dogFromDB.weight.imperial} lb` : "Raza sin peso",
        temperament: dogFromDB.temperament || "Raza sin temperamento",
        heightMetric: dogFromDB.height ? `${dogFromDB.height.metric} m` : "Raza sin altura",
        heightImperial: dogFromDB.height ? `${dogFromDB.height.imperial} ft` : "Raza sin altura",
        life_span: dogFromDB.life_span
      };
    }

    else { throw new Error(`${id} es un tipo de dato incorrecto`) }
    // de cualquier modo si no hay error retorna dog

    return res.status(200).json(dog);

  } catch (error) {
    if (error.response) {
      return res.status(500).send(error.response.data.error);
    } else {
      return res.status(404).send(error.message);
    }
  }
};

module.exports = { getDogById };
