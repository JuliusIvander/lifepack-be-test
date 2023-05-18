import { UserMedicineInputs } from "../../../utils/types/inputs";
import {
  Prescription,
  PrescriptionData,
  PrescriptionDetails,
  PrescriptionDetailsUpdateData,
  PrescriptionUpdateData,
} from "../../../utils/types/models";

type dependencies = {
  getPrescription: (id: number) => Promise<PrescriptionData | null>;
  updateReceipt: (
    id: number,
    data: PrescriptionUpdateData
  ) => Promise<Prescription>;
  updateMedicine: (
    id: number,
    data: PrescriptionDetailsUpdateData
  ) => Promise<PrescriptionDetails>;
  deleteMedicine: (id: number) => Promise<PrescriptionDetails>;
  getPrice: (
    productPrice: number,
    config: number,
    taxIncluded: boolean
  ) => { finalPrice: number; tax: number };
};

export const makeUpdateMedicine =
  ({
    getPrescription,
    updateReceipt,
    updateMedicine,
    deleteMedicine,
    getPrice,
  }: dependencies) =>
  async (params: UserMedicineInputs) => {
    // Cek apakah resep dokternya ada
    const userReceipt = await getPrescription(params.receiptId);
    if (!userReceipt) throw new Error("Receipt not found!");
    if (userReceipt.PatientId !== params.userId)
      throw new Error("Unauthorized");

    // Cek status resep
    if (userReceipt.Status === "Confirmed")
      throw new Error("Receipt has been checkout!");
    if (userReceipt.Status === "Cancelled")
      throw new Error("Receipt has been cancelled!");

    // Cek apakah obat sudah terdaftar
    let selectedMedicine = userReceipt.PrescriptionDetails.filter(
      (rs) => rs.ProductId === params.productId
    );
    if (selectedMedicine.length === 0)
      throw new Error(
        "Medicine has not been registered! Please register this medicine!"
      );

    // Cek apakah kuantitas melebihi stok
    if (selectedMedicine[0].Product.Stock < params.quantity)
      throw new Error("Limited medicine stock!");

    // Jika quantity 0 maka delete produk
    const detailId = selectedMedicine[0].PrescriptionDetailsId;
    let TotalPrice = userReceipt.TotalPrice - selectedMedicine[0].Price;
    if (params.quantity == 0) {
      await Promise.all([
        updateReceipt(params.receiptId, { TotalPrice }),
        deleteMedicine(detailId),
      ]);

      return {
        receiptId: selectedMedicine[0].PrescriptionId,
        detailId: selectedMedicine[0].PrescriptionDetailsId,
        productId: selectedMedicine[0].ProductId,
        productName: selectedMedicine[0].Product.Name,
        quantity: 0,
        price: 0,
      };
    }
    //  Jika quantity > 0 maka update produk
    const { finalPrice, tax } = getPrice(
      selectedMedicine[0].Product.Price * params.quantity,
      selectedMedicine[0].Product.PriceConfigurationId,
      selectedMedicine[0].Product.IsTaxIncluded
    );
    TotalPrice += finalPrice + tax;
    const [_, updatedDetail] = await Promise.all([
      updateReceipt(params.receiptId, { TotalPrice }),
      updateMedicine(detailId, {
        Quantity: params.quantity,
        Price: finalPrice + tax,
      }),
    ]);

    return {
      receiptId: updatedDetail.PrescriptionId,
      detailId: updatedDetail.PrescriptionDetailsId,
      productId: updatedDetail.ProductId,
      productName: selectedMedicine[0].Product.Name,
      quantity: updatedDetail.Quantity,
      price: updatedDetail.Price,
    };
  };
