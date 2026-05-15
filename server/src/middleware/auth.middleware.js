const jwt = require("jsonwebtoken");

const prisma = require("../config/db");

const protect = async (req, res, next) => {
  try {
    let token;

    /*
    ============================
    Get Token
    ============================
    */

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /*
    ============================
    No Token
    ============================
    */

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    /*
    ============================
    Verify Token
    ============================
    */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /*
    ============================
    Find User
    ============================
    */

    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

module.exports = protect;