const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

/**
 * CRUD
 * Create - con POST
 * Read - con GET
 * Update - con PUT o PATCH
 * Delete - con Delete
 */

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);

router.post("", categoryController.createCategory);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;