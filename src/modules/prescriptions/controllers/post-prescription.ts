import { Request, Response } from "express";
import { PostPrescriptionInputs } from "../../../utils/types/inputs";
import { PostPrescriptionOutputs } from "../../../utils/types/outputs";

type dependencies = {
  useCase: (params: PostPrescriptionInputs) => Promise<PostPrescriptionOutputs>;
};

export const MakePostPrescription =
  ({ useCase }: dependencies) =>
  async (request: Request, response: Response) => {
    const payload: PostPrescriptionInputs = request.body;
    // Validation
    if (!payload.clinicId) throw new Error("Clinic field is required!");
    if (!payload.doctorId) throw new Error("Doctor field is required!");
    if (!payload.patientId) throw new Error("Patient field is required!");

    const result = await useCase(payload);
    return response.status(201).json({
      success: true,
      message: "User reciept created",
      data: result,
    });
  };
