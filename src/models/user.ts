import { db } from "../utils/prisma";
import { UserData } from "../utils/types/models";

async function getById(id: number): Promise<UserData | null> {
  const result = db.user.findFirst({
    where: {
      UserId: id,
    },
    include: {
      Role: true,
    },
  });

  return result;
}

export default Object.freeze({
  getById,
});
