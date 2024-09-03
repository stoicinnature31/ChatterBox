import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chat-token"];
  console.log(`cookies: ${req.cookies["chat-token"]}`);

  if (!token) next(new ErrorHandler("Please login to access this route", 401));


  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);

  req.user = decodedData._id;


  next();
}


const isAdmin = (req, res, next) => {
  const token = req.cookies["chat-app-admin-token"];

  if (!token) next(new ErrorHandler("Only admin can access this route", 401));


  const secretKey = jwt.verify(token, process.env.JWT_SECRET);


  const isMatch = secretKey === adminSecretKey;

  if (!isMatch) return next(new ErrorHandler("Only admin can access this route", 401));




  next();
}

export { isAuthenticated,isAdmin };

