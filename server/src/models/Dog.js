const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference_image_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.JSONB, // Utilizamos JSONB para almacenar datos estructurados
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue('weight')); // Convertimos la cadena JSON a objeto JavaScript
      },
      set(value) {
        this.setDataValue('weight', JSON.stringify(value)); // Convertimos el objeto JavaScript a cadena JSON antes de almacenarlo
      }
    },
    height: {
      type: DataTypes.JSONB, // Utilizamos JSONB para almacenar datos estructurados
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue('height')); // Convertimos la cadena JSON a objeto JavaScript
      },
      set(value) {
        this.setDataValue('height', JSON.stringify(value)); // Convertimos el objeto JavaScript a cadena JSON antes de almacenarlo
      }
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { timestamps: false });

  return Dog;
};
