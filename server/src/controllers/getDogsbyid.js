/* GET | /dogs/:idDog
-  Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
-  La raza es recibida por parámetro (ID).
-  Tiene que incluir los datos de los temperamentos asociadas a esta raza.
-  Debe funcionar tanto para los perros de la API como para los de la base de datos.*/

const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds`;
const { Dog, Temperament, DogTemperament } = require('../db.js');


const getDogById = async (req, res) => {
  try {
    const { id } = req.params;
    const uuidRegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    let dog;

    if (/^\d+$/.test(id)) {
      const response = await axios.get(`${URL}/${id}?api_key=${YOUR_API_KEY}`);

      if (!response.data.name) {
        throw new Error(`Faltan datos de la raza con ID (api): ${id}`);
      }

      dog = {
        id: response.data.id,
        image: `https://cdn2.thedogapi.com/images/${response.data.reference_image_id}.jpg`,
        name: response.data.name,
        weightMetric: response.data.weight ? `${response.data.weight.metric} kg` : 'Raza sin peso',
        weightImperial: response.data.weight ? `${response.data.weight.imperial} lb` : 'Raza sin peso',
        temperament: response.data.temperament || 'Raza sin temperamento',
        heightMetric: response.data.height ? `${response.data.height.metric} cm` : 'Raza sin altura',
        heightImperial: response.data.height ? `${response.data.height.imperial} inch` : 'Raza sin altura',
        life_span: response.data.life_span,
      };
    } else if (uuidRegExp.test(id)) {
      const dogFromDB = await Dog.findByPk(id, {
        include: [
          {
            model: Temperament,
            attributes: ['name'],
            through: {
              model: DogTemperament,
              attributes: [],
            },
          },
        ],
      });

      if (!dogFromDB) {
        throw new Error(`Faltan datos de la raza con ID: ${id}`);
      }

      dog = {
        id: dogFromDB.id,
        image: dogFromDB.reference_image_id || 'https://img.freepik.com/vector-premium/ilustracion-perro-lindo-perro-kawaii-chibi-estilo-dibujo-vectorial-dibujos-animados-perro_622550-74.jpg',
        name: dogFromDB.name,
        weightMetric: `${dogFromDB.weightMetric} kg` || 'Raza sin peso',
        weightImperial: `${dogFromDB.weightImperial} lb` || 'Raza sin peso',
        temperament: dogFromDB.Temperaments.map((temp) => temp.name).join(', ') || 'Raza sin temperamento',
        heightMetric: `${dogFromDB.heightMetric} cm` || 'Raza sin altura',
        heightImperial: `${dogFromDB.heightImperial} inch` || 'Raza sin altura',
        life_span: dogFromDB.life_span,
      };
    } else {
      throw new Error(`${id} es un tipo de dato incorrecto`);
    }

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
