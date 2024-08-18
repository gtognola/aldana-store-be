const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
	const categories = await categoryService.getAllCategories();
	res.send(categories);
};

const getCategoryById = async (req, res) => {
	const id = req.params.id;
	const category = await categoryService.getCategoryById(id);
	if (category) {
		res.send(category);
	} else {
		res.status(404).send("Category not found");
	}
};

const createCategory = async (req, res) => {
    console.log(req.body);
    
	const newCategory = {
		name: req.body.name,
	};
	try{
		const createdCategory = await categoryService.createCategory(newCategory);
		if (createdCategory){
			res.status(201).send(createdCategory);
		}
		else{
			res.status(400).send({ error: 'No se ha podido crear la categoría'})
		};
	}
	catch (error){
		res.status(500).send({error: 'Error Interno del Servido'})
	}
};

const updateCategory = async (req, res) => {
	const id = req.params.id
	const updatedCategory = {
		name : req.body.name,
	};
	try {
		const result = await categoryService.updateCategory(id, updatedCategory);
		res.status(200).send(result);
	} catch (error) {
		if (error.message === 'Category not found') {
			res.status(404).send({ error: 'Category not found' });
		} else {
			res.status(500).send({ error: 'Internal Server Error' });
		}
	}
};


const deleteCategory = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await categoryService.deleteCategory(id);
		res.status(200).send(result);
	} catch (error) {
		if (error.message === 'Category not found') {
			res.status(404).send({ error: 'Category not found' });
		} else {
			res.status(500).send({ error: 'Internal Server Error' });
		}
	}
};


module.exports = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
