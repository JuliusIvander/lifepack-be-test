import { Request, Response } from "express";
type dependencies = {
  useCase: (receiptId: number, userId: number) => Promise<boolean>;
};

export const MakePostCancel =
  ({ useCase }: dependencies) =>
  async (request: Request, response: Response) => {
    const recieptId: number = parseInt(request.params.id);
    const { userId } = request.body;

    if (!recieptId) throw new Error("Reciept field is required!");
    if (!userId) throw new Error("User field is required!");
    const result = await useCase(recieptId, userId);

    if (result) {
      return response.status(200).json({
        success: true,
        message: "Successfully to cancel reciept data",
      });
    }
    return response.status(400).json({
      success: false,
      message: "Failed to cancel reciept data",
    });
  };
