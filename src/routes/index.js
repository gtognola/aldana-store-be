const express = require("express");
const router = express.Router();

const productRoutes = require("./product.route");

// Define una ruta básica
router.get("/", (req, res) => {
	res.send("test router");
});

router.use("/product", productRoutes);

module.exports = router;
