const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().sort({ name: 1 }).exec();

  res.render("item_list", { title: "Item list", item_list: allItems });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", { title: "Item detail", item: item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: show create item form");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: post to database to create item");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: show delete item form");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: post to database to delete item");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: show update item form");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: post to database to update item");
});
