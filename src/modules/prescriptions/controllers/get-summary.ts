import { Request, Response } from "express";
import { ReceiptDetailOutputs } from "../../../utils/types/outputs";

type dependencies = {
  useCase: (receiptId: number, userId: number) => Promise<ReceiptDetailOutputs>;
};

export const MakeGetSummary =
  ({ useCase }: dependencies) =>
  async (request: Request, response: Response) => {
    const recieptId: number = parseInt(request.params.id);
    const { userId } = request.body;
    
    if (!recieptId) throw new Error("Reciept field is required!");
    if (!userId) throw new Error("User field is required!");
    const result = await useCase(recieptId, userId);

    return response.status(200).json({
      success: true,
      message: "Reciept Data",
      data: result,
    });
  };
