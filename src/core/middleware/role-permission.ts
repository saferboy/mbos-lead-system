import { NextFunction, Request, Response } from "express";

import { verify } from "../service/jwt/jwt.service";
import { Role } from "@prisma/client";

import UserService from "../../modules/user/user.service";
// import JWTError from '../service/jwt/jwt.error'

export const permission = (permissions: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const tokenArray = token.split(" ");

    if (tokenArray.length < 1) {
		return res.status(401).json({
			message: 'Token not provided'
		})
	}
    const bearerToken = tokenArray.at(1) ?? "";
    try {
      const payload = await verify(bearerToken);

      const user = await UserService.findUserById(payload.userId);

      if (
        user?.role &&
        permissions.length > 0 &&
        !permissions.includes(user.role)
      ) {
        return res.status(403).json({
          message: "Access denied this organization",
        });
      }

      res.locals.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
