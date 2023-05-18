import Prescription from "../../../models/prescription";
import User from "../../../models/user";
import Clinic from "../../../models/clinic";
import PharmacyProduct from "../../../models/pharmacy-product";
import helpers from "../../../utils/helpers";
import { MakeCreateUserReceipt } from "./create-user-receipt";
import { MakeGetReceiptDetail } from "./get-receipt-detail";
import { MakeConfirmUserReceipt } from "./confirm-user-receipt";
import { MakeCancelUserReceipt } from "./cancel-user-receipt";

const createUserReceipt = MakeCreateUserReceipt({
  getUserById: User.getById,
  getClinicById: Clinic.getById,
  addPrescription: Prescription.addPrescription,
});

const getReceiptDetail = MakeGetReceiptDetail({
  getPrescriptionById: Prescription.getById,
  getPrice: helpers.getProductPrice,
});

const confirmUserReceipt = MakeConfirmUserReceipt({
  getPrescriptionById: Prescription.getById,
  updateReceipt: Prescription.updateById,
  updateMedicine: PharmacyProduct.updateById,
});

const cancelUserReceipt = MakeCancelUserReceipt({
  getPrescriptionById: Prescription.getById,
  updateReceipt: Prescription.updateById,
  updateMedicine: PharmacyProduct.updateById,
});

export default Object.freeze({
  createUserReceipt,
  getReceiptDetail,
  confirmUserReceipt,
  cancelUserReceipt,
});
