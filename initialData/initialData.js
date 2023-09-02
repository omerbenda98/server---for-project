const mongoose = require("../DB/connectToDb");
const User = require("../model/users/userModel");
const Card = require("../model/cards/cardModel");
const normalizeUser = require("../model/users/NormalizeUser");
const normalizeCard = require("../model/cards/NormalizeCard");
const { generateHashPassword } = require("../services/bcrypt");

const usersData = require("./users.json");
const cardsData = require("./cards.json");

const initialData = async () => {
  try {
    let cards = await Card.find();
    if (cards.length) {
      return;
    }
    let users = await User.find();
    if (users.length) {
      return;
    }

    let lastUserId = null; // This will store the ID of the last user created

    for (let user of usersData) {
      user.password = await generateHashPassword(user.password);
      let userInstance = new User(user);
      // Assuming normalizeUser modifies the user in-place and doesn't return a new object
      normalizeUser(userInstance);
      const savedUser = await userInstance.save();
      lastUserId = savedUser._id; // Update the lastUserId each time a user is saved
    }

    for (let cardData of cardsData) {
      let cardInstance = new Card(cardData);
      cardInstance.user_id = lastUserId; // Assign the ID of the last user created to the card's user_id
      // Assuming normalizeCard modifies the card in-place and doesn't return a new object
      normalizeCard(cardInstance, lastUserId.toString());
      await cardInstance.save();
    }

    console.log("Initial data populated successfully!");
  } catch (err) {
    console.log("Error populating initial data:", err);
  }
};

module.exports = initialData;
