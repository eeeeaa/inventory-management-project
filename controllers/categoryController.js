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

exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

exports.category_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("category name must not be empty")
    .escape(),
  body("description")
    .isLength({ min: 1 })
    .withMessage("category description must not be empty")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description")
      .sort({ name: 1 })
      .exec(),
  ]);

  if (category === null) {
    res.redirect("/inventory/categories");
  } else {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      item_list: allItemsInCategory,
    });
  }
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description")
      .sort({ name: 1 })
      .exec(),
  ]);
  if (category === null) {
    res.redirect("/inventory/categories");
  }

  if (allItemsInCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      item_list: allItemsInCategory,
    });
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/inventory/categories");
  }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_form", { title: "Create Category", category: category });
});

exports.category_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("category name must not be empty")
    .escape(),
  body("description")
    .isLength({ min: 1 })
    .withMessage("category description must not be empty")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(updatedCategory.url);
    }
  }),
];
