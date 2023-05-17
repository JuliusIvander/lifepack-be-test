import { Request, Response } from "express";
import { UserMedicineInputs } from "../../../utils/types/inputs";
import { UserMedicineOutputs } from "../../../utils/types/outputs";

type dependencies = {
  useCase: (params: UserMedicineInputs) => Promise<UserMedicineOutputs>;
};

export const makePutUserMedicine =
  ({ useCase }: dependencies) =>
  async (request: Request, response: Response) => {
    const payload: UserMedicineInputs = request.body;
    if (!payload.receiptId) throw new Error("Receipt field is required!");
    if (!payload.productId) throw new Error("Medicine field is required!");
    if (!payload.userId) throw new Error("User field is required!");
    if (payload.quantity === undefined || payload.quantity < 0)
      throw new Error("Quantity field is required!");
    

    const result = await useCase(payload);
    return response.status(201).json({
      success: true,
      message: "Receipt has been updated!",
      data: result,
    });
  };
