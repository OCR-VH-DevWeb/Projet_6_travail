const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image.jpg': 'jpg',
    'image.jpeg': 'jpg',
    'image/jpeg': 'jpg',
    'image.png': 'png',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //renomage des images en retirant les espaces, les points puis en ajoutant la méthode date.now qui permet d'avoir un nom unique pour toutes les images
    filename: (req, file, callback) => {
        var name = file.originalname.split(' ').join('');
        name = file.originalname.split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');
