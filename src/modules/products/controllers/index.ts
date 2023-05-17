import { MakeGetProduct } from "./get-product";
import productService from "../use-cases";

const getProduct = MakeGetProduct({
  useCase: productService.getAllProducts
});

export default Object.freeze({
  getProduct,
});
