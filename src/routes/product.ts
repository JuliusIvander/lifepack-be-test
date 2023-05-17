import express, { Request, Response } from "express";
import productController from "../modules/products/controllers";

const route = express.Router();
route.get("", async (req: Request, res: Response, next: Function) => {
  try {
    await productController.getProduct(req, res);
  } catch (error: unknown) {
    next(error);
  }
});

export default route;
