#! /usr/bin/env node

console.log("populate some item inventory in mongoDB database");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const categoryDetail = { name: name, description: description };

  const category = new Category(categoryDetail);

  await category.save();
  categories[index] = category;
  console.log(`Added Category: ${name}`);
}

async function itemCreate(index, name, description, category, price, quantity) {
  const itemDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    quantity: quantity,
  };

  const item = new Item(itemDetail);

  await item.save();
  items[index] = item;
  console.log(`Added Item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Produce", "Vegetable and grown produces"),
    categoryCreate(1, "Meat", "Butchered meats of various animals"),
    categoryCreate(
      2,
      "Beverage",
      "fruit juice, Soda, and various types of drinks"
    ),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, "Corn", "Fresh corns", categories[0], 15.0, 20),
    itemCreate(1, "Tomato", "Fresh tomatos", categories[0], 13.0, 30),
    itemCreate(2, "Eggplant", "Fresh Eggplants", categories[0], 35.5, 10),
    itemCreate(3, "Beef", "Various beef steak cuts", categories[1], 55.2, 25),
    itemCreate(
      4,
      "Lamp",
      "Lamp for steaks, grill, or stewing",
      categories[1],
      5.8,
      28
    ),
    itemCreate(
      5,
      "Pork",
      "Good quality pork for grilling",
      categories[1],
      28.0,
      26
    ),
    itemCreate(6, "SodaPop", "Sodie-pop", categories[2], 37.0, 20),
    itemCreate(
      7,
      "Orange Juice",
      "100% authentic orange juice",
      categories[2],
      66.1,
      22
    ),
    itemCreate(8, "Milk", "a box of milks", categories[2], 77.3, 30),
  ]);
}
