import { Request, Response, NextFunction } from "express";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");

  return next();
};

export default credentials;
