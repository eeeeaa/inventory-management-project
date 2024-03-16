const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: get list of items");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: get item detail");
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
