/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('live', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    roomId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    checkInDate: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    checkOutDate: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    promiseFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    monthFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dianFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    waterFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    mangeFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    otherFee: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payDay: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'live'
  });

  Model.associate = function() {

  }

  return Model;
};
