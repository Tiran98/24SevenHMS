const router = require("express").Router();
const LabReports = require("../Models/LabReports");
const validate = require("../middlewares/validate");
const { body } = require("express-validator");
const {
  email,
  mobile,
  gender,
  dob,
  mongoId,
} = require("../middlewares/commonValidations");
const AppError = require("../utils/errors");
const catchAsync = require("../utils/catchAsync");

const labReportValidationSchema = [
  body("fullname")
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),
  email,
  mobile,
  dob,
  gender,
  body("datecollected")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date collected"),
  body("hemoglobin")
    .isFloat({ min: 0 })
    .withMessage("Hemoglobin must be a non-negative number"),
  body("rbc")
    .isFloat({ min: 0 })
    .withMessage("RBC must be a non-negative number"),
  body("hct")
    .isFloat({ min: 0 })
    .withMessage("HCT must be a non-negative number"),
  body("mcv")
    .isFloat({ min: 0 })
    .withMessage("MCV must be a non-negative number"),
  body("mch")
    .isFloat({ min: 0 })
    .withMessage("MCH must be a non-negative number"),
  body("mchc")
    .isFloat({ min: 0 })
    .withMessage("MCHC must be a non-negative number"),
  body("rdwcv")
    .isFloat({ min: 0 })
    .withMessage("RDW-CV must be a non-negative number"),
  body("rdwsd")
    .isFloat({ min: 0 })
    .withMessage("RDW-SD must be a non-negative number"),
  body("wbc")
    .isFloat({ min: 0 })
    .withMessage("WBC must be a non-negative number"),
  body("neu")
    .isFloat({ min: 0 })
    .withMessage("NEU must be a non-negative number"),
  body("lym")
    .isFloat({ min: 0 })
    .withMessage("LYM must be a non-negative number"),
  body("mon")
    .isFloat({ min: 0 })
    .withMessage("MON must be a non-negative number"),
  body("eos")
    .isFloat({ min: 0 })
    .withMessage("EOS must be a non-negative number"),
  body("bas")
    .isFloat({ min: 0 })
    .withMessage("BAS must be a non-negative number"),
  body("lym2")
    .isFloat({ min: 0 })
    .withMessage("LYM% must be a non-negative number"),
  body("gra")
    .isFloat({ min: 0 })
    .withMessage("GRA must be a non-negative number"),
  body("plt")
    .isFloat({ min: 0 })
    .withMessage("PLT must be a non-negative number"),
  body("esr")
    .isFloat({ min: 0 })
    .withMessage("ESR must be a non-negative number"),
];

router.post(
  "/",
  validate(labReportValidationSchema),
  catchAsync(async (req, res) => {
    const labReports = new LabReports({
      fullname: req.body.fullname,
      email: req.body.email,
      mobile: req.body.mobile,
      dob: req.body.dob,
      gender: req.body.gender,
      datecollected: req.body.datecollected,
      hemoglobin: req.body.hemoglobin,
      rbc: req.body.rbc,
      hct: req.body.hct,
      mcv: req.body.mcv,
      mch: req.body.mch,
      mchc: req.body.mchc,
      rdwcv: req.body.rdwcv,
      rdwsd: req.body.rdwsd,
      wbc: req.body.wbc,
      neu: req.body.neu,
      lym: req.body.lym,
      mon: req.body.mon,
      eos: req.body.eos,
      bas: req.body.bas,
      lym2: req.body.lym2,
      gra: req.body.gra,
      plt: req.body.plt,
      esr: req.body.esr,
    });

    const savedReport = await labReports.save();
    res.status(201).json(savedReport);
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const labreports = await LabReports.find();
    res.json(labreports);
  })
);

router.get(
  "/labfind/:id",
  validate([mongoId]),
  catchAsync(async (req, res) => {
    const labreport = await LabReports.findById(req.params.id);
    if (!labreport) {
      throw new AppError("Labotary item not found", 404);
    }
    res.json(labreport);
  })
);

router.delete(
  "/labdelete/:id",
  validate([mongoId]),
  catchAsync(async (req, res) => {
    const result = await LabReports.deleteOne({ _id: req.params.id });
    if (!result) {
      throw new AppError("Labotary item not found", 404);
    }
    res.status(200).json({ message: "Labotary item deleted successfully" });
  })
);

router.put(
  "/labupdate/:id",
  validate([mongoId, ...labReportValidationSchema]),
  catchAsync(async (req, res) => {
    const savedReport = await LabReports.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { useFindAndModify: false, new: true }
    );
    if (!savedReport) {
      throw new AppError("Labotary item not found", 404);
    }
    res.status(200).json(savedReport);
  })
);

module.exports = router;
