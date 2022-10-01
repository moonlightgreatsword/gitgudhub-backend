const mongoose = require("mongoose");

const gameReviewSchema = new mongoose.Schema({
  description: {
    type: String,
    default: "Best game ever!",
  },
});

const GameReview = mongoose.model("GameReview", gameReviewSchema);

module.exports = GameReview;
