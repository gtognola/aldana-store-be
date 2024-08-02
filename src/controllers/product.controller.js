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

createProduct = async (req, res) => {
	try{
		const newProduct = {
			name : req.body.name,
			description: req.body.description,
			price: req.body.price,
			image: req.body.imagen,
			categoryId: req.body.categoryId
		};
		const createdProduct = await productService.createProduct(newProduct);
		if (createdProduct){
			res.status(201).send(createdProduct);
		}
		else{
			res.status(400).send({ error: 'No se ha podido crear el producto'})
		};
	}
	catch (error){
		res.status(500).sen({error: 'Error Interno del Servido'})
	}
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
