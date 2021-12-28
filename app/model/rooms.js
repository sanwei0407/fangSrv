/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('rooms', {
    roomid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    buildId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    roomNum: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    floor: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    hasAc: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    hasBx: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    hasXyj: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    hasWifi: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    hasTv: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    hasRsq: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    imgs: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    monthFee: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    promiseFee: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    mj: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rooms: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ting: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'rooms'
  });

  Model.associate = function() {

  }

  return Model;
};
