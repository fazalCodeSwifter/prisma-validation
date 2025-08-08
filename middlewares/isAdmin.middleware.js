import db from "../db/db.js";

export const isAdmin = async (req, res, next) => {
  const { id } = req.user;

  try {
    const userData = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        role: true,
      },
    });

    if (userData.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "only admin can access!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
      originalError: error.message,
    });
  }
};
