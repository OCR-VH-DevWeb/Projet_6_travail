const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const controllSauces = require('../controllers/controllSauces');

router.get('/', auth, controllSauces.getAllThings);          // C R U D ?
router.get('/:id', controllSauces.getOneThing);
router.post('/', auth, multer, controllSauces.createThing);
router.put(':id', auth, multer, controllSauces.modifyThing);
router.delete(':id', auth, controllSauces.deleteThing);
router.post(/:id/like, auth, controllSauces.updateOneThing);


module.exports = router;