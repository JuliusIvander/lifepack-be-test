import express from "express";
import productRoute from "./product";
import prescriptionRoute from "./prescription";

const router = express.Router();

router.use("/product", productRoute);
router.use("/prescription", prescriptionRoute);

export default router;
