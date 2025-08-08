import db from "../db/db.js";

export const createProduct = async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  try {
    if (!title || !description || !price || !imageURL) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required!",
      });
    }
    if (typeof price !== "number") {
      return res.status(400).json({
        success: false,
        message: "price must be number only!",
      });
    }

    const createProduct = await db.$transaction([
      db.product.create({
        data: {
          title: title.trim(),
          description: description.trim(),
          price: Number(price),
          imageURL: imageURL.trim(),
        },
      }),
    ]);

    console.log(createProduct);

    return res.status(200).json({
      success: true,
      message: "product create successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};

export const geAlltProducts = async (req, res) => {
  const { page = 0, limit = 0 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    let products;
    if (page || limit) {
      products = await db.product.findMany({
        skip: offset,
        take: Number(limit),
      });
    } else {
      products = await db.product.findMany();
    }

    return res.status(200).json({
      success: true,
      message: "fetched products successfully.",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};

export const singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await db.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!!!singleProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
        data: singleProduct,
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetched product successfully.",
      data: singleProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  const { id } = req.params;
  try {
    if (!title || !description || !price || !imageURL) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required!",
      });
    }
    if (typeof price !== "number") {
      return res.status(400).json({
        success: false,
        message: "price must be number only!",
      });
    }

    const updatedProduct = await db.$transaction([
      db.product.update({
        where: {
          id: Number(id),
        },
        data: {
          title: title.trim(),
          description: description.trim(),
          price: Number(price),
          imageURL: imageURL.trim(),
        },
      }),
    ]);

    console.log(updatedProduct);

    if (!!!updatedProduct) {
      return res.status(422).json({
        success: false,
        message: "product not fount!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "product update successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await db.$transaction([
      db.product.delete({
        where: {
          id: Number(id),
        },
      }),
    ]);

    if (!!!deletedProduct) {
      return res.status(422).json({
        success: false,
        message: "product not fount!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "product create successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};
