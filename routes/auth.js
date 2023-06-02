const express = require("express");

const upload = require("../config/multerConfig");
const Image = require("../models/Image");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const router = express.Router();

router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, password } = req.body;
    const { filename } = req.file;
    const userExist = await User.find({ name: name });
    if (userExist)
      return res.json({ success: false, error: "Username already exists :(" });
    const image = false;
    // Créer un nouvel utilisateur
    const user = await User.create({
      name,
      password,
    });

    if (Boolean(filename)) {
      // Créer une nouvelle image
      const image = await Image.create({
        filename: filename,
        path: req.file.path,
        isPrivate: false,
        user: user._id,
      });

      user.profilePic = image._id;
      user.images.push(image._id);
      await user.save();
    }

    res.status(201).json({ success: true, user, image });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
    console.log(error);
  }
});

router.delete("/delete-user/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById(userId).exec();
    if (!user) return res.json({ success: false, error: "No user found" });

    const userImages = await Image.find({ user: userId }).exec();
    for (const image of userImages) {
      fs.unlink(image.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
      await Image.findByIdAndRemove(image._id);
    }
    await user.delete();
    return res.json({ success: true, message: "User deleted :(" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return next(
        new ErrorResponse("Please provide username and password", 400)
      );
    }

    const user = await User.findOne({ name }).select("+password"); // Explicitly adding password

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Using our own custom method to compare passwords
    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    return sendAuth(user, 200, res);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

const sendAuth = async (user, statusCode, res) => {
  const profilePic = await Image.findById(user.profilePic);
  return res.status(statusCode).json({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePic: profilePic,
    token: user.getSignedToken(),
    expires_at: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 60 * 1000),
  });
};

module.exports = router;
