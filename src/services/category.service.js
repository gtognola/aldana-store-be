const express = require('express');
const router = express.Router();
const {db} = require('../config/conn')

// obtener todos los Categoryos
getAllCategories = async () => {
	const sql = 'SELECT * FROM Category';
	const [results]  = await db.query(sql); 
	return results;
}

// obtener el Category mediante el id
getCategoryById = async(id) => {
	const sql = 'SELECT * FROM Category WHERE id = ?';
	const [result] = await db.query(sql, [id]);
	return result;
};
// Creación de un nuevo Category
createCategory = async (createdCategory) => {
	const sql = 'INSERT INTO Category SET ?';
	const [result] = await db.query(sql, createdCategory);
	return({ id: result.insertId, ...createdCategory});
};

//Actualizar un Category
updateCategory = async (id, updatedCategory) => {
	const sql = 'UPDATE Category SET ? WHERE id = ?';
	const [result] = await db.query(sql, [updatedCategory, id]);
	if (result.affectedRows === 0) {
		throw new Error('Category not found');
	}
	return { id, ...updatedCategory };
};

deleteCategory = async (id) => {
	const sql = 'DELETE FROM Category WHERE id = ?';
	const [result] = await db.query(sql, [id]);
	if (result.affectedRows === 0) {
		throw new Error('Category not found');
	}
	return { message: 'Category deleted successfully' };
};

module.exports = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
