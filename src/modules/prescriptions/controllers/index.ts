import prescriptionService from "../use-cases";
import { MakeGetSummary } from "./get-summary";
import { MakePostCancel } from "./post-cancel";
import { MakePostCheckout } from "./post-checkout";
import { MakePostPrescription } from "./post-prescription";

const postPrescription = MakePostPrescription({
  useCase: prescriptionService.createUserReceipt,
});

const getSummary = MakeGetSummary({
  useCase: prescriptionService.getReceiptDetail,
});

const postCheckout = MakePostCheckout({
  useCase: prescriptionService.confirmUserReceipt,
});

const postCancel = MakePostCancel({
  useCase: prescriptionService.cancelUserReceipt,
});

export default Object.freeze({
  postPrescription,
  getSummary,
  postCheckout,
  postCancel,
});
