import db from "../db/db.js";

export const createOrder = async (req, res) => {
  const { id } = req.user;
  try {
    const { orders } = req.body;

    if (!Array.isArray(orders) || !orders.length) {
      return res.status(400).json({
        success: false,
        message:
          "Order data must be a valid Array required into this feilds are required! product_id, quantity",
      });
    }

    const createdOrder = await db.$transaction(async (transaction) => {
      const order = await transaction.order.create({
        data: {
          userId: Number(id),
        },
      });

      const _orderItemsData = [];
      for (let item of orders) {
        const product = await db.product.findFirst({
          where: {
            id: Number(item.productId),
          },
          select: {
            price: true,
          },
        });

        if (!product) {
          throw new Error(`Product ID Not ( ${item.productId} ) Found!`);
        }

        _orderItemsData.push({
          orderId: Number(order.id),
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          productPrice: Number(product.price),
          totalPrice: Number(product.price) * Number(item.quantity),
        });
      }

      await transaction.order_item.createMany({ data: _orderItemsData });
    });

    console.log(createdOrder);

    return res.status(200).json({
      success: true,
      message: "your order placed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  const { page = 0, limit = 0 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  try {
    let orders;

    if (page || limit) {
      orders = await db.order.findMany({
        skip: offset,
        take: Number(limit),
        select: {
          id: true,
          user: {
            select: {
              username: true,
              email: true,
              role: true,
            },
          },
          orderItem: {
            select: {
              orderId: true,
              productPrice: true,
              totalPrice: true,
              product: true,
            },
          },
        },
      });
    } else {
      orders = await db.order.findMany({
        select: {
          id: true,
          user: {
            select: {
              username: true,
              email: true,
              role: true,
            },
          },
          orderItem: {
            select: {
              id: true,
              productPrice: true,
              totalPrice: true,
              product: true,
            },
          },
        },
      });
    }

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "orders not found!",
        order: orders,
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched all orders successfully.",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};

export const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await db.order.findMany({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        user: {
          select: {
            username: true,
            email: true,
            role: true,
          },
        },
        orderItem: {
          select: {
            id: true,
            productPrice: true,
            totalPrice: true,
            product: true,
          },
        },
      },
    });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "orders not found!",
        data: orders,
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched all orders successfully.",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};
