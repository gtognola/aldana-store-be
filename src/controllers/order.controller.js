const orderService = require("../services/order.service");
const productService = require("../services/product.service");

const createOrder = async (req, res) => {
	const newOrder = {
		userId: req.body.userId,
		paymentStatus: req.body.paymentStatus,
		total: 0,
	};

	const orderProduct = req.body.product;

	const product = await productService.getProductById(orderProduct.id);

	newOrder.total = product.price * orderProduct.quantity;

	const order = await orderService.createOrder(newOrder);

	// tenemos numero de Order

	const newOrderProduct = {
		orderId: order.id,
		productId: orderProduct.id,
		quantity: orderProduct.quantity,
	};

	await orderService.addProductToOrder(newOrderProduct);

	order.products = [newOrderProduct];

	res.send(order);
};

const getOrderById = async (req, res) => {
	res.send("getOrderById");
};

const addProductToOrder = async (req, res) => {
	/* 
        OrderId: req.params.id;
        req.body: {
            "productId": 1,
            "quantity": 1
        }
    */

	// Get order from DB (Get Order by Id)

	// Insertar en OrderProduct con el OrderId y el productId y quantity

	// Actualizar el total del Order (Update script)

	// Devolver el Order actualizado

	res.send("addProductToOrder");
};

const updateOrder = async (req, res) => {
	res.send("updateOrder");
};

const deleteProductToOrder = async (req, res) => {
	res.send("deleteProductToOrder");
};

module.exports = {
	createOrder,
	addProductToOrder,
	getOrderById,
	updateOrder,
	deleteProductToOrder,
};
