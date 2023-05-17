function getProductPrice(
  productPrice: number,
  config: number,
  taxIncluded: boolean
) {
  const finalPrice =
    config == 1 ? productPrice + productPrice * (10 / 100) : productPrice;
  const tax = taxIncluded ? finalPrice * (11 / 100) : 0;

  return { finalPrice, tax };
}

export default Object.freeze({
  getProductPrice,
});
