const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("", orderController.createOrder); // createOrder
router.get("/:id", orderController.getOrderById); // getOrderById
router.post("/:id", orderController.addProductToOrder); // addProductToOrder
router.put("/:id", orderController.updateOrder); // updateProductToOrder
router.delete("/:id", orderController.deleteProductToOrder); // deleteProductToOrder

module.exports = router;
