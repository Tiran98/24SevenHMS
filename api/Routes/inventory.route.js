const router = require("express").Router();
const Inventory = require("../Models/Inventory");
const validate = require("../middlewares/validate");
const { body, param } = require("express-validator");
const AppError = require("../utils/errors");
const catchAsync = require("../utils/catchAsync");

const inventoryValidations = [
  body("productId")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),
  body("productType")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Product type is required"),
  body("productName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
  body("pricePerItem")
    .isFloat({ min: 0 })
    .withMessage("Price per item must be a non-negative number"),
  body("manufactureDate")
    .isISO8601()
    .toDate()
    .withMessage("Invalid manufacture date"),
  body("expiredDate").isISO8601().toDate().withMessage("Invalid expiry date"),
  body("description").optional().isString().trim(),
  body("brand").isString().trim().notEmpty().withMessage("Brand is required"),
];

router.post(
  "/AddInvMngmnt",
  validate(inventoryValidations),
  catchAsync(async (req, res) => {
    const inventory = new Inventory(req.body);
    const savedInvMngmnt = await inventory.save();
    res.status(201).json(savedInvMngmnt);
  })
);

router.get(
  "/viewInvMngmnt",
  catchAsync(async (req, res) => {
    const invMngmnt = await Inventory.find();
    res.json(invMngmnt);
  })
);

router.get(
  "/getMaxId",
  catchAsync(async (req, res) => {
    const maxId = await Inventory.findOne().sort("-productId");
    res.json(maxId ? maxId.productId : 0);
  })
);

router.get(
  "/getInvMngmnt/:productId",
  validate([
    param("productId")
      .isInt({ min: 1 })
      .withMessage("Product ID must be a positive integer"),
  ]),
  catchAsync(async (req, res) => {
    const invMngmnt = await Inventory.findOne({
      productId: req.params.productId,
    });
    if (!invMngmnt) {
      throw new AppError("Inventory item not found", 404);
    }
    res.json(invMngmnt);
  })
);

router.delete(
  "/deleteInvMngmnt/:productId",
  validate([
    param("productId")
      .isInt({ min: 1 })
      .withMessage("Product ID must be a positive integer"),
  ]),
  catchAsync(async (req, res) => {
    const result = await Inventory.findOneAndDelete({
      productId: req.params.productId,
    });
    if (!result) {
      throw new AppError("Inventory item not found", 404);
    }
    res.status(200).json({ message: "Inventory item deleted successfully" });
  })
);

router.put(
  "/updateInvMngmnt/:productId",
  validate([
    param("productId")
      .isInt({ min: 1 })
      .withMessage("Product ID must be a positive integer"),
    ...inventoryValidations,
  ]),
  catchAsync(async (req, res) => {
    const updatedDetails = {
      productId: req.body[0].productId,
      productType: req.body[0].productType,
      productName: req.body[0].productName,
      quantity: req.body[0].quantity,
      pricePerItem: req.body[0].pricePerItem,
      manufactureDate: req.body[0].manufactureDate,
      expiredDate: req.body[0].expiredDate,
      description: req.body[0].description,
      brand: req.body[0].brand,
    };

    const updatedInventory = await Inventory.findOneAndUpdate(
      { productId: req.params.productId },
      updatedDetails,
      { new: true, runValidators: true }
    );
    if (!updatedInventory) {
      throw new AppError("Inventory item not found", 404);
    }
    res.status(200).json(updatedInventory);
  })
);

module.exports = router;
