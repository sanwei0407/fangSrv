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
      allowNull: true,
      defaultValue: '1'
    },
    checkInDate: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    checkOutDate: {
      type: DataTypes.BIGINT,
      allowNull: true
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
      allowNull: true
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
    },
    idNum: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    realName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sfzF: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sfzB: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    tableName: 'live'
  });

  Model.associate = function() {

  }

  return Model;
};
