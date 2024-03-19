const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("category_list", {
    title: "Category list",
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description")
      .sort({ name: 1 })
      .exec(),
  ]);

  if (category == null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    item_list: allItemsInCategory,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: show create category form");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: post to database to create category");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: show delete category form");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: post to database to delete category");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: show update category form");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: post to database to update category");
});
