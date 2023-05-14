// Dependancies
const jwt = require("jsonwebtoken");

// Internals

const checkLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    //Checking -->
    const { username, userID } = verifiedToken;
    req.username = username;
    req.id = userID;
    next();
  } catch {
    res.status(500).send("Token Validation Error");
  }
};

module.exports = checkLogin;
