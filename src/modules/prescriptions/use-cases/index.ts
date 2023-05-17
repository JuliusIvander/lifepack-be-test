import Prescription from "../../../models/prescription";
import User from "../../../models/user";
import Clinic from "../../../models/clinic";
import helpers from "../../../utils/helpers";
import { MakeCreateUserReceipt } from "./create-user-receipt";
import { MakeGetReceiptDetail } from "./get-receipt-detail";

const createUserReceipt = MakeCreateUserReceipt({
  getUserById: User.getById,
  getClinicById: Clinic.getById,
  addPrescription: Prescription.addPrescription,
});

const getReceiptDetail = MakeGetReceiptDetail({
  getPrescriptionById: Prescription.getById,
  getPrice: helpers.getProductPrice,
});

export default Object.freeze({
  createUserReceipt,
  getReceiptDetail,
});
