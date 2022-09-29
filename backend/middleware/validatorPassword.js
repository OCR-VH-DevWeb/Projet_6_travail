const passwordValidator = require("password-validator");

//schema de validation:
const passwordSchema = new passwordValidator();

passwordSchema
.min(6, 'Le mot de passe doit contenir au moins 6 caractères.')           // Min 6 caractères
.max(16, 'Le mot de passe doit contenir moins de 16 caractères.')         // Max 16 caractères
.uppercase(1, 'Le mot de passe doit contenir au moins 1 majuscule.')      // Au moins 1 MAJ
.lowercase(1, 'Le mot de passe doit contenir au moins 1 minuscule.')      // Au moins 1 MIN
.digits(1, 'Le mot de passe doit contenir au moins 1 chiffre.')            // Au moins 1 chiffre
.has().not().spaces();                                                    // Ne doit pas avoir d'espaces
//test du password saisit par l'utilisateur

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res
      .status(400)
      .json({
        message:
          "le mot de passe n'est pas conforme, il doit contenir entre 6 et 16 caractères,au moins 1 chiffre et 1 majuscule",
      });
  }
};
