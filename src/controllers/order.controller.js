const orderService = require("../services/order.service");
const productService = require("../services/product.service");

const createOrder = async (req, res) => {
  try {
    const newOrder = {
      userId: req.body.userId,
      paymentStatus: req.body.paymentStatus,
      total: 0,
      createdAt: new Date(),
    };

    const orderProduct = req.body.product;
    // Obtener el producto para calcular el total
    const product = await productService.getProductById(orderProduct.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    // Calcular el total de la orden
    newOrder.total = product.price * orderProduct.quantity;
    // Crear la orden en la base de datos
    const order = await orderService.createOrder(newOrder);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la orden" });
  }

  // tenemos numero de Order
  // Preparar el producto para añadirlo a la orden en OrderProduct
  const newOrderProduct = {
    orderId: order.id,
    productId: orderProduct.id,
    quantity: orderProduct.quantity,
  };
  // Añadir el producto a la orden en la tabla OrderProduct
  await orderService.addProductToOrder(newOrderProduct);
  // Añadir los productos a la respuesta de la orden
  order.products = [newOrderProduct];

  res.send(order);
};
// Obtener todas las órdenes
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res.status(500).json({ error: "Error al obtener las órdenes" });
  }
};

// Obtener una orden por su ID
const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    // Obtener la orden por su ID
    const order = await orderService.getOrderById(orderId);
    // Verificar si la orden fue encontrada
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Orden no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la orden" });
  }
};
// Agregar un producto a una orden existente
const addProductToOrder = async (req, res) => {
  const orderId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    // Obtener el producto
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Preparar los datos para añadir el producto a la orden
    const newOrderProduct = {
      orderId,
      productId,
      quantity,
    };

    // Añadir el producto a la orden
    await orderService.addProductToOrder(newOrderProduct);

    // Actualizar el total de la orden
    const updatedOrder = await orderService.updateOrderTotal(orderId);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error al agregar el producto a la orden:", error);
    res.status(500).json({ error: "Error al agregar el producto a la orden" });
  }
};

// Actualizar una orden existente
const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const orderData = req.body;

  try {
    // Actualizar la orden con los nuevos datos
    const updatedOrder = await orderService.updateOrder(orderId, orderData);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(`Error al actualizar la orden con ID ${orderId}:`, error);
    res
      .status(500)
      .json({ error: `Error al actualizar la orden con ID ${orderId}` });
  }
};

// Eliminar un producto de una orden existente
const deleteProductFromOrder = async (req, res) => {
  const orderId = req.params.id;
  const { productId } = req.body;

  try {
    // Eliminar el producto de la orden
    const updatedOrder = await orderService.deleteProductFromOrder(
      orderId,
      productId
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(
      `Error al eliminar producto de la orden con ID ${orderId}:`,
      error
    );
    res
      .status(500)
      .json({
        error: `Error al eliminar producto de la orden con ID ${orderId}`,
      });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  addProductToOrder,
  updateOrder,
  deleteProductFromOrder,
};
