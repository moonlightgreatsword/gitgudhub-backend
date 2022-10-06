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

const create = (req, res) => {
  db.findById(req.body.gameId, (err, foundGame) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    if (foundGame) {
      db.findByIdAndUpdate(req.body.gameId,
        { "$push": { "reviews": {
          "gameId": req.body.gameId,
          "author": req.body.author,
          "description": req.body.description
        } } },
        { new: true },
        (error, game) => {
          if (error) return res.status(400).json({ error: error.message });
          // console.log(game)
          return res.status(200).json(game);
        });
    } else {
      db.create({
        "_id": req.body.gameId,
        "name": req.body.name,
        "released": req.body.released,
        "metacritic": req.body.metacritic,
        "backgroundImage": req.body.backgroundImage,
        "reviews": {
          "gameId": req.body.gameId,
          "author": req.body.author,
          "description": req.body.description
        }
      }, (error, game) => {
        if (error) return res.status(400).json({ error: error.message });
        // console.log(game)
        return res.status(200).json(game);
      });
    }

  } )
  
}

// delete a review
const deleteReview = (req, res) => {
  db.findById(req.params.gameId)
  .select("reviews")
  .exec((error, game) => {
    if (error) return res.status(400).json({ error: error.message });

    if (game.reviews.id(req.params.reviewId) !== null) {
      game.reviews.pull({ "_id": req.params.reviewId})
      game.save((err) => {
        if (err) return res.status(400).json({ error: error.message });
      })
      return res.status(200).json(game);
    }
  });
};

// we need to keep the gameId and author parameters inside of req.body in order for this to work, but maybe make them uneditable?
const update = (req, res) => {
  db.findOneAndUpdate(
    { "id": req.params.gameId, "reviews._id": req.params.reviewId },
    { "$set": { "reviews.$": req.body } },
    { new: true },
    (error, game) => {
      if (error) return res.status(400).json({ error: error.message });
      game.save((error) => {
        if (error) return res.status(400).json({ error: error.message })
      })
      return res.status(200).json(game)
    }
  );
};

module.exports = {
  index,
  create,
  deleteReview,
  update,
};
