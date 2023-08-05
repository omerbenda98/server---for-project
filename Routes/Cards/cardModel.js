const mongoose = require("mongoose");
const minAllowEmpty = require("../../services/validatorAllowEmpty");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  age: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
    breed: {
    type: String,
    maxlength: 256,
    minlength:2,

  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },

  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },

  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 14,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 256,
  },

  image: {
    url: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    alt: { type: String, required: true, minlength: 6, maxlength: 256 },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;
