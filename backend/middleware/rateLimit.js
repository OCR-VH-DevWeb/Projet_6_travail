const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    max: 3, //chaque IP est limité à 3 tentatives par windowMs 
    windowMs: 10 * 60 * 1000, //10 minutes
    message: "Trop de tentatives de connexion, veuillez réessayer plus tard.",
});

module.exports = limiter;