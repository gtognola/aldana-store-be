const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.get("/", orderController.getAllOrders);  // Obtener todas las órdenes
router.get("/:id", orderController.getOrderById); // getOrderById
router.post("/", orderController.createOrder); // createOrder
router.post("/:id", orderController.addProductToOrder); // addProductToOrder
router.put("/:id", orderController.updateOrder); // updateProductToOrder
router.delete("/:id", orderController.deleteProductFromOrder); // deleteProductToOrder

module.exports = router;
