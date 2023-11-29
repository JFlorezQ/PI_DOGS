const axios = require('axios');
const { Dog, DogTemperament, Temperament } = require('../db.js');

const { YOUR_API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

const getDogs = async (req, res) => {
  try {
    // Obtener datos de la API
    const apiResponse = await axios.get(URL);
    const apiDogs = apiResponse.data;

    // Verificar que el resultado sea lo que esperamos y que existan los datos
    if (!apiDogs || !Array.isArray(apiDogs)) {
      throw new Error('No se encontraron datos de Razas en la API');
    }

    // Mapear los dogs de la API
    const dogsAPI = apiDogs.map((dog) => ({
      id: dog.id,
      image: !dog.reference_image_id
        ? "https://img.freepik.com/vector-premium/ilustracion-perro-lindo-perro-kawaii-chibi-estilo-dibujo-vectorial-dibujos-animados-perro_622550-74.jpg"
        : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
      name: dog.name,
      weightMetric: dog.weight ? `${dog.weight.metric} kg` : "Raza sin peso",
      weightImperial: dog.weight ? `${dog.weight.imperial} lb` : "Raza sin peso",
      temperament: dog.temperament || "Raza sin temperamento",
      heightMetric: dog.height ? `${dog.height.metric} cm` : "Raza sin altura",
      heightImperial: dog.height ? `${dog.height.imperial} ft` : "Raza sin altura",
      life_span: dog.life_span
    }));

    // Recuperar datos de la DB
    const dogsDatabase = await Dog.findAll({
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

    // Mapear los dogs de la base de datos
// ...

// Mapear los dogs de la base de datos
const dogsDB = dogsDatabase.map((dog) => ({
  id: dog.id,
  image: dog.reference_image_id || "https://img.freepik.com/vector-premium/ilustracion-perro-lindo-perro-kawaii-chibi-estilo-dibujo-vectorial-dibujos-animados-perro_622550-74.jpg",
  name: dog.name,
  weightMetric: dog.weightMetric || "Raza sin peso",
  weightImperial: dog.weightImperial || "Raza sin peso",
  temperament: dog.Temperaments.map((temp) => temp.name).join(', ') || "Raza sin temperamento",
  heightMetric: dog.heightMetric || "Raza sin altura",
  heightImperial: dog.heightImperial || "Raza sin altura",
  life_span: dog.life_span
}));

// ...


    // Combinar datos de la API y la base de datos
    const dogs = [...dogsAPI, ...dogsDB];

    return res.status(200).json(dogs);
  } catch (error) {
    if (error.response) {
      return res.status(500).send(error.response.data.error);
    } else if (error.name === 'SequelizeDatabaseError') {
      // Manejar errores de la base de datos de manera específica
      return res.status(500).send('Error en la base de datos');
    } else {
      return res.status(404).send(error.message);
    }
  }
};

module.exports = { getDogs };




