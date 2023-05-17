import { db } from "../utils/prisma";
import {
  PrescriptionDetails,
  PrescriptionDetailsAddData,
  PrescriptionDetailsUpdateData,
} from "../utils/types/models";

async function addPrescriptionDetail(
  params: PrescriptionDetailsAddData
): Promise<PrescriptionDetails> {
  const result = await db.prescriptionDetails.create({
    data: params,
  });
  return result;
}

async function updateById(
  id: number,
  data: PrescriptionDetailsUpdateData
): Promise<PrescriptionDetails> {
  const result = await db.prescriptionDetails.update({
    where: {
      PrescriptionDetailsId: id
    },
    data: {
      ...data,
      UpdatedAt: new Date(),
    },
  });
  return result;
}

async function deleteById(
  id: number
): Promise<PrescriptionDetails> {
  const result = await db.prescriptionDetails.delete({
    where: {
      PrescriptionDetailsId: id
    }
  });
  return result;
}

export default {
  addPrescriptionDetail,
  updateById,
  deleteById,
};
