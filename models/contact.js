const {Schema, model} = require("mongoose");
const {mongooseError} = require("../helpers");
const joi = require("joi");

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
}, {versionKey: false, timestamps: true});

contactsSchema.post("save", mongooseError)

const Contact = model("contact", contactsSchema);

const addSchema = joi.object({
    name: joi.string().min(3).max(18).required(),
    email: joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required(),
    phone: joi.string().min(10).max(15).required(),
    favorite: joi.boolean(),
  })
  
const updateSchema = joi.object({
    name: joi.string().min(3).max(18),
    email: joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: joi.string().min(10).max(15),
    favorite: joi.boolean(),
  });

  const updateFavoriteSchema = joi.object({
    favorite: joi.boolean().required(),
  })

module.exports = {
    Contact,
    addSchema,
    updateSchema,
    updateFavoriteSchema
};