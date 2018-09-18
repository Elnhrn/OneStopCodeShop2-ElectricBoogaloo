module.exports = function(sequelize, DataTypes) {
  var Forum = sequelize.define("Forum", {
    title: DataTypes.TEXT,
    category: DataTypes.STRING,
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
