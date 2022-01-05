const BaseJoi = require('joi');
sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !==value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.breathholdSchema = Joi.object({
    breathhold: Joi.object({
        name: Joi.string().required().escapeHTML(),
        duration: Joi.number().required().min(1),
        type: Joi.string().required().escapeHTML(),
        orifice: Joi.string().required().escapeHTML(),
        position: Joi.string().required().escapeHTML(),
        underInfluence: Joi.string().required().escapeHTML(),
        holdDate: Joi.string().escapeHTML(),
    })
});