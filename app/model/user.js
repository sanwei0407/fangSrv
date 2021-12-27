/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    pwd: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    wxOpenId: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    idNum: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    realName: {
      type: DataTypes.STRING(20),
      allowNull: true
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
    tableName: 'user'
  });

  Model.associate = function() {

  }

  return Model;
};
