const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { roles } = require("../config/roles");

const skillsSchema = mongoose.Schema(
  {
    name: String,
    url: String,
    rate: Number,
    order: Number,
  },
  { _id: false }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact_number: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    skills: [skillsSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async (email, excludeUserId) => {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async (password) => {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async (next) => {
  // Check if the password is modified or is new
  if (!this.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save the user
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

/**
 * @typedef User
 */
const User = mongoose.model("Users", userSchema);

module.exports = User;
