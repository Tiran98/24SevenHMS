const router = require("express").Router();
const EmpPayment = require("../Models/EmpPayment");
const validate = require("../middlewares/validate");
const { body } = require("express-validator");
const AppError = require("../utils/errors");
const catchAsync = require("../utils/catchAsync");

const paymentValidations = [
  body("paymentId").notEmpty().withMessage("Payment ID is required"),
  body("employeeId").notEmpty().withMessage("Employee ID is required"),
  body("employeeType").notEmpty().withMessage("Employee type is required"),
  body("employeeName").notEmpty().withMessage("Employee name is required"),
  body("paymentAmount")
    .notEmpty()
    .withMessage("Payment amount is required")
    .isNumeric()
    .withMessage("Payment amount must be a number"),
  body("paymentType").notEmpty().withMessage("Payment type is required"),
  body("paymentDate")
    .notEmpty()
    .withMessage("Payment date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),
  body("paymentAccount").notEmpty().withMessage("Payment account is required"),
  body("description").optional(),
  body("paymentBank").notEmpty().withMessage("Payment bank is required"),
];

router.post(
  "/addEmpPay",
  validate(paymentValidations),
  catchAsync(async (req, res) => {
    const empPayment = new EmpPayment({
      paymentId: req.body.paymentId,
      employeeId: req.body.employeeId,
      employeeType: req.body.employeeType,
      employeeName: req.body.employeeName,
      paymentAmount: req.body.paymentAmount,
      paymentType: req.body.paymentType,
      paymentDate: req.body.paymentDate,
      paymentAccount: req.body.paymentAccount,
      description: req.body.description,
      paymentBank: req.body.paymentBank,
    });

    const savedEmpPay = await empPayment.save();
    res.status(201).json(savedEmpPay);
  })
);

router.get(
  "/viewEmpPay",
  catchAsync(async (req, res) => {
    const empPay = await EmpPayment.find();
    res.json(empPay);
  })
);

router.get(
  "/getMaxId",
  catchAsync(async (req, res) => {
    const maxId = await EmpPayment.findOne().sort("-paymentId");
    res.json(maxId ? maxId.paymentId : 0);
  })
);

router.get(
  "/getPayEmp/:paymentId",
  validate([
    param("paymentId").notEmpty().withMessage("Payment ID is required"),
  ]),
  catchAsync(async (req, res) => {
    const payEmp = await EmpPayment.findOne({
      paymentId: req.params.paymentId,
    });
    if (!payEmp) {
      throw new AppError("Payment not found", 404);
    }
    res.json(payEmp);
  })
);

router.delete(
  "/deleteEmpPay/:paymentId",
  validate([
    param("paymentId").notEmpty().withMessage("Payment ID is required"),
  ]),
  catchAsync(async (req, res) => {
    const result = await EmpPayment.findOneAndDelete({
      paymentId: req.params.paymentId,
    });
    if (!result) {
      throw new AppError("Payment not found", 404);
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  })
);

router.put(
  "/updateEmpPay/:paymentId",
  validate([
    param("paymentId").notEmpty().withMessage("Payment ID is required"),
    ...paymentValidations,
  ]),
  catchAsync(async (req, res) => {
    const updatedDetails = {
      paymentId: req.body[0].paymentId,
      employeeId: req.body[0].employeeId,
      employeeType: req.body[0].employeeType,
      employeeName: req.body[0].employeeName,
      paymentAmount: req.body[0].paymentAmount,
      paymentType: req.body[0].paymentType,
      paymentDate: req.body[0].paymentDate,
      paymentAccount: req.body[0].paymentAccount,
      description: req.body[0].description,
      paymentBank: req.body[0].paymentBank,
    };

    const updatedPayment = await EmpPayment.findOneAndUpdate(
      { paymentId: req.params.paymentId },
      updatedDetails,
      { new: true, runValidators: true }
    );
    if (!updatedPayment) {
      throw new AppError("Payment not found", 404);
    }
    res.status(200).json(updatedPayment);
  })
);

module.exports = router;
