const jwt = require("jsonwebtoken");
import config from '../config/config';

const verifyToken = (req: any, res: any, next: any) => {
  const { token } = req.body;
    console.log(token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.token);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken