const { required } = require('joi');
const Joi = require('joi');

module.exports.breathholdSchema = Joi.object({
    breathhold: Joi.object({
        name: Joi.string().required(),
        duration: Joi.number().required().min(1),
        type: Joi.string().required(),
        orifice: Joi.string().required(),
        position: Joi.string().required(),
        underInfluence: Joi.string().required(),
    })
});