/* 📍 GET | /dogs
Obtiene un arreglo de objetos, donde cada objeto es un dog con su información.
IMPORTANTE: Si un dog no tiene imagen, deberás colocarle una por defecto 🖼️ 
Debe traer tanto de la api como de la base de datos*/

const axios = require('axios');
const { Dog, DogTemperament } = require('../db.js');

const { YOUR_API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;



const getDogs = async (req, res) => {
    try {
        // Obtener datos de la API
        const apiResponse = await axios.get(URL); //Se trae la información de la en un objeto gigante
        const apiDogs = apiResponse.data; // se extrae la Data


        // verificar que el resultado sea lo que esperamos y que existan los datos
        if (!apiDogs || !Array.isArray(apiDogs)) {
            throw new Error('No se encontraron datos de Razas en la API');
        }

        // Mapea los dogs de la API

        const dogsAPI = apiDogs.map((dog) => ({
            id: dog.id,
            image: !dog.reference_image_id
            ? "https://img.freepik.com/vector-premium/ilustracion-perro-lindo-perro-kawaii-chibi-estilo-dibujo-vectorial-dibujos-animados-perro_622550-74.jpg"
            : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
            name: dog.name,
            // Verificar que haya recibido el objeto de peso para ir hasta el sistema metrico
            weightMetric: dog.weight ? `${dog.weight.metric} kg` : "Raza sin peso",
            weightImperial: dog.weight ? `${dog.weight.imperial} lb` : "Raza sin peso",
            temperament: dog.temperament || "Raza sin temperamento",
            heightMetric: dog.height ? `${dog.height.metric} cm` : "Raza sin altura",
            heightImperial: dog.height ? `${dog.height.imperial} inch` : "Raza sin altura",
            life_span: dog.life_span
        }));
        //Recuperar datos de la DB

        // Consultar los datos del modelo Dog

        const databaseDogs = await Dog.findAll();
        const databaseDogsTemperaments = await  DogTemperament.findAll();
        
        // Crear un mapa para asociar temperamentos con los perros correspondientes
        const temperamentsMap = new Map();
        databaseDogsTemperaments.forEach((dogTemperament) => {
          if (!temperamentsMap.has(dogTemperament.dogId)) {
            temperamentsMap.set(dogTemperament.dogId, []);
          }
          temperamentsMap.get(dogTemperament.dogId).push(dogTemperament.temperamentId);
        });
        
        // Mapear los datos de la base de datos
        const dogsDatabase = databaseDogs.map((dog) => {
          const temperamentsIds = temperamentsMap.get(dog.id) || [];
          const temperaments = temperamentsIds.map((tempId) => {
            const associatedTemperament = databaseDogsTemperaments.find((temp) => temp.id === tempId);
            return associatedTemperament ? associatedTemperament.name : "Raza sin temperamento";
          });//
        
          return {
            id: dog.id,
            image: dog.reference_image_id || "https://img.freepik.com/vector-premium/ilustracion-perro-lindo-perro-kawaii-chibi-estilo-dibujo-vectorial-dibujos-animados-perro_622550-74.jpg",
            name: dog.name,
            weightMetric: `${dog.weightMetric} kg` || "Raza sin peso",
            weightImperial: `${dog.weightImperial} lb` || "Raza sin peso",
            temperament: dog.temperament || "Raza sin temperamento",
            heightMetric: `${dog.heightMetric} cm` || "Raza sin altura",
            heightImperial: `${dog.heightImperial} inch` || "Raza sin altura",
            life_span: dog.life_span
          };
        });
        
        // Combinar datos de la API y la base de datos

        const dogs = [...dogsAPI, ...dogsDatabase];

        return res.status(200).json(dogs)
    }


    catch (error) {
        if (error.response) {
            return res.status(500).send(error.response.data.error);
        } else if (error.name === 'SequelizeDatabaseError') {
            // Manejar errores de la base de datos de manera específica
            return res.status(500).send('Error en la base de datos');
        } else {
            return res.status(404).send(error.message);
        }
    }

}

module.exports = { getDogs }



