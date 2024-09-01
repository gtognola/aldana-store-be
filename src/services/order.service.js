const { db } = require("../config/conn");

// crear pedido
const createOrder = async (newOder) => {
	const sql = "INSERT INTO `Order` SET ?";
	const [result] = await db.query(sql, newOder);

	return { id: result.insertId, ...newOder };
};

const addProductToOrder = async (newOrderProduct) => {
	const sql = "INSERT INTO OrderProduct SET ?";
	const [result] = await db.query(sql, newOrderProduct);

	return { id: result.insertId, ...newOrderProduct };
};

module.exports = {
	createOrder,
	addProductToOrder,
};
