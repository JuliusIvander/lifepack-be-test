import { db } from "../../src/utils/prisma";
import { faker } from "@faker-js/faker";

async function clinicSeed() {
  await db.clinic.createMany({
    data: [
      {
        Name: "Rumah Sakit A",
        Address: faker.location.streetAddress({ useFullAddress: true }),
      },
      {
        Name: "Rumah Sakit Umum Daerah B",
        Address: faker.location.streetAddress({ useFullAddress: true }),
      },
      {
        Name: "Rumah Sakit C",
        Address: faker.location.streetAddress({ useFullAddress: true }),
      },
      {
        Name: "Rumah Sakit Umum Daerah D",
        Address: faker.location.streetAddress({ useFullAddress: true }),
      },
    ],
    skipDuplicates: true,
  });
}

export default clinicSeed();