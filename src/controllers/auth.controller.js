const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/conn'); // Conexión a la base de datos

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, username, password, email, phone, role } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.query('SELECT * FROM User WHERE username = ? OR email = ?', [username, email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El usuario o el correo ya están registrados.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, username, password: hashedPassword, email, phone, role };

    // Insertar nuevo usuario
    await db.query('INSERT INTO User SET ?', newUser);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM User WHERE username = ?', [username]);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

// Verificar si el usuario es administrador
const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Acceso denegado' });

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(403).json({ error: 'Token inválido' });

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos de administrador' });
    }

    next();
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyAdmin,
};
