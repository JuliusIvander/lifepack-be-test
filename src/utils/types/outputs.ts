export type GetProductOutputs = {
  productId: number;
  productName: string;
  productSKU: string;
  price: number;
  tax: number;
  stock: number;
};

export type PostPrescriptionOutputs = {
  prescriptionId: number;
  patientName: string;
  doctorName: string;
  clinicName: string;
  status: string;
};

export type UserMedicineOutputs = {
  receiptId: number;
  detailId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};

export type ReceiptDetailOutputs = {
  receiptId: number;
  clinicName: string;
  doctorName: string;
  patientName: string;
  medicineList: {
    medicineId: number;
    medicineName: string;
    price: number;
    tax: number;
    quantity: number;
    finalPrice: number;
  }[];
  totalPrice: number;
};
