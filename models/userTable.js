module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_pass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });

    Users.associate = function(models) {
        Users.hasMany(models.Posts, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "restrict",
            onUpdate: "cascade"
        });

        Users.hasMany(models.Replies, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "restrict",
            onUpdate: "cascade"
        })
    };

    return Users;
};