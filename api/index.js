const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/errors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

const enforceHttps = (req, res, next) => {
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(enforceHttps);
app.use(helmet());
app.use(limiter);

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Import Routes
const employeeRoute = require("./Routes/employee.route");
const labreportsRoute = require("./Routes/labreports.route");
const empPaymentRoute = require("./Routes/empPayments.route");
const authRoute = require("./Routes/auth.route");
const appointmentRoute = require("./Routes/appointment.route");
const inventoryRoute = require("./Routes/inventory.route");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

//Route Middlewares
app.use("/api/employee", employeeRoute);
app.use("/api/labreports", labreportsRoute);
app.use("/api/empPay", empPaymentRoute);
app.use("/api/user", authLimiter, authRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/invMngmnt", inventoryRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
