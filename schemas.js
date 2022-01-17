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
        name: Joi.string().escapeHTML(),
        duration: Joi.number().required().min(1),
        comments: Joi.string().required().escapeHTML(),
        notes: Joi.string(),
        author: Joi.string().escapeHTML(),
    })
});