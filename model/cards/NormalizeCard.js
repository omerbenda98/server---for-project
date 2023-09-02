const normalizeCard = (card, userId) => {
  if (!card.image) card.image = {}; // If the image property doesn't exist, initialize it

  card.image.url =
    card.image.url ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  card.image.alt = card.image.alt || "Default card image";
  card.user_id = card.user_id || userId;
  // Return the modified card instance
  return card;
};

module.exports = normalizeCard;
