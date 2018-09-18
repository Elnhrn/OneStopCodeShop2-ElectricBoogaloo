module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.TEXT
  });
  Users.associate = function(models) {
    Users.hasMany(models.Forum, {
      onDelete: "cascade"
    });
  };
  Users.associate = function(models) {
    Users.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };
  return Users;
};
