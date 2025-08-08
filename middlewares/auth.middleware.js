import jwt from "jsonwebtoken";
import db from "../db/db.js";

export const isAuth = async (req, res, next) => {
  const token = req.cookies["accessToken"];
  try {
    if (!token) {
      return res.status(422).json({
        success: false,
        message: "token is required!",
      });
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const existUser = await db.user.findUnique({
      where: {
        id: decodeToken.user_id,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!!!existUser) {
      return res.status(422).json({
        success: false,
        message: "user not found!",
      });
    }

    req.user = existUser;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token Expired!",
        originalError: error.message,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({
        success: false,
        message: "Token: must be a valid Token!",
        originalError: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "something went wrong!",
        originalError: error.message,
      });
    }
  }
};
