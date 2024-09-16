const router = require("express").Router();
const Employee = require("../Models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("../middlewares/validate");
const { email, password } = require("../middlewares/commonValidations");
const AppError = require("../utils/errors");
const catchAsync = require("../utils/catchAsync");

router.post(
  "/adminlogin",
  validate([email, password]),
  catchAsync(async (req, res, next) => {
    var emailExist = "";
    //Checking if the user exist
    emailExist = await Employee.findOne({ email: req.body.email });
    if (!emailExist) return res.status(400).send("Email does not exist");
    if (emailExist.position != "admin")
      return res.status(400).send("You do not have access to admin side.");

    //Checking password
    const validPassword = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );
    if (!validPassword)
      return res.status(400).send("Email or password is wrong");
    res.send(emailExist);
  })
);

router.post(
  "/login",
  validate([email, password]),
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      throw new AppError("Invalid email or password", 401);
    }

    res.json({
      message: "Login successful",
      employee: {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        position: employee.position,
      },
    });
  })
);

module.exports = router;
