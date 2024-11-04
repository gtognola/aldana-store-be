const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta de registro
router.post('/register', authController.registerUser);

// Ruta de login
router.post('/login', authController.loginUser);

// Ruta para verificar el rol de admin
router.get('/admin', authController.verifyAdmin);

module.exports = router;
