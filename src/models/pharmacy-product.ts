import { Prisma, db } from "../utils/prisma";
import { GetProductInputs } from "../utils/types/inputs";
import {
  PharmacyProduct,
  PharmacyProductUpdateData,
} from "../utils/types/models";

async function getAll(params: GetProductInputs): Promise<PharmacyProduct[]> {
  const payload: Prisma.PharmacyProductWhereInput = {};
  if (Object.keys(params).length > 0) {
    payload.OR = [
      params.name
        ? {
            Name: { contains: params.name },
          }
        : {},
      params.sku
        ? {
            SKU: { contains: params.sku },
          }
        : {},
    ];
  }

  const result = await db.pharmacyProduct.findMany({
    where: payload,
  });
  return result;
}

async function getById(id: number): Promise<PharmacyProduct | null> {
  const result = await db.pharmacyProduct.findFirst({
    where: {
      ProductId: id,
    },
  });
  return result;
}

async function updateById(
  id: number,
  data: PharmacyProductUpdateData
): Promise<PharmacyProduct> {
  const result = await db.pharmacyProduct.update({
    where: {
      ProductId: id,
    },
    data: {
      ...data,
      UpdatedAt: new Date(),
    },
  });
  return result;
}

export default { getAll, getById, updateById };
