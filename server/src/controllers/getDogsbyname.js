 /* 📍 GET | /dogs/name?="..."
-  Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
-  Debe poder buscarlo independientemente de mayúsculas o minúsculas.
-  Si no existe la raza, debe mostrar un mensaje adecuado.
-  Debe buscar tanto los de la API como los de la base de datos.*/
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;
const { Dog } = require('../db.js');

const getDogByName = async (req, res) => {
  try {
    console.log('Entró al controlador getDogByName');

    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Por favor, proporciona un nombre en la consulta.' });
    }

    // Obtener datos de la API
    const apiResponse = await axios.get(`${URL}`);
    const apiDogs = apiResponse.data || [];

    // Obtener datos de la base de datos
    const databaseDogs = await Dog.findAll();

    // Filtrar los perros de la API que coinciden con el nombre (sin distinción entre mayúsculas y minúsculas)
    const matchingDogsAPI = apiDogs.filter((apiDog) => {
      const apiDogName = apiDog.name;
      return apiDogName.toLowerCase().includes(name.toLowerCase());
    });

    // Filtrar los perros de la base de datos que coinciden con el nombre (sin distinción entre mayúsculas y minúsculas)
    const matchingDogsDB = databaseDogs.filter((dbDog) => {
      const dbDogName = dbDog.name;
      return dbDogName.toLowerCase().includes(name.toLowerCase());
    });

    // Combinar datos de la API y la base de datos
    const matchingDogs = [...matchingDogsAPI, ...matchingDogsDB];

    // Tomar los primeros 15 perros que coinciden
    const first15MatchingDogs = matchingDogs.slice(0, 15);

    if (first15MatchingDogs.length === 0) {
      return res.status(404).json({ error: `No se encontraron razas con el nombre: ${name}` });
    }

    const dogsName = first15MatchingDogs.map((dog) => ({
      id: dog.id,
      image: dog.reference_image_id,
      name: dog.name,
      // Verificar que haya recibido el objeto de peso para ir hasta el sistema metrico
      weightMetric: dog.weight ? `${dog.weight.metric} kg` : "Raza sin peso",
      weightImperial: dog.weight ? `${dog.weight.imperial} lb` : "Raza sin peso",
      temperament: dog.temperament || "Raza sin temperamento",
      heightMetric: dog.height ? `${dog.height.metric} m` : "Raza sin altura",
      heightImperial: dog.height ? `${dog.height.imperial} ft` : "Raza sin altura",
      life_span: dog.life_span
    }));

    return res.status(200).json(dogsName);
  } catch (error) {
    console.error('Error en getDogByName:', error);
    if (error.response) {
      return res.status(500).send(error.response.data.error);
    } else if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).send('Error en la base de datos');
    } else {
      return res.status(500).send('Error en el servidor');
    }
  }
};

module.exports = { getDogByName };

