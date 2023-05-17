import { db } from "../utils/prisma";
import { PostPrescriptionInputs } from "../utils/types/inputs";
import {
  Prescription,
  PrescriptionData,
  PrescriptionUpdateData,
} from "../utils/types/models";

async function getById(id: number): Promise<PrescriptionData | null> {
  const result = await db.prescription.findFirst({
    where: {
      PrescriptionId: id,
    },
    include: {
      Patient: true,
      Doctor: true,
      Clinic: true,
      PrescriptionDetails: {
        include: {
          Product: true
        }
      },
    },
  });
  return result;
}

async function addPrescription(
  params: PostPrescriptionInputs
): Promise<Prescription> {
  const result = await db.prescription.create({
    data: {
      PatientId: params.patientId,
      DoctorId: params.doctorId,
      ClinicId: params.clinicId,
    },
  });
  return result;
}

async function updateById(
  id: number,
  data: PrescriptionUpdateData
): Promise<Prescription> {
  const result = await db.prescription.update({
    where: {
      PrescriptionId: id
    },
    data: {
      ...data,
      UpdatedAt: new Date(),
    },
  });
  return result;
}

export default { getById, addPrescription, updateById };
