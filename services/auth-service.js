require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const users = require("../data/users");

const decodeToken = (token) => {
  return jsonwebtoken.verify(token, process.env.SECRET);
};

const findUserWithId = (id) => {
  let user = users.find((item) => item.user_id === id);
  return user;
};

const findUserWithName = (username) => {
  let user = users.find((item) => item.username === username);
  return user;
};

const getAllUsers = () => {
  let list = users.map((item) => {
    return {
      user_id: item.user_id,
      username: item.username,
    };
  });
  console.log(list);
  return list;
};

const accessTime = "30s";
const refreshTime = "5m";

const generateToken = (info, expiredIn) => {
  let token = jsonwebtoken.sign(info, process.env.SECRET, {
    expiresIn: expiredIn,
  });
  return token;
};

const login = (username, password) => {
  let user = findUserWithName(username);
  if (!user) throw "UserNotExistError";
  if (String(user.password) !== password) throw "PasswordNotCorrect";
  let info = {
    user_id: user.user_id,
    username: user.username,
  };
  let refreshToken = generateToken(info, refreshTime);
  let accessToken = generateToken(info, accessTime);
  user.refresh = refreshToken;
  console.log(user);
  let userWithToken = {
    user: {
      user_id: user.user_id,
      username: user.username,
    },
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return userWithToken;
};

const giveBackAccessToken = (refreshToken) => {
  try {
    let info = decodeToken(refreshToken);
    let existUser = findUserWithId(info.user_id);
    if(!existUser) throw "UserNotExistedError";
    if (existUser.refresh !== refreshToken) throw "InvalidTokenError";
    let newAccessToken = generateToken({
        user_id: existUser.user_id,
        username: existUser.username
    }, accessTime);
    return newAccessToken;
  } catch (error) {
      console.log(error);
      throw error.name; 
  }
};

module.exports = {
  login,
  getAllUsers,
  giveBackAccessToken,
  decodeToken,
};
