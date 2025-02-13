export default function refineProductBody(productBody) {
  const product = productBody;
  product.id = parseInt(product.id);
  product.price = product.price.replace(',', '.');
  product.price = parseFloat(product.price);
  product.reference_number = parseInt(product.reference_number);
  return product;
}