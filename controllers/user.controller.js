import db from "../db/db.js";

export const userController = async (req, res) => {
  try {
    const existUser = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "fetched user successfully.",
      data: existUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};
