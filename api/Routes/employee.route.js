const router = require("express").Router();
const Employee = require("../Models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var generator = require("generate-password");
const validate = require("../middlewares/validate");
const { body, param } = require("express-validator");
const {
  firstName,
  firstNameParam,
  lastName,
  email,
  mobile,
  gender,
  dob,
  mongoId,
} = require("../middlewares/commonValidations");
const AppError = require("../utils/errors");
const catchAsync = require("../utils/catchAsync");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post(
  "/",
  validate([
    firstName,
    lastName,
    email,
    mobile,
    body("address1").isString().trim().notEmpty(),
    body("address2").optional().isString().trim(),
    gender,
    dob,
    body("marital").isIn(["single", "married", "divorced", "widowed"]),
    body("position").isString().trim().notEmpty(),
    body("hiredate").isDate(),
  ]),
  catchAsync(async (req, res, next) => {
    //Checking if the user is already in the database
    const emailExist = await Employee.findOne({ email: req.body.email });
    if (emailExist) {
      throw new AppError("Email already exists", 400);
    }

    //Generate Password
    var password = generator.generate({
      length: 8,
      numbers: true,
    });

    console.log("Generate Password", password);

    //Hash passwords
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employee = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
      address1: req.body.address1,
      address2: req.body.address2,
      gender: req.body.gender,
      dob: req.body.dob,
      marital: req.body.marital,
      position: req.body.position,
      hiredate: req.body.hiredate,
    });

    const savedEmp = await employee.save();

    const mailBody = `<h4>Hello ${employee.firstName},</h4>
    <p>Your Employee ID is <b>${savedEmp._id}</b> and your password is <b>${password}</b>. Thank you for joining us.</p>`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employee.email,
      subject: "Welcome to 24Seven HMS",
      html: mailBody,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(savedEmp);
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
  })
);

router.delete(
  "/empdelete/:id",
  validate([mongoId]),
  catchAsync(async (req, res) => {
    const result = await Employee.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      throw new AppError("Employee not found", 404);
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  })
);

router.get(
  "/allcounts",
  catchAsync(async (req, res) => {
    const [doctorCount, pharmacistCount, accountantCount, assistantCount] =
      await Promise.all([
        Employee.countDocuments({ position: "Doctor" }),
        Employee.countDocuments({ position: "Pharmacist" }),
        Employee.countDocuments({ position: "Accountant" }),
        Employee.countDocuments({ position: "LabAssistant" }),
      ]);

    res.json({
      doctorCount,
      pharmacistCount,
      accountantCount,
      assistantCount,
    });
  })
);

router.get(
  "/getEmpByName/:firstName",
  validate([firstNameParam]),
  catchAsync(async (req, res) => {
    const empByName = await Employee.findOne({
      firstName: req.params.firstName,
    });

    if (!empByName) {
      throw new AppError("Employee not found", 404);
    }

    res.json(empByName);
  })
);

module.exports = router;
