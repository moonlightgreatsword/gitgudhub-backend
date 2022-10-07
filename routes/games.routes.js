const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

// get all reviewed games
router.get("/reviewed", ctrls.games.index);

// get selected reviewed games
router.get("/reviewed/:id", ctrls.games.show);

// // import new game to db
// router.post("/", ctrls.games.createGame);

// // create new review for game
// router.post("/:gameId", ctrls.games.createReview);

router.post("/", ctrls.games.create)

// delete review
router.delete("/:gameId/:reviewId", ctrls.games.deleteReview);

router.put('/:gameId/:reviewId', ctrls.games.update)


module.exports = router;
