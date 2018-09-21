module.exports = function (sequelize, DataTypes) {
    var Replies = sequelize.define("Replies", {
        reply_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        createdAt: {
            type: DataTypes.TIMESTAMP,
            allowNull: false,
            validate: {
                len: [1]
            },
            DEFAULT: CURRENT_TIMESTAMP
        },
        reply_post: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        reply_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Replies.associate = function (models) {
        Replies.belongsTo(models.Posts, {
            foreignKey: {
                allowNull: false
            }
        });

        Replies.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Replies;
};

