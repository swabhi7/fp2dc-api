const _ = require("lodash");
const dotenv = require("dotenv");
const recipes = require("./data/recipes");
const Recipe = require("../models/recipe.model");
const connectDatabase = require("../connectDatabase");

dotenv.config();

connectDatabase();

const importData = async () => {
  try {
    await Recipe.deleteMany();

    await Recipe.insertMany(recipes);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Recipe.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}