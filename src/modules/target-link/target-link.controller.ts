import { RequestHandler } from "express";
import { createError } from "../../core/utils/createError";

import { TargetLinkService } from "./target-link.service";
import { TargetLinkBody, TargetLinkUpdateBody } from "./target-link.model";

export const create: RequestHandler = async (req, res, next) => {
  try {
    const data: TargetLinkBody = req.body;
    const targetLink = await TargetLinkService.create(data);
    res.status(201).json({
      message: "TargetLink created successfully",
      targetLink,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const targetLinks = await TargetLinkService.getAll();
    return res.status(200).json({
      message: "All TargetLinks retrieved successfully",
      targetLinks,
    });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const targetLink = await TargetLinkService.findById(id);

    if (!targetLink) {
      throw createError("TargetLink not found", 404);
    }

    res.json({
      message: "TargetLink retrieved successfully",
      targetLink,
    });
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const data: TargetLinkUpdateBody = req.body;
    const targetLink = await TargetLinkService.update(id, data);

    if (!targetLink) {
      throw createError("TargetLink not found", 404);
    }

    res.json({
      message: "TargetLink updated successfully",
      targetLink,
    });
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const targetLink = await TargetLinkService.remove(id);

    if (!targetLink) {
      throw createError("TargetLink not found", 404);
    }

    res.json({
      message: "TargetLink deleted successfully",
      targetLink,
    });
  } catch (error) {
    next(error);
  }
};
