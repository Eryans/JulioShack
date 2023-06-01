const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Répertoire où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Renommage du fichier
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
