const crypto = require("crypto");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse"); // As we will handle errors using "next()"
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');

router.post('/upload', upload.single('image'), (req, res) => {
  // La requête contient maintenant le fichier uploadé
  // Vous pouvez accéder aux informations du fichier via req.file
  
  // Faites ce que vous souhaitez avec le fichier uploadé (par exemple, le sauvegarder en base de données)
  
  res.json({ message: 'Upload réussi !' });
});

module.exports = router;


const register = async (req, res, next) => {
  try {
    const { name, email, password, profilePic } = req.body;
    // Check if any of them is undefined
    if (!name || !password) {
      return next(
        new ErrorResponse("Please provide name, email and password", 400)
      );
    }

    // Check if user already exists in our DB
    const userExists = await User.findOne({ name }).exec();

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    // Register and store the new user
    const user = await User.create(
      // If there is no picture present, remove 'profilePic'
      profilePic === undefined || profilePic.length === 0
        ? {
            name,
            password,
          }
        : {
            name,
            password,
            profilePic,
          }
    );

    return sendAuth(user, 201, res);
  } catch (error) {
    return next(error);
  }
};

// @description     Login a user
// @route           POST /api/auth/login
// @access          Public
const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return next(new ErrorResponse("Please provide username and password", 400));
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
    return next(error);
  }
};


const sendAuth = (user, statusCode, res) => {
  return res.status(statusCode).json({
    success: true,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
    token: user.getSignedToken(),
    expires_at: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 60 * 1000),
  });
};

module.exports = { register, login };
