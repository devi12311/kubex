const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

    },
    options: {}
}
