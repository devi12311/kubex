const Joi = require('joi');

const BaseSchema = Joi.object({
    id: Joi.allow(null),
    updatedAt: Joi.date().required(),
    createdAt: Joi.date().required(),
})

const CompleteSchema = BaseSchema.keys({
    name: Joi.string().required(),
    organizationId: Joi.string().uuid().required(),
    kubeConfig: Joi.string(),
})

module.exports = {
    base: BaseSchema,
    complete: CompleteSchema
}
