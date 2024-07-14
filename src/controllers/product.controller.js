const productService = require("../services/product.service");

getAllProducts = (req, res) => {
	const products = productService.getAllProducts();
	res.send(products);
};

getProductById = (req, res) => {
	const id = req.params.id;
	const product = productService.getProductById(id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send("Product not found");
	}
};

createProduct = (req, res) => {};

updateProduct = (req, res) => {};

deleteProduct = (req, res) => {};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
