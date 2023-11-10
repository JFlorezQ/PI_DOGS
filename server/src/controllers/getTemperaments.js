/* 📍 GET | /temperaments
Obtiene un arreglo con todos los temperaments existentes de la API.
En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los temperaments que encuentres en la API.
Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo).
Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí. */
const axios = require('axios');
const{Temperament} = require('../db.js')
const { YOUR_API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

const gettemperaments = async (req, res) => {
  try {

    const count = await Temperament.count();

    //si la base de datos se encuentra vacía traemos los datos de la API

    if(count== 0){
        const { data } = await axios(URL);

    if (!data) {
      throw new Error('Faltan datos de la API');
    }

    console.log('Ya recuperó datos de la API');

    // Obtener todos los temperamentos de todas las razas en un solo arreglo, para esto se utiliza data que vuelve nuestros datos en un solo elemento (arreglo)
    const temperaments = data.reduce((allTemperaments, dog) => { 

    // Debemos verificar que exista la propiedad Temperaments en la raza
      if (dog.temperament !== undefined) {

        // si existe esta propiedad, por cada raza se crea un arreglo de temperaments separando las palabras por coma y borrando el espacio
        // esto porque los temperaments vienen como strings
        const temperamentsSeparated = dog.temperament.split(',').map((temperament) => temperament.trim());
        console.log(temperamentsSeparated);

        // se concatenan todos los arrays de los temperamentos de cada raza en el array creado para data que se llama allTemperaments
        allTemperaments = allTemperaments.concat(temperamentsSeparated); 
      }

      if(!allTemperaments) throw new Error ("Falló el convertir los temperamentos a array")


      return allTemperaments;
    }, []);

    // Eliminar duplicados utilizando un conjunto (Set) (pues este no permite repetidos) y luego convertirlo nuevamente en un arreglo
    const uniqueTemperaments = Array.from(new Set(temperaments));
    console.log(uniqueTemperaments.length)

    if(!uniqueTemperaments) throw new Error ("Falló al eliminar los repetidos")

    console.log("ya obtuvo el arreglo de temperamentos unicos")
  


    //Ahora se deben enviar los temperamentos a la base de datos

    // Inserta el arreglo de temperamentos en la base de datos
    //se mapea uniquetemperaments para obtener los nombres de los temperamentos
    await Temperament.bulkCreate(uniqueTemperaments.map((temperamentName) => ({ name: temperamentName }))
    );
         
     console.log('temperamentos insertados en la base de datos.')}
    
    
    // Se recuperan los datos de la base de datos

     // Consultar los datos del modelo Temperament en su propiedad nombre

     const databaseTemperaments = await Temperament.findAll()

    
    return res.status(200).json(databaseTemperaments); 

  } catch (error) {
    if (error.response) {
      return res.status(500).send(error.response.data.error);
    } else {
      return res.status(404).send(error.message);
    }
  }
};

module.exports = { gettemperaments };

