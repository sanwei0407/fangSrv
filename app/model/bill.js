/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('bill', {
    billId: {
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
    monthFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    waterCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dianCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    otherFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    payType: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    payStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    dianCost: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    waterCost: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sDate: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    eDate: {
      type: DataTypes.BIGINT,
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
    tableName: 'bill'
  });

  Model.associate = function() {

  }

  return Model;
};
