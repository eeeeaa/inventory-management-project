const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Category = require("../models/category");

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: get list of category");
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT implemented: get category detail");
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
