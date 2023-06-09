const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
      select: false, // Whenever we query for a user, do we want to return password as well
    },
    profilePic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    resetPasswordToken: String, // String is shorthand for {type: String}
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Middleware before saving a document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Assign a "matchPasswords" function to the "methods" object of our "UserSchema"
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRE}h`, // In hours
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Expires in 10 min

  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
