import prescriptionService from "../use-cases";
import { MakeGetSummary } from "./get-summary";
import { MakePostPrescription } from "./post-prescription";

const postPrescription = MakePostPrescription({
  useCase: prescriptionService.createUserReceipt,
});

const getSummary = MakeGetSummary({
  useCase: prescriptionService.getReceiptDetail,
});

export default Object.freeze({
  postPrescription,
  getSummary,
});
