import bcrypt from "bcrypt";
import db from "../db/db.js";
import GenrateToken from "../utils/genrateToken.utils.js";

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required!",
      });
    }

    const existUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!!existUser) {
      return res.status(400).json({
        success: false,
        message: "this email already exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "user created successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required!",
      });
    }

    const existUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!!!existUser) {
      return res.status(400).json({
        success: false,
        message: "wrong email or password!",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, existUser.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        message: "wrong email or password!",
      });
    }

    const accessToken = GenrateToken.accessToken({
      user_id: existUser.id,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "user logged in successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
};
