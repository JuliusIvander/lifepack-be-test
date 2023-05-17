import { GetProductInputs } from "../../../utils/types/inputs";
import { PharmacyProduct } from "../../../utils/types/models";

type depedencies = {
  getAll: (params: GetProductInputs) => Promise<PharmacyProduct[]>;
  getPrice: (
    productPrice: number,
    config: number,
    taxIncluded: boolean
  ) => { finalPrice: number; tax: number };
};

export const MakeGetAllProducts =
  ({ getAll, getPrice }: depedencies) =>
  async (params: GetProductInputs) => {
    const productDatas = await getAll(params);

    const result = productDatas.map((rs) => {
      const { finalPrice, tax } = getPrice(
        rs.Price,
        rs.PriceConfigurationId,
        rs.IsTaxIncluded
      );

      return {
        productId: rs.ProductId,
        productName: rs.Name,
        productSKU: rs.SKU,
        price: finalPrice,
        tax: tax,
        stock: rs.Stock,
      };
    });

    return result;
  };
