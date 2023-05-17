import { db } from "../../src/utils/prisma";

async function roleSeed() {
  await db.role.createMany({
    data: [{ Name: "Patient" }, { Name: "Doctor" }],
    skipDuplicates: true,
  });
}

export default roleSeed();