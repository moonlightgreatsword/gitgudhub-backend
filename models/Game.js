const mongoose = require("mongoose");
const reviewSchema = require("./Review")

const gameSchema = new mongoose.Schema({
  // we are going to be manually setting the ids for games
  _id: {
    type: Number,
    required: true,
  },
  reviews: [reviewSchema]
})

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
