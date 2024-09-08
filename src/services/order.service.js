const { db } = require("../config/conn");

// crear pedido
const createOrder = async (newOrder) => {
  try {
    const sql = "INSERT INTO `Order` SET ?";
    const [result] = await db.query(sql, newOrder);
    return { id: result.insertId, ...newOrder };
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};

const addProductToOrder = async (newOrderProduct) => {
  try {
    const sql = "INSERT INTO OrderProduct SET ?";
    const [result] = await db.query(sql, newOrderProduct);

    return { id: result.insertId, ...newOrderProduct };
  } catch {
    console.log("Error al obtener las ordenes", error);
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    const sql = "SELECT * FROM `Order` WHERE id = ?";
    const [rows] = await db.query(sql, [orderId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error(`Error al obtener la orden con ID ${orderId}:`, error);
    throw error;
  }
};
const getAllOrders = async () => {
    try {
        const sql = "SELECT * FROM `Order`";
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        throw error;
    }
};


module.exports = {
  createOrder,
  addProductToOrder,
  getOrderById,
  getAllOrders,
};
