const { Dog, Temperament } = require('../db.js');

const postDogs = async (req, res) => {
  try {
    const { name, weight, height, reference_image_id, life_span, temperaments } = req.body;

    // Crea el conductor en la base de datos
    const newDog = await Dog.create({
      name: name,
      weight: {
        metric: weight.metric,
        imperial: weight.imperial
      },
      height: {
        metric: height.metric,
        imperial: height.imperial
      },
      life_span: life_span,
      reference_image_id: reference_image_id,
    });
 
    // Verifica si 'Temperaments' es un arreglo (lista de temperaments) o un valor único (un temperament)
    if (Array.isArray(temperaments)) {
      // Relaciona el conductor con los temperaments proporcionados
      for (const nombretemperament of temperaments) {
        const temperamentEncontrado = await Temperament.findOne({
          where: {
            name: nombretemperament,
          },
        });
        if (equipoEncontrado) {
          await newDog.addTemperament(equipoEncontrado);
        }
      }
    } else {
      // 'tempeTemperaments' es un valor único, así que relaciona el conductor con ese equipo
      const temperamentEncontrado = await Temperament.findOne({
        where: {
          name: temperaments,
        },
      });
      if (temperamentEncontrado) {
        await newDog.addTemperament(temperamentEncontrado);
      }
    }

    return res.status(201).json({ message: 'Conductor creado con éxito' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postDogs,
};
