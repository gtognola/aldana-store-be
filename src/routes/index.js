const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const orderController = require('../controllers/order.controller');
const authenticateJWT = require('../middlewere/auth.middleware');
const authController = require('../controllers/auth.controller');
router.use(bodyParser.json());
router.use(cors());

const productRoutes = require("./product.route");
const categoryRoutes = require("./category.route");
const orderRoutes = require("./order.route");
const authRoutes = require("./auth.route")

router.get("/", (req, res) => {
	res.send("Bienvenido a la API de productos");
});

//Lista de rutas
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/order", orderRoutes);
router.use("/auth/register", authRoutes)

// Rutas protegidas por autenticación
router.post('/order', authenticateJWT, orderController.createOrder);
router.get('/admin/orders', authenticateJWT, authController.verifyAdmin, orderController.getAllOrders);

module.exports = router;
