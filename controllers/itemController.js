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
  const allCategories = await Category.find({}, "name")
    .sort({ name: 1 })
    .exec();

  res.render("item_form", { title: "Create Item", categories: allCategories });
});

exports.item_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("item name must not be empty")
    .escape(),
  body("description")
    .optional({ values: "falsy" })
    .isLength({ min: 1 })
    .withMessage("item description must not be empty")
    .escape(),
  body("category")
    .isLength({ min: 1 })
    .withMessage("category must not be empty"),
  body("price").isFloat({ min: 0 }).withMessage("Price should not be empty"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity should not be empty"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}, "name")
        .sort({ name: 1 })
        .exec();

      res.render("item_form", {
        title: "Create Item",
        item: item,
        categories: allCategories,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/auth");
  } else {
    const item = await Item.findById(req.params.id).exec();

    if (item === null) {
      const err = new Error("Item not found");
      err.status = 404;
      return next(err);
    }

    res.render("item_delete", { title: "Delete Item", item: item });
  }
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  if (item === null) {
    res.redirect("/inventory/items");
  } else {
    await Item.findByIdAndDelete(req.body.itemid);
    res.redirect("/inventory/items");
  }
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/auth");
  } else {
    const [item, allCategories] = await Promise.all([
      Item.findById(req.params.id).exec(),
      Category.find({}, "name").sort({ name: 1 }).exec(),
    ]);
    res.render("item_form", {
      title: "Update Item",
      item: item,
      categories: allCategories,
    });
  }
});

exports.item_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("item name must not be empty")
    .escape(),
  body("description")
    .optional({ values: "falsy" })
    .isLength({ min: 1 })
    .withMessage("item description must not be empty")
    .escape(),
  body("category")
    .isLength({ min: 1 })
    .withMessage("category must not be empty"),
  body("price").isFloat({ min: 0 }).withMessage("Price should not be empty"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity should not be empty"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}, "name")
        .sort({ name: 1 })
        .exec();

      res.render("item_form", {
        title: "Update Item",
        item: item,
        categories: allCategories,
        errors: errors.array(),
      });
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(updatedItem.url);
    }
  }),
];
