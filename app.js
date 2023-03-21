// dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const Routes = require("./routes");
const session = require("express-session");
// const ratelimit = require("express-rate-limit");
// const v8 = require("v8");
require("dotenv").config();

// API request rate limiter
// const limiter = ratelimit({
//   max: 5,
//   windowMs: 4000,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// app.use(limiter);

// Routes handlers
const productRoutes = require("./api/routes/products");
const RegisterRoute = require("./api/routes/register");
const LoginRoute = require("./api/routes/login");
const KeyRoute = require("./api/routes/key");
const User = require("./api/routes/user");
const Update = require("./api/routes/update");
const Chats = require("./api/routes/minershub");
const FeedBack = require("./api/routes/feedBack");
const Messages = require("./api/routes/messages");
// database connections
mongoose.connect("mongodb://localhost:27017/maldoApp");

// mongoose.connect(
//   // "mongodb+srv://ben:userpass@cluster0.gyfro.mongodb.net/?retryWrites=true&w=majority"
//   "mongodb+srv://ben:" +
//     process.env.DATABASE_PASSWORD +
//     "@cluster0.gyfro.mongodb.net/?retryWrites=true&w=majority"
// );

// Application logic start
// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set view template engine
// app.set("view engine", "pug");
// app.set("views", "./views");

// set static files folder
// app.use(express.static(__dirname + "/public"));

// configure body parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// configure cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Accss-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// express session
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
// express messages
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// console.log(v8.getHeapStatistics().heap_size_limit / (1024 * 1024));

// express_session setup

// projects routes
// app.use("/register", RegisterRoute);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
// Application logic end
// export appliction logic
module.exports = app;
// app.listen(3000);
