import { PrescriptionData } from "../../../utils/types/models";

type dependencies = {
  getPrescriptionById: (id: number) => Promise<PrescriptionData | null>;
  getPrice: (
    productPrice: number,
    config: number,
    taxIncluded: boolean
  ) => { finalPrice: number; tax: number };
};

export const MakeGetReceiptDetail =
  ({ getPrescriptionById, getPrice }: dependencies) =>
  async (receiptId: number, userId: number) => {
    // Get data
    const data = await getPrescriptionById(receiptId);
    if (!data) throw new Error("Receipt not found!");
    if (data.PatientId != userId) throw new Error("Unauthorized!");

    return {
      receiptId: data.PrescriptionId,
      clinicName: data.Clinic.Name,
      doctorName: data.Doctor.Name,
      patientName: data.Patient.Name,
      medicineList: data.PrescriptionDetails.map((rs) => {
        const { finalPrice, tax } = getPrice(
          rs.Product.Price,
          rs.Product.PriceConfigurationId,
          rs.Product.IsTaxIncluded
        );

        return {
          medicineId: rs.ProductId,
          medicineName: rs.Product.Name,
          price: finalPrice,
          tax: tax,
          quantity: rs.Quantity,
          finalPrice: rs.Price,
        };
      }),
      totalPrice: data.TotalPrice,
    };
  };
