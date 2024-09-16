const router = require("express").Router();
const Appointment = require("../Models/Appointment");
const validate = require("../middlewares/validate");
const { body } = require("express-validator");
const {
  firstName,
  lastName,
  email,
  mobile,
  gender,
  dob,
  mongoId,
} = require("../middlewares/commonValidations");
const AppError = require("../utils/errors");
const catchAsync = require("../utils/catchAsync");

router.post(
  "/addApp",
  validate([
    firstName,
    lastName,
    email,
    mobile,
    gender,
    dob,
    body("consultant").isString().trim(),
    body("appdate").isDate(),
    body("apptime").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  ]),
  catchAsync(async (req, res, next) => {
    const appointment = new Appointment({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      dob: req.body.dob,
      consultant: req.body.consultant,
      appdate: req.body.appdate,
      apptime: req.body.apptime,
    });
    const savedApp = await appointment.save();
    res.status(201).json(savedApp);
  })
);

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.json(appointments);
  })
);

router.get(
  "/appfind/:id",
  validate([mongoId]),
  catchAsync(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return next(new AppError("No appointment found with that ID", 404));
    }
    res.json(appointment);
  })
);

router.delete(
  "/appdelete/:id",
  validate([mongoId]),
  catchAsync(async (req, res, next) => {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return next(new AppError("No appointment found with that ID", 404));
    }
    res.status(204).json(null);
  })
);

router.put(
  "/appupdate/:id",
  validate([
    mongoId,
    firstName,
    lastName,
    email,
    mobile,
    gender,
    dob,
    body("consultant").isString().trim(),
    body("appdate").isDate(),
    body("apptime").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  ]),
  catchAsync(async (req, res, next) => {
    const savedAppointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { useFindAndModify: false, new: true }
    );
    if (!savedAppointment) {
      return next(new AppError("No appointment found with that ID", 404));
    }
    res.json(appointment);
  })
);

module.exports = router;
