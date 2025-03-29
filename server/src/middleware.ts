import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token);
    if (!token) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }
    jwt.verify(token, process.env.JWT_TOKEN!, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: "Invalid Token",
        });
        return;
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Authentication error",
    });
  }
};
