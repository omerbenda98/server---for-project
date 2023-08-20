// NormalizeCard.js
const normalizeCard = (card, userId) => {
  console.log(userId);
  return {
    ...card,
    image: {
      url:
        card.image && card.image.url
          ? card.image.url
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      alt: card.image && card.image.alt ? card.image.alt : "Default card image",
    },
    user_id: card.user_id || userId,
  };
};

module.exports = normalizeCard;
