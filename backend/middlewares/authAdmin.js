import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    let token;

    // Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Optional fallback
    if (!token && req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, login again",
      });
    }

    // ✅ VERIFY + DECODE TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 CRITICAL ADMIN CHECK
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "No authorization",
      });
    }

    // ✅ Attach admin info to request
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, invalid token",
    });
  }
};

export default authAdmin;
