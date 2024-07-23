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

createProduct = (req, res) => {
	res.send("Crear un producto")
};

updateProduct = (req, res) => {
	res.send("Actualizar un producto")
};

deleteProduct = (req, res) => {
	res.send("Eliminar un producto")
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
