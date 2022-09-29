const Sauce = require("../models/modelSauce");
const fs = require("fs");

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "Unauthorized request" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => {
            if (req.file != undefined) {
              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
              });
            }
            res.status(200).json({ message: "Objet modifié!" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce supprimée !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //se place sur la sauce
    .then((sauce) => {
      console.log(req.body);
      const likeSauce = req.body.like;
      const userId = req.body.userId;

      switch (likeSauce) {
        // cas 1=user like
        case 1:
          sauce.likes++;
          sauce.usersLiked.push(userId);
          sauce
            .save()
            .then(
              res.status(201).json({ message: "Vous avez aimé cette sauce !" })
            )
            .catch((error) => res.status(400).json({ error }));

          break;
        // cas -1 = user dislike
        case -1:
          sauce.dislikes++;
          sauce.usersDisliked.push(userId);
          sauce
            .save()
            .then(
              res
                .status(201)
                .json({ message: "Vous n'avez pas aimé cette sauce !" })
            )
            .catch((error) => res.status(400).json({ error }));

          break;
        // cas 0 = annulation like ou dislike
        case 0:
          // annulation du like
          if (sauce.usersLiked.includes(userId)) {
            const index = sauce.usersLiked.indexOf(userId);
            sauce.likes--;
            sauce.usersLiked.splice(index, 1);
            sauce
              .save()
              .then(
                res.status(201).json({ message: "Votre like a été retiré !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          //annulation dislike
          if (sauce.usersDisliked.includes(userId)) {
            const index = sauce.usersDisliked.indexOf(userId);
            sauce.dislikes--;
            sauce.usersDisliked.splice(index, 1);
            sauce
              .save()
              .then(
                res
                  .status(201)
                  .json({ message: "Votre dislike a été retiré !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
