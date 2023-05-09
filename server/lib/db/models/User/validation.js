const Joi = require('joi');

const BaseSchema = Joi.object({
    id: Joi.allow(null),
    updatedAt: Joi.date().required(),
    createdAt: Joi.date().required(),
    deletedAt: Joi.date().allow(null),
})

const CompleteSchema = BaseSchema.keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

module.exports = {
    base: BaseSchema,
    complete: CompleteSchema
}
