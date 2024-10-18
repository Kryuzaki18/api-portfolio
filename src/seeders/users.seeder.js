const bcrypt = require("bcryptjs");

const connectDB = require("../config/connection");
const logger = require("../config/winston");
const { User } = require("../models");
const usersData = require("./data/users.data");

// Method to hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const insertUsers = async (users) => {
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      // Hash the password for each user
      user.password = await hashPassword(user.password);
      return user;
    })
  );

  // Insert the hashed users into the database
  return await User.insertMany(hashedUsers);
};

const seedUsers = async () => {
  try {
    await connectDB();
    await insertUsers(usersData);
    logger.info("Users seeded successfully!");
    process.exit(0);
  } catch (error) {
    logger.info("Error seeding users:", error);
  }
};

seedUsers();
