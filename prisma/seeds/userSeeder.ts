import { db } from "../../src/utils/prisma";
import { faker } from "@faker-js/faker";

async function userSeed() {
  const roles = await db.role.findMany();
  for (let i = 0; i < roles.length; i++) {
    await db.user.createMany({
      data: [
        {
          Name: faker.person.fullName(),
          RoleId: roles[i].RoleId,
        },
        {
          Name: faker.person.fullName(),
          RoleId: roles[i].RoleId,
        },
        {
          Name: faker.person.fullName(),
          RoleId: roles[i].RoleId,
        },
      ],
      skipDuplicates: true,
    });
  }
}

export default userSeed();
