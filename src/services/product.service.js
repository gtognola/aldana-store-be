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
createProduct = (req, res) => {
	const sql = 'INSERT INTO Product SET ?';
	const newProduct = {
		name : req.body.name,
		decription: req.body.description,
		price: req.body.price,
		image: req.body.imagen,
		categoriId: req.body.categoriId
	};
	db.query(sql, newProduct, (err, result)=> {
		if (err) throw err;
		res.json({ id: result.insertId, ...newProduct});
	});
};

//Actualizar un producto
updateProduct = (req, res) => {
	const sql = 'UPDATE Product SER ? WHERE id = ?';
	const updateProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image,
		categoryId: req.body.categoryId
	};
	db.query(sql, [updatedProduct, req.params.id], (err, result) => {
		if (err) throw err;
		res.json(updatedProduct);
	  });
};

deleteProduct = (req, res) => {
	const sql = 'DELETE FROM Product WHERE id = ?';
	db.query(sql, [req.params.id], (err, result) => {
	  if (err) throw err;
	  res.json({ message: 'Producto eliminado' });
	});
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
