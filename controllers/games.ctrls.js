const db = require("../models/Game");

// routing to subdocs: https://stackoverflow.com/questions/46840583/routing-to-sub-docs-with-express-4-and-mongoose

// index of reviewed games (entries in our own db)
const index = (req, res) => {
  db.find({}, (error, games) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      games,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

// creates a game, not a review
// should run when clicking on a game from the search field
// we need a catch somewhere to make sure we don't create duplicate games
const createGame = (req, res) => {
  // the only thing we are passing is the id from the rawg api
  db.create(req.body, (error, game) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json(game); //  .json() will send proper headers in response so client knows it's json coming back
  });
};

// creates a review
const createReview = (req, res) => {
  db.findByIdAndUpdate(req.params.gameId,
    { "$push": { "reviews": req.body } },
    { new: true },
    (error, game) => {
      if (error) return res.status(400).json({ error: error.message });

      return res.status(200).json(game);
    });
}

// delete a review
// const deleteReview = (req, res) => {
//   db.findById(req.params.gameId)
//   .select("reviews")
//   .exec((error, game) => {
//     if (error) return res.status(400).json({ error: error.message });

//     if (game.reviews.id(req.params.reviewId) !== null) {
//       game.reviews.pull({ "_id": req.params.reviewId})
//       game.save((err) => {
//         if (err) return res.status(400).
//       })
//     }
//   });
// };

// const update = (req, res) => {
//   db.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     { new: true },
//     (error, updatedGame) => {
//       if (error) return res.status(400).json({ error: error.message });

//       return res.status(200).json(updatedGame);
//     }
//   );
// };

module.exports = {
  index,
  createGame,
  createReview,
  deleteReview,
  update,
};
