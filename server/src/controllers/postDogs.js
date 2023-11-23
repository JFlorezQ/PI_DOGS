const { Dog, Temperament } = require('../db.js');

const postDogs = async (dog) => {
  if (
    !dog.name ||
    !dog.reference_image_id ||
    !dog.weightImperial ||
    !dog.weightMetric ||
    !dog.life_span ||
    !dog.temperament ||
    !dog.heightImperial ||
    !dog.heightMetric
  ) {
    throw new Error(`Faltan datos para crear el perro: ${dog.name}, ${dog.reference_image_id}, ${dog.weightImperial}, ${dog.weightMetric}, ${dog.life_span}, ${dog.temperament}, ${dog.heightImperial}, ${dog.heightMetric}`);
  }

  try {
    const newDog = await Dog.create({
      reference_image_id: dog.reference_image_id,
      name: dog.name,
      weightImperial: dog.weightImperial,
      weightMetric: dog.weightMetric,
      heightMetric: dog.heightMetric,
      heightImperial: dog.heightImperial,
      life_span: dog.life_span,
    });

    // Asociar temperamentos al perro (si se proporciona)
    if (dog.temperament) {
      const temperamentList = Array.isArray(dog.temperament) ? dog.temperament : [dog.temperament];
      const temperaments = await Temperament.findAll({
        where: { name: temperamentList },
      });

      await newDog.setTemperaments(temperaments);
    }

    const allDogs = await Dog.findAll();
    console.log(allDogs);
    return allDogs;
  } catch (error) {
    throw new Error('No se pudo crear el perro');
  }
};

module.exports = {
  postDogs,
};
