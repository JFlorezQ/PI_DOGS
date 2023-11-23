require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const fs = require('fs');
const path = require('path');

// Configura la conexión a la base de datos utilizando las variables de entorno
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

// Importa los modelos definidos en el directorio /models
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    try {
      const model = require(path.join(__dirname, '/models', file));
      model(sequelize); // Ejecuta la función de modelo y pasa la instancia de Sequelize
      modelDefiners.push(model);
    } catch (error) {
      console.error(`Error al importar el modelo ${file}: ${error.message}`);
    }
  });

// Define las relaciones entre los modelos instancias de cada modelo
const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, { through: "DogTemperament" });
Temperament.belongsToMany(Dog, { through: "DogTemperament" });

module.exports = {
  Temperament,
  Dog,
  ...sequelize.models,
  conn: sequelize,
};
