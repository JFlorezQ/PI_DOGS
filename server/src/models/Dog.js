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
    weightMetric: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weightImperial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    heightMetric: {
      type: DataTypes.STRING,
      allowNull: false
    },
    heightImperial: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });

  return Dog;
};
