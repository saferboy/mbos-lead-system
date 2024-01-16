import { RequestHandler } from "express";
import { createError } from "../../core/utils/createError";

import { TargetTypeService } from "./target-type.service";

export const create: RequestHandler = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const targetType = await TargetTypeService.create(name, description);
    res.status(201).json({
      message: "TargetType created successfully",
      targetType,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const targetTypes = await TargetTypeService.getAll();
    res.json({
      message: "All TargetTypes retrieved successfully",
      targetTypes,
    });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const targetType = await TargetTypeService.findById(id);

    if (!targetType) {
      return res.status(404).json({
        message: "Target type not found" 
      })
    }

    return res.status(200).json({
      message: "TargetType retrieved successfully",
      targetType: {
        id: targetType.id,
        name: targetType.name,
        description: targetType.description
      },
    });
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { name, description } = req.body;
    const targetType = await TargetTypeService.update(id, name, description);

    if (!targetType) {
      throw createError("TargetType not found", 404);
    }

    res.json({
      message: "TargetType updated successfully",
      targetType,
    });
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = +req.params.id;
    const old = await TargetTypeService.findById(id)
    if (!old) {
      return res.status(404).json({
        message: 'target type not found'
      })
    }
    
    const targetType = await TargetTypeService.remove(id);
    res.json({
      message: "TargetType deleted successfully",
      targetType,
    });
  } catch (error) {
    next(error);
  }
};
