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

const modelDefiners = [];

// Importa los modelos definidos en el directorio /models
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, '/models', file));
    model(sequelize); // Ejecuta la función de modelo y pasa la instancia de Sequelize
    modelDefiners.push(model);
  });

// Capitaliza los nombres de los modelos para seguir las convenciones
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Define las relaciones entre los modelos instancias de cada modelo
const { Dog, Temperament} = sequelize.models;

Dog.belongsToMany(Temperament, { through: "dog_temperament" });
Temperament.belongsToMany(Dog, { through: "dog_temperament" });

module.exports = {
  Temperament,
  Dog,
  ...sequelize.models, // Para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // Para importar la conexión { conn } = require('./db.js');
};
