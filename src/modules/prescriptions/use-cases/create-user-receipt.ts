import { PostPrescriptionInputs } from "../../../utils/types/inputs";
import { Clinic, Prescription, UserData } from "../../../utils/types/models";

type dependencies = {
  getUserById: (id: number) => Promise<UserData | null>;
  getClinicById: (id: number) => Promise<Clinic | null>;
  addPrescription: (params: PostPrescriptionInputs) => Promise<Prescription>;
};

export const MakeCreateUserReceipt =
  ({ getUserById, getClinicById, addPrescription }: dependencies) =>
  async (params: PostPrescriptionInputs) => {
    // Cek apakah user valid
    const userData = await getUserById(params.patientId);
    if (!userData || userData.Role.Name !== "Patient")
      throw new Error("User is not a patient!");

    const doctorData = await getUserById(params.doctorId);
    if (!doctorData || doctorData.Role.Name !== "Doctor")
      throw new Error("User is not a doctor!");

    // Cek apakah clinic valid
    const clinicData = await getClinicById(params.clinicId);
    if (!clinicData) throw new Error("Clinic not found!");

    // Proses add receipt
    const result = await addPrescription(params);
    return {
      prescriptionId: result.PrescriptionId,
      patientName: userData.Name,
      doctorName: doctorData.Name,
      clinicName: clinicData.Name,
      status: result.Status,
    };
  };
