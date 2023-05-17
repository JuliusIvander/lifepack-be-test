import express, { Request, Response } from "express";
import prescriptionController from "../modules/prescriptions/controllers";
import medicineController from "../modules/medicines/controllers";

const route = express.Router();
route.post("", async (req: Request, res: Response, next: Function) => {
  try {
    await prescriptionController.postPrescription(req, res);
  } catch (error: unknown) {
    next(error);
  }
});

route.post("/medicine", async (req: Request, res: Response, next: Function) => {
  try {
    await medicineController.postUserMedicine(req, res);
  } catch (error) {
    next(error);
  }
});

route.put("/medicine", async (req: Request, res: Response, next: Function) => {
  try {
    await medicineController.putUserMedicine(req, res);
  } catch (error) {
    next(error);
  }
});

route.get("/summary", async (req: Request, res: Response, next: Function) => {
  try {
    await prescriptionController.getSummary(req, res);
  } catch (error) {
    next(error);
  }
});

export default route;
