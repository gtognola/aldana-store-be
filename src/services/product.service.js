/*const PRODUCTS = [
	{ id: 1, name: "Product 1", price: 100 },
	{ id: 2, name: "Product 2", price: 200 },
	{ id: 3, name: "Product 3", price: 300 },
	{ id: 4, name: "Product 4", price: 400 },
	{ id: 5, name: "Product 5", price: 500 },
];
*/
const express = require('express');
const router = express.Router();
const {db} = require('../config/conn')

// obtener todos los productos
getAllProducts = async () => {
	const sql = 'SELECT * FROM Product';
	const [results]  = await db.query(sql); 
	return results;
}

// obtener el producto mediante el id
getProductById = async(id) => {
	const sql = 'SELECT * FROM Product WHERE id = ?';
	const [result] = await db.query(sql, [id]);
	return result;
};
// Creación de un nuevo producto
createProduct = async (createdProduct) => {
	const sql = 'INSERT INTO Product SET ?';
	const [result] = await db.query(sql, createdProduct);
	return({ id: result.insertId, ...createdProduct});
};

//Actualizar un producto
updateProduct = async (id, updatedProduct) => {
	const sql = 'UPDATE Product SET ? WHERE id = ?';
	const [result] = await db.query(sql, [updatedProduct, id]);
	if (result.affectedRows === 0) {
		throw new Error('Product not found');
	}
	return { id, ...updatedProduct };
};

deleteProduct = async (id) => {
	const sql = 'DELETE FROM Product WHERE id = ?';
	const [result] = await db.query(sql, [id]);
	if (result.affectedRows === 0) {
		throw new Error('Product not found');
	}
	return { message: 'Product deleted successfully' };
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
