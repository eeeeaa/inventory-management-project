const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

// Setup routers
const indexRouter = require("./routes/index");
const inventoryRouter = require("./routes/inventory");
const authRouter = require("./routes/auth");

const app = express();

// Set up rate limiter
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 40,
});
// Apply rate limiter to all requests
app.use(limiter);

// Setup mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.ATLAS_URI || "";
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(connectionString);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "Keep it secret",
    name: "uniqueSessionID",
    saveUninitialized: false,
    store: new session.MemoryStore(),
    resave: false,
  })
);

//use compression to reduce time to transfer data between client/server
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

// use helmet to protect against well-known web vulnerabilities
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

// Routing
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/inventory", inventoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
