const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.auth_get = asyncHandler(async (req, res, next) => {
  res.render("auth_login", { title: "Login" });
});

exports.auth_post = [
  body("password")
    .isLength({ min: 1 })
    .withMessage("password must not be empty")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("auth_login", { title: "Login", errors: errors.array() });
    } else {
      if (req.body.password === process.env.ADMIN_PASSWORD) {
        req.session.loggedIn = true;
        res.redirect("/");
      } else {
        res.render("auth_login", {
          title: "Login",
          errors: ["Wrong password!"],
        });
      }
    }
  }),
];
