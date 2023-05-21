const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        organizationId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        kubeConfig: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

    },
    options: {
        paranoid: true,
        timestamps: true
    }
}
