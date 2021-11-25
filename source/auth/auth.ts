const jwt = require("jsonwebtoken");
import config from '../config/config';

const verifyToken = (req: any, res: any, next: any) => {
  const { token } = req.body;
    console.log(token);
  if (!token) {
    return res.json({
      success: false,
      message: "A token is required for authentication"
    });
  }
  try {
    const decoded = jwt.verify(token, config.token);
    req.user = decoded;
  } catch (err) {
    return res.json({
      success: false,
      message: "Invalid Token"
    });
  }
  return next();
};

export default verifyToken