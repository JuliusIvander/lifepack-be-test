import { Request, Response } from "express";
import { ReceiptDetailOutputs } from "../../../utils/types/outputs";

type dependencies = {
  useCase: (receiptId: number) => Promise<ReceiptDetailOutputs>;
};

export const MakeGetSummary =
  ({ useCase }: dependencies) =>
  async (request: Request, response: Response) => {
    const recieptId: number = request.body.recieptId;
    if (!recieptId) throw new Error("Reciept field is required!");
    const result = await useCase(recieptId);

    return response.status(200).json({
      success: true,
      message: "Reciept Data",
      data: result,
    });
  };
