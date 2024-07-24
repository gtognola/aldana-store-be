const productService = require("../services/product.service");

getAllProducts = async (req, res) => {
	const products = await productService.getAllProducts();
	res.send(products);
};

getProductById = async (req, res) => {
	const id = req.params.id;
	const product = await productService.getProductById(id);
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
