const { Card } = require("./cardModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const { generateBizNum } = require("./services/generateBizNum");
const { validateCard } = require("./cardValidation");
const normalizeCard = require("../../model/cards/NormalizeCard");
const permissionsMiddleware = require("../../middlewares/permissions");

/********** סעיף 7 **********/
router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    return res.json(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

/********** סעיף 9 **********/
router.get("/my-cards", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user.biz) return res.status(403).json("Un authorize user!");
    const cards = await Card.find({ user_id: user._id });
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.post("/", auth, permissionsMiddleware(true, false), async (req, res) => {
  try {
    const user = req.user;
    console.log(user._id);

    if (!user.biz) {
      console.log(
        chalk.redBright("A non biz user attempted to create a card!")
      );
      return res.status(403).json("Un authorize user!");
    }

    let card = req.body;

    const { error } = validateCard(card);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }
    card = new Card(normalizeCard(req.body, user._id));

    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    console.log("user", user);
    if (!user.biz && !user.isAdmin) {
      console.log(
        chalk.redBright("A non-business user attempted to create a card!")
      );
      return res.status(403).json("You are not authorize to edit card!");
    }
    let card = req.body;
    delete card._id;
    const { error } = validateCard(card);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }

    normalizedCard = normalizeCard(card);

    const filter = {
      _id: req.params.id,
      userID: user._id,
    };
    if (user.isAdmin) {
      delete filter.userID;
    }

    normalizedCard = await Card.findOneAndUpdate(filter, normalizedCard);
    if (!normalizedCard) {
      console.log(chalk.redBright("No card with this ID in the database!"));
      return res.status(404).send("No card with this ID in the database!");
    }
    normalizedCard = await Card.findById(normalizedCard._id);
    return res.send(normalizedCard);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user.biz && !user.isAdmin) {
      console.log(
        chalk.redBright("A non-business user attempted to create a card!")
      );
      return res.status(403).json("You are not authorize to delete this card!");
    }

    let card;

    if (user.isAdmin) {
      card = await Card.findOneAndRemove({
        _id: req.params.id,
      });
    } else if (user.biz) {
      card = await Card.findOneAndRemove({
        _id: req.params.id,
        user_id: user._id,
      });
    }

    if (!card) {
      console.log(chalk.redBright("Un authorized user!"));
      return res.status(403).send("You are noe authorize to delete cards");
    }

    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not delet card:", error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;
