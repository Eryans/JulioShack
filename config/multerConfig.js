const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.userId ?? "tmp"
    const uploadPath = path.join("uploads/", userId);

    // Vérifier si le répertoire existe, sinon le créer
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Répertoire où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Renommage du fichier
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
