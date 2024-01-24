import { RequestHandler } from "express";

import { Role } from "@prisma/client";

import { UserBody, UserDto } from "./user.dto";

import UserService from "./user.service";

export const create: RequestHandler = async (req, res, next) => {
  try {
    const user: UserBody = req.body;
    const oldUser = await UserService.findUserName(user.username);

    if (oldUser) {
      return res.status(403).json({
        message: `user with username ${user.username} already exists.`,
      });
    }

    const newUser = await UserService.createUser(user);

    return res.status(201).json({
      message: "User Created",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};


export const update: RequestHandler = async (req, res, next) => {
    try {
        
        const id = +req.params.id
        const data: UserDto = req.body

        const found  = await UserService.findUserById(id)

        if(!found) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const mapped = await UserService.update(id, data)

        return res.status(200).json({
            message: 'user update',
            user: mapped
        })

    } catch (error) {
        next(error)
    }
}