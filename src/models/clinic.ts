import { db } from "../utils/prisma";
import { Clinic } from "../utils/types/models";

async function getById(id: number): Promise<Clinic | null> {
  const result = await db.clinic.findFirst({
    where: {
      ClinicId: id,
    },
  });

  return result;
}

export default Object.freeze({
  getById,
});
