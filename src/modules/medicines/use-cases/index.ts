import Prescription from "../../../models/prescription";
import PrescriptionDetail from "../../../models/prescription-detail";
import PharmacyProduct from "../../../models/pharmacy-product";
import helpers from "../../../utils/helpers";
import { makeAddMedicine } from "./add-medicine";
import { makeUpdateMedicine } from "./update-medicine";

const addMedicine = makeAddMedicine({
  getMedicineById: PharmacyProduct.getById,
  getPrescriptionById: Prescription.getById,
  addMedicine: PrescriptionDetail.addPrescriptionDetail,
  updateReceipt: Prescription.updateById,
  getPrice: helpers.getProductPrice,
});

const updateMedicine = makeUpdateMedicine({
  getPrescription: Prescription.getById,
  updateReceipt: Prescription.updateById,
  updateMedicine: PrescriptionDetail.updateById,
  deleteMedicine: PrescriptionDetail.deleteById,
  getPrice: helpers.getProductPrice,
});

export default Object.freeze({
  addMedicine,
  updateMedicine,
});
