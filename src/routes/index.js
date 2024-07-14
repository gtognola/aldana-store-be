const express = require("express");
const router = express.Router();

const productRoutes = require("./product.route");

router.get("/", (req, res) => {
	res.send("Bienvenido a la API de productos");
});

//Lista de rutas
router.use("/product", productRoutes);

module.exports = router;
