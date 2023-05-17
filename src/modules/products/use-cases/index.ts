import PharmacyProduct from "../../../models/pharmacy-product";
import helpers from "../../../utils/helpers";
import { MakeGetAllProducts } from "./get-all-products";

const getAllProducts = MakeGetAllProducts({
    getAll: PharmacyProduct.getAll,
    getPrice: helpers.getProductPrice
});

export default Object.freeze({
  getAllProducts,
});
