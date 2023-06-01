const express = require("express");
const fs = require("fs");
const Image = require("../models/Image");
const upload = require("../config/multerConfig");
const {protect} = require("../middleware/auth")
const router = express.Router();

// Create - Ajouter une nouvelle image
router.post("/images", protect, upload.single("image"), async (req, res) => {
  try {
    const { user } = req.body;
    const { filename, path } = req.file;

    const image = await Image.create({
      user,
      filename,
      path,
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Read - Récupérer toutes les images
router.get("/images", protect, async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Read - Récupérer une image par son ID
router.get("/images/:id", protect, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Update - Mettre à jour une image
router.put("/images/:id", protect, async (req, res) => {
  try {
    const { user, filename, path } = req.body;

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { user, filename, path },
      { new: true }
    );

    res.json(image);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Delete - Supprimer une image
router.delete("/images/:id", protect, async (req, res) => {
  try {
    const image = await Image.findByIdAndRemove(req.params.id);

    // Supprimer le fichier d'image du système de fichiers
    fs.unlink(image.path, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
