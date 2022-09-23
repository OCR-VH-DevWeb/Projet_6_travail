const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const controllSauces = require('../controllers/controllSauces');

router.get('/', auth, controllSauces.getAllSauces);          // C R U D ?
// router.get('/:id', auth, controllSauces.getOneSauce);
router.post('/', auth, multer, controllSauces.createSauce);
// router.put(':id', auth, multer, controllSauces.modifyThing);
// router.post('/:id/like', auth, controllSauces.updateOneThing);
// router.delete(':id', auth, controllSauces.deleteThing);


module.exports = router;