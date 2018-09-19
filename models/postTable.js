module.exports = function (sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
        post_subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        post_topic: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        post_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Posts.associate = function (models) {
        Posts.hasMany(models.Replies, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        })
    };

    Posts.belongsTo(models.Users, {
        foreignKey: {
            allowNull: false
        }
    });

    Posts.belongsTo(models.Topics, {
        foreignKey: {
            allowNull: false
        }
    });
    
    return Posts;
};