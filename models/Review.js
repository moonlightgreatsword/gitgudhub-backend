const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    gameId: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        default: "Anonymous",
    },
    description: {
      type: String,
      default: "Best game ever!",
    },
  });

module.exports = reviewSchema;