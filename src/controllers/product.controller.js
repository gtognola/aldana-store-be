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
	const newProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		image: req.body.imagen,
		categoryId: req.body.categoryId
	};
	try{
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

updateProduct = async (req, res) => {
	const id = req.params.id
	const updatedProduct = {
		name : req.body.name,
		description: req.body.description,
		price: req.body.price,
		image: req.body.imagen,
		categoryId: req.body.categoryId
	};
	try {
		const result = await productService.updateProduct(id, updatedProduct);
		res.status(200).send(result);
	} catch (error) {
		if (error.message === 'Product not found') {
			res.status(404).send({ error: 'Product not found' });
		} else {
			res.status(500).send({ error: 'Internal Server Error' });
		}
	}
};


const deleteProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await productService.deleteProduct(id);
		res.status(200).send(result);
	} catch (error) {
		if (error.message === 'Product not found') {
			res.status(404).send({ error: 'Product not found' });
		} else {
			res.status(500).send({ error: 'Internal Server Error' });
		}
	}
};


module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
