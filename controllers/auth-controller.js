const service = require("../services/auth-service");

const login = (req, res) => {
  let body = req.body;
  if (!body) return res.status(400).json({ message: "Missing body" });
  console.log(body);
  if (body.username === undefined || body.password === undefined)
    return res.status(400).json({ message: "Missing info" });
  try {
    let userToken = service.login(body.username, body.password);
    return res.status(200).json(userToken);
  } catch (error) {
    let errorType = String(error.name);
    switch (errorType) {
      case "UserNotExistError":
        return res.status(404).json({ message: errorType });
      case "PasswordNotCorrectError":
      default:
        return res.status(400).json({ message: errorType });
    }
  }
};

const getAllUsers = (req, res) => {
  console.log("get all users function");
  let allUsers = service.getAllUsers();
  res.status(200).json(allUsers);
};

const keepLive = (req, res) => {
  let authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(401);
  let refreshToken = String(authHeader).split(" ")[1];
  try {
    let accessToken = service.giveBackAccessToken(refreshToken);
    res.status(200).json({accessToken: accessToken});
  } catch (error) {
    res.sendStatus(403);
  }
};

module.exports = {
  login,
  getAllUsers,
  keepLive
};
