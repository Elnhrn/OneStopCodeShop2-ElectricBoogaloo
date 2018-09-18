module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    comment: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  });
  Comments.associate = function(models) {
    Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comments;
};
