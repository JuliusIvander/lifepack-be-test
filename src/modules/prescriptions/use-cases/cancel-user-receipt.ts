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

export const MakeCancelUserReceipt =
  ({ getPrescriptionById, updateReceipt, updateMedicine }: dependencies) =>
  async (receiptId: number, userId: number) => {
    // Get data resep
    const receiptData = await getPrescriptionById(receiptId);

    // Cek apakah resep exist dan sesuai dengan user
    if (!receiptData) throw new Error("Receipt not found!");
    if (receiptData.PatientId !== userId) throw new Error("Unauthorized!");

    // Cek status resep
    if (receiptData.Status === "Cancelled")
      throw new Error("Receipt has been cancelled!");
    
    // Update resep jadi cancelled
    await updateReceipt(receiptId, {
      Status: "Cancelled",
    });

    // Ubat stok obat
    await Promise.all(
      receiptData.PrescriptionDetails.map(async (rs) => {
        // Update data obat
        const stock = rs.Product.Stock + rs.Quantity;
        await updateMedicine(rs.ProductId, {
          Stock: stock,
        });
      })
    );

    return true;
  };
