const PRODUCTS = [
	{ id: 1, name: "Product 1", price: 100 },
	{ id: 2, name: "Product 2", price: 200 },
	{ id: 3, name: "Product 3", price: 300 },
	{ id: 4, name: "Product 4", price: 400 },
	{ id: 5, name: "Product 5", price: 500 },
];

getAllProducts = () => {
	return PRODUCTS;
};

getProductById = (id) => {
	return PRODUCTS.find((product) => product.id == id);
};

createProduct = (product) => {
	PRODUCTS.push(product);
};

updateProduct = (id, product) => {
	const index = PRODUCTS.findIndex((product) => product.id == id);
	PRODUCTS[index] = product;
};

deleteProduct = (id) => {
	const index = PRODUCTS.findIndex((product) => product.id == id);
	PRODUCTS.splice(index, 1);
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
