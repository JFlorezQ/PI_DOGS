const { Dog, Temperament } = require('../db.js');

const postDogs = async (dog) => {
  try {
    // Verificar si faltan datos
    const requiredFields = [
      'name',
      'reference_image_id',
      'weightMetricMin',
      'weightMetricMax',
      'life_span',
      'temperament',
      'heightMetricMin',
      'heightMetricMax'
    ];
    
    const missingFields = requiredFields.filter(field => !dog[field]);

    if (missingFields.length > 0) {
      throw new Error(`Faltan datos para crear el perro: ${missingFields.join(', ')}`);
    }

    // Crear el perro
    const newDog = await Dog.create({
      reference_image_id: dog.reference_image_id,
      name: dog.name,
      weightImperial: `${parseInt(dog.weightMetricMin * 2.205)} - ${parseInt(dog.weightMetricMax * 2.205)}`,
      weightMetric: `${parseInt(dog.weightMetricMin)} - ${parseInt(dog.weightMetricMax)}`,
      heightMetric: `${parseInt(dog.heightMetricMin)} - ${parseInt(dog.heightMetricMax)}`,
      heightImperial: `${parseInt(dog.heightMetricMin / 2.54)} - ${parseInt(dog.heightMetricMax / 2.54)}`,
      life_span: `${dog.life_span} years`,
    });

    // Asociar temperamentos al perro (si se proporciona)
    if (dog.temperament) {
      const temperamentList = Array.isArray(dog.temperament) ? dog.temperament : [dog.temperament];
      const temperaments = await Temperament.findAll({
        where: { name: temperamentList },
      });

      await newDog.setTemperaments(temperaments);
    }

    // Obtener y devolver todos los perros
    const allDogs = await Dog.findAll();
    console.log(allDogs);
    return allDogs;
  } catch (error) {
    console.error(error.message);
    throw new Error('No se pudo crear el perro');
  }
};

module.exports = {
  postDogs,
};
