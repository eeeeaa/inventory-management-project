const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

//display index/welcome page
exports.index = asyncHandler(async (req, res, next) => {
  const [numCategory, numItem] = await Promise.all([
    Category.countDocuments().exec(),
    Item.countDocuments().exec(),
  ]);

  res.render("index", {
    title: "Inventory Management Home",
    category_count: numCategory,
    item_count: numItem,
  });
});
