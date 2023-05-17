export type GetProductInputs = {
  name?: string;
  sku?: string;
};

export type PostPrescriptionInputs = {
  clinicId: number;
  patientId: number;
  doctorId: number;
};

export type UserMedicineInputs = {
  receiptId: number;
  userId: number;
  productId: number;
  quantity: number;
}