export type PharmacyProduct = {
  ProductId: number;
  Name: string;
  SKU: string;
  Price: number;
  PriceConfigurationId: number;
  IsTaxIncluded: boolean;
  Stock: number;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type Role = {
  RoleId: number;
  Name: string;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type User = {
  UserId: number;
  Name: string;
  RoleId: number;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type Clinic = {
  ClinicId: number;
  Name: string;
  Address: string;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type Prescription = {
  PrescriptionId: number;
  PatientId: number;
  DoctorId: number;
  ClinicId: number;
  Status: string;
  TotalPrice: number;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type PrescriptionDetails = {
  PrescriptionDetailsId: number;
  PrescriptionId: number;
  ProductId: number;
  Quantity: number;
  Price: number;
  CreatedAt: Date;
  UpdatedAt: Date;
};

// Joined Section
export type UserData = User & { Role: Role };

export type PrescriptionData = Prescription & {
  Patient: User;
  Doctor: User;
  Clinic: Clinic;
  PrescriptionDetails: (PrescriptionDetails & {
    Product: PharmacyProduct;
})[];
};

// Function parameter
export type PrescriptionUpdateData = {
  Status?: string;
  TotalPrice?: number;
};

export type PrescriptionDetailsAddData = {
  PrescriptionId: number;
  ProductId: number;
  Quantity: number;
  Price: number;
};

export type PrescriptionDetailsUpdateData = {
  Quantity?: number;
  Price?: number;
};
