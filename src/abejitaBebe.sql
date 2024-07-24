USE `freedb_aldana-store`;
-- Eliminar las tablas si ya existen
DROP TABLE IF EXISTS OrderProduct;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS ProductImage;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Category;
-- Tabla categoria
CREATE TABLE Category (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL
);

-- Tabla user
CREATE TABLE User (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
phone VARCHAR(20) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla product
CREATE TABLE Product(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
image VARCHAR(255),
categoryId INT,
FOREIGN KEY (categoryId) REFERENCES Category(id)
);

-- Tabla productImage
CREATE TABLE ProductImage(
productId INT NOT NULL,
image VARCHAR(255),
PRIMARY KEY (productId, image),
FOREIGN KEY (productId) REFERENCES Product(id)
);

-- Tabla order
CREATE TABLE `Order` (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
userId INT,
total DECIMAL(10, 2) NOT NULL,
paymentStatus VARCHAR(50) NOT NULL,
comment TEXT,
FOREIGN KEY (userId) REFERENCES User(id)
);

-- Crear la tabla OrderProduct
CREATE TABLE OrderProduct (
productId INT,
orderId INT,
quantity INT NOT NULL,
PRIMARY KEY (productId, orderId),
FOREIGN KEY (productId) REFERENCES Product(Id),
FOREIGN KEY (orderId) REFERENCES `Order`(Id)
);