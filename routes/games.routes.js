const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

// get all reviewed games
router.get("/", ctrls.games.index);

// import new game to db
router.post("/", ctrls.games.createGame);

// create new review for game
router.post("/:gameId", ctrls.games.createReview);

// delete review
router.delete("/:gameId/:reviewId", ctrls.games.deleteReview);

router.put('/:gameId/:reviewId', ctrls.games.update)


module.exports = router;
