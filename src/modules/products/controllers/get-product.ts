import { Request, Response } from "express";
import { GetProductOutputs } from "../../../utils/types/outputs";
import { GetProductInputs } from "../../../utils/types/inputs";

type dependencies = {
  useCase: (params: GetProductInputs) => Promise<GetProductOutputs[]>;
};

export const MakeGetProduct =
  ({ useCase }: dependencies) =>
  async (request: Request, response: Response) => {
    const payload = request.query;
    const result = await useCase(payload);

    return response.status(200).json({
      success: true,
      message: "Product List",
      data: result,
    });
  };
