const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const controllSauces = require("../controllers/controllSauces");

router.get("/", auth, controllSauces.getAllSauces); // C R U D ?
router.post("/", auth, multer, controllSauces.createSauce);
router.get("/:id", auth, controllSauces.getOneSauce);
router.put("/:id", auth, multer, controllSauces.modifySauce);
router.post("/:id/like", auth, controllSauces.likeSauce);
router.delete("/:id", auth, controllSauces.deleteSauce);

module.exports = router;
