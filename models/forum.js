module.exports = function(sequelize, DataTypes) {
  var Forum = sequelize.define("Forum", {
    title: DataTypes.TEXT,
    body: DataTypes.TEXT
  });
  Forum.associate = function(models) {
    Forum.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Forum;
};
