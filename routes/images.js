const express = require("express");
const fs = require("fs");
const Image = require("../models/Image");
const upload = require("../config/multerConfig");
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// Create - Ajouter une nouvelle image
router.post(
  "/upload-user-image/:user",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user);
      if (!user) return res.json({ success: false, error: "No user found" });
      const { filename, path } = req.file;

      const image = await Image.create({
        user: user._id,
        filename,
        path,
        isPrivate: req.body.isPrivate ?? false,
      });

      user.images.push(image);
      await user.save();
      res.status(201).json(image);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
);

// Read - Récupérer toutes les images
router.get("/user-images/:user", protect, async (req, res) => {
  try {
    if (!req.params.user) return res.json({ success: false, error: "no user" });
    const images = await Image.find({ user: req.params.user });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
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

// Update - update image privacy
router.put(
  `set-user-image-privacy/:user/:imageid`,
  protect,
  async (req, res) => {
    try {
      const { isPrivate } = req.body;
      const userExistAndHasImage = await User.findOne({
        _id: req.params.user,
        images: req.params.imageid,
      });
      if (!userExistAndHasImage)
        return res.json({
          success: false,
          error: "User not found or not associated to image",
        });
      await Image.findByIdAndUpdate(
        req.params.id,
        { isPrivate },
        { new: true }
      );

      res.json({ success: true, message:"image privacy changed to : " +isPrivate ? "private" : "public" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  }
);

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
