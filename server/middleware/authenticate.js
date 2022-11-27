const jwt = require('jsonwebtoken');
const users = require('../models/userSchema.js');
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    // console.log(`token${token}`);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(`verifyToken:${verifyToken}`);
    const rootUser = await users.findOne({ _id: verifyToken._id, " tokens.token": token });
    // console.log(`rootUser:${rootUser}`);
    if (!rootUser) { throw new error('User Not Found !') }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

  } catch (error) {
    res.status(401).send('Unauthorized: NO Token Provided ...');
    console.log(error);
  }

  next();
}
module.exports = authenticate;