const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        isPrivate: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

    },
    options: {}
}
