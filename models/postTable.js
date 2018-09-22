module.exports = function (sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
        post_subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                len: [1]
            },
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
    });

    Posts.associate = function (models) {
        Posts.hasMany(models.Replies, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        });

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
    };
    return Posts;
}