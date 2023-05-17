import {
  PharmacyProduct,
  Prescription,
  PrescriptionDetails,
} from "../../../utils/types/models";
import { UserMedicineInputs } from "../../../utils/types/inputs";
import {
  PrescriptionData,
  PrescriptionDetailsAddData,
  PrescriptionUpdateData,
} from "../../../utils/types/models";

type dependencies = {
  getMedicineById: (id: number) => Promise<PharmacyProduct | null>;
  getPrescriptionById: (id: number) => Promise<PrescriptionData | null>;
  addMedicine: (
    params: PrescriptionDetailsAddData
  ) => Promise<PrescriptionDetails>;
  updateReceipt: (
    id: number,
    data: PrescriptionUpdateData
  ) => Promise<Prescription>;
  getPrice: (
    productPrice: number,
    config: number,
    taxIncluded: boolean
  ) => { finalPrice: number; tax: number };
};

export const makeAddMedicine =
  ({
    getMedicineById,
    getPrescriptionById,
    addMedicine,
    updateReceipt,
    getPrice,
  }: dependencies) =>
  async (params: UserMedicineInputs) => {
    // Cek apakah ada obatnya dan apakah obatnya masih ada stoknya
    const medicineData = await getMedicineById(params.productId);
    if (!medicineData) throw new Error("Medicine not found!");
    if (medicineData.Stock <= 0) throw new Error("Medicine out of stock!");
    if (medicineData.Stock < params.quantity)
      throw new Error("Limited medicine stock!");

    const userReceipt = await getPrescriptionById(params.receiptId);
    // Cek apakah resep dokternya ada dan user yg request sesuai
    if (!userReceipt) throw new Error("Receipt not found!");
    if (userReceipt.PatientId !== params.userId)
      throw new Error("Unauthorized!");

    // Cek apakah obat sudah masuk ke dalam resep dokter
    const medicineList = userReceipt.PrescriptionDetails.filter(rs => rs.ProductId == params.productId);
    if (medicineList.length > 0)
      throw new Error("Medicine has been registered in this receipt!");

    // Proses penambahan obat dan update harga
    const { finalPrice, tax } = getPrice(
      medicineData.Price * params.quantity,
      medicineData.PriceConfigurationId,
      medicineData.IsTaxIncluded
    );

    const [_, addedMedicine] = await Promise.all([
      await updateReceipt(params.receiptId, {
        TotalPrice: userReceipt.TotalPrice + (finalPrice + tax),
      }),
      await addMedicine({
        PrescriptionId: params.receiptId,
        ProductId: params.productId,
        Quantity: params.quantity,
        Price: finalPrice + tax,
      }),
    ]);

    return {
      receiptId: addedMedicine.PrescriptionId,
      detailId: addedMedicine.PrescriptionDetailsId,
      productId: addedMedicine.ProductId,
      productName: medicineData.Name,
      quantity: addedMedicine.Quantity,
      price: addedMedicine.Price,
    };
  };
