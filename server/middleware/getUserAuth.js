import jwt from 'jsonwebtoken';

const getUserAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.user = { id: decoded.id }; // Store user info on request object
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized. Login again." });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default getUserAuth;
