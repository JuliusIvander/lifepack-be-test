import {
  PharmacyProduct,
  PharmacyProductUpdateData,
  Prescription,
  PrescriptionData,
  PrescriptionUpdateData,
} from "../../../utils/types/models";

type dependencies = {
  getPrescriptionById: (id: number) => Promise<PrescriptionData | null>;
  updateReceipt: (
    id: number,
    data: PrescriptionUpdateData
  ) => Promise<Prescription>;
  updateMedicine: (
    id: number,
    data: PharmacyProductUpdateData
  ) => Promise<PharmacyProduct>;
};

export const MakeConfirmUserReceipt =
  ({ getPrescriptionById, updateReceipt, updateMedicine }: dependencies) =>
  async (receiptId: number, userId: number) => {
    // Get data resep
    const receiptData = await getPrescriptionById(receiptId);

    // Cek apakah resep exist dan sesuai dengan user
    if (!receiptData) throw new Error("Receipt not found!");
    if (receiptData.PatientId !== userId) throw new Error("Unauthorized!");

    // Cek status resep
    if (receiptData.Status === "Confirmed")
      throw new Error("Receipt has been checkout!");
    if (receiptData.Status === "Cancelled")
      throw new Error("Receipt has been cancelled!");

    // Cek masing-masing obat apakah jika dikurangin stoknya minus atau tidak
    receiptData.PrescriptionDetails.forEach((rs) => {
      if (rs.Product.Stock < rs.Quantity)
        throw new Error(
          `Product name:${rs.Product.Name}. Stock falls short of the required amount. Please change the product's quantity.`
        );
    });

    // Update resep jadi confirmed
    await updateReceipt(receiptId, {
      Status: "Confirmed",
    });

    // Ubah stok obat
    await Promise.all(
      receiptData.PrescriptionDetails.map(async (rs) => {
        // Update data obat
        const stock = rs.Product.Stock - rs.Quantity;
        await updateMedicine(rs.ProductId, {
          Stock: stock,
        });
      })
    );

    return true;
  };
