const validator = require("validator");

module.exports = (req, res, next) => {
  //si l'email renseigné est valide
  if (validator.isEmail(req.body.email)) {
    next();
  } else {
    return res.status(400).json({ message: "Cet email n'est pas valide." });
  }
};
