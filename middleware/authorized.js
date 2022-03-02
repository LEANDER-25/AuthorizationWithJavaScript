require("dotenv").config();
const service = require('../services/auth-service');
const jsonwebtoken = require("jsonwebtoken");
const users = require("../data/users");

const authorized = (req, res, next) => {
  let authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(401);
  let token = String(authHeader).split(" ")[1];
  try {
    let decoded = service.decodeToken(token)
    req.decoded = decoded;
    next();
  } catch (error) {
      console.log(error);
      return res.sendStatus(403);
  }
};

module.exports = {
    authorized
};

