const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

router.use(bodyParser.json());
router.use(cors());

const productRoutes = require("./product.route");
const categoryRoutes = require("./category.route");

router.get("/", (req, res) => {
	res.send("Bienvenido a la API de productos");
});

//Lista de rutas
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
