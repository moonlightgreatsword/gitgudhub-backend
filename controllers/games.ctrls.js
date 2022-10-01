const db = require("../models/GameReview");

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
  db.create(req.body, (error, createdGameReview) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json(createdGameReview); //  .json() will send proper headers in response so client knows it's json coming back
  });
};

const destroy = (req, res) => {
  db.findByIdAndDelete(req.params.id, (error, deletedGameReview) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      message: `Game Review saying, "${deletedGameReview.description}" deleted successfully`,
    });
  });
};

const update = (req, res) => {
  db.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true },
    (error, updatedGame) => {
      if (error) return res.status(400).json({ error: error.message });

      return res.status(200).json(updatedGame);
    }
  );
};

module.exports = {
  index,
  create,
  destroy,
  update,
};
