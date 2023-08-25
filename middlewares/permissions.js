const CustomError = require("../utils/CostumeError");
// const { getCardById } = require("../model/cardsService/cardsService");
/*
    TODO:
        finish isBizSpecific
*/

// const checkIfBizOwner = async (iduser, idcard, res, next) => {
//   try {
//     //! joi the idcard
//     const cardData = await getCardById(idcard);
//     if (!cardData) {
//       return res.status(400).json({ msg: "card not found" });
//     }
//     if (cardData.user_id == iduser) {
//       next();
//     } else {
//       res.status(401).json({ msg: "you not the biz owner" });
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

/*
  isBiz = every biz
  isAdmin = is admin
  isBizOwner = biz owner
*/

const permissionsMiddleware = (isBiz, isAdmin) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new CustomError("must provide userData");
    }
    if (isBiz === req.user.biz && isBiz === true) {
      return next();
    }
    if (isAdmin === req.user.isAdmin && isAdmin === true) {
      return next();
    }
    // if (isBizOwner === req.user.isBusiness && isBizOwner === true) {
    //   return checkIfBizOwner(req.user._id, req.params.id, res, next);
    // }
    res.status(401).json({ msg: "you not allowed to edit this card" });
  };
};

module.exports = permissionsMiddleware;
