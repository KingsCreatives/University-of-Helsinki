require("dotenv").config();
const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// const errorHandler = (error, request, response, next) => {
//   logger.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return response.status(400).json({ error: error.message });
//   } else if (
//     error.name === "MongoServerError" &&
//     error.message.includes("E11000 duplicate key error")
//   ) {
//     return response
//       .status(400)
//       .json({ error: "expected `username` to be unique" });
//   } else if (
//     error instanceof SyntaxError &&
//     error.status === 400 &&
//     "body" in error
//   ) {
//     return response.status(400).json({ error: "Invalid JSON syntax" });
//   } else if (error.name === "JsonWebTokenError") {
//     return response.status(401).json({ error: "token invalid" });
//   } else if (error.name === "TokenExpiredError") {
//     return response.status(401).json({
//       error: "token expired",
//     });
//   }

//   next(error);
// };

const errorHandler = (error, request, response, next) => {
  console.error(error.stack || error.message); // Log full error stack for debugging

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (
    error instanceof SyntaxError &&
    error.status === 400 &&
    "body" in error
  ) {
    return response.status(400).json({ error: "Invalid JSON syntax" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else {
    // General catch-all for other errors
    return response.status(500).json({ error: "Internal Server Error" });
  }

  next(error); // Pass any unhandled errors to the next middleware
};


const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  console.log(req.token)
  try {
    if (!req.token) {
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decodedToken.id);
    if (user) {
      req.user = user;
    } else {
      req.user = null;
      return res.status(401).json({ error: "User not found" });
    }

    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
