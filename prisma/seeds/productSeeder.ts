import { db } from "../../src/utils/prisma";

async function productSeed() {
  await db.pharmacyProduct.createMany({
    data: [
      {
        Name: "Panadol",
        SKU: "SKU001",
        Price: 1000,
        PriceConfigurationId: 1,
        IsTaxIncluded: false,
        Stock: 100,
      },
      {
        Name: "Tempra",
        SKU: "SKU002",
        Price: 5000,
        PriceConfigurationId: 2,
        IsTaxIncluded: true,
        Stock: 50,
      },
      {
        Name: "Paracetamol",
        SKU: "SKU003",
        Price: 7000,
        PriceConfigurationId: 1,
        IsTaxIncluded: true,
        Stock: 20,
      },
      {
        Name: "Konidin",
        SKU: "SKU004",
        Price: 7000,
        PriceConfigurationId: 2,
        IsTaxIncluded: false,
        Stock: 0,
      },
    ],
    skipDuplicates: true,
  });
}

export default productSeed();
