// schemas.js
const Joi = require("joi");

// Listing Schema Validation
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().messages({
            "string.empty": "Title is required."
        }),
        price: Joi.number().required().min(0).messages({
            "number.base": "Price must be a number.",
            "number.min": "Price must be greater than or equal to 0."
        }),
        description: Joi.string().required().messages({
            "string.empty": "Description is required."
        }),
        location: Joi.string().required().messages({
            "string.empty": "Location is required."
        }),
        country: Joi.string().required().messages({
            "string.empty": "Country is required."
        }),
        lat: Joi.number().required().messages({
            "number.base": "Latitude must be a number.",
            "any.required": "Latitude is required."
        }),
        lng: Joi.number().required().messages({
            "number.base": "Longitude must be a number.",
            "any.required": "Longitude is required."
        })
    }).required()
});

// Review Schema Validation
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5).messages({
            "number.min": "Rating must be at least 1.",
            "number.max": "Rating cannot be more than 5."
        }),
        comment: Joi.string().required().messages({
            "string.empty": "Comment is required."
        })
    }).required()
});
