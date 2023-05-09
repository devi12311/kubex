'use strict';
const { attributes: ModelAttributes, options: ModelOptions } = require('./model');
const SchemaValidation = require('./validation');
const Bcrypt = require('bcryptjs');


module.exports = async (server, options, sequelize) => {

    const User = sequelize.define('user', ModelAttributes, ModelOptions);

    const encryptPassword = async (user) => {
        if (user.changed('password') && user.password) {
            user.salt = await Bcrypt.genSalt();
            user.password = await Bcrypt.hash(user.password, user.salt);
        }
    }

    User.schema = function () {
        return SchemaValidation
    }

    User.addHook('afterValidate', 'joiValidation', async (user, options) => {
        const { error, value } = SchemaValidation.complete.validate(user.get({ plain: true }))
        if (error) throw new Error(error);
    });

    User.prototype.comparePassword = async function (plainPassword) {
        const hash = await Bcrypt.hash(plainPassword, this.salt);
        return (this.password === hash);
    }

    User.beforeCreate(encryptPassword);
    User.beforeUpdate(encryptPassword);

    return User;
}
