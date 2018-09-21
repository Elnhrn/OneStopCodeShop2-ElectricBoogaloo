module.exports = function (sequelize, DataTypes) {
    var Topics = sequelize.define("Topics", {
        topic_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        topic_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
        // },
        // createdAt: {
        //     type: DataTypes.TIMESTAMP,
        //     allowNull: false,
        //     DEFAULT: CURRENT_TIMESTAMP
        // }
    });

    Topics.associate = function (models) {
        Topics.hasMany(models.Posts, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        })
    };
    return Topics;
}; 
