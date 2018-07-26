export const getBasePath = (product) => {
  return `${DEFINED.API[product.toUpperCase()].protocol}://${DEFINED.API[product.toUpperCase()].url}:${DEFINED.API[product.toUpperCase()].port}`;
};

export const getApiBaseUrl = ({ product, productFamily, country }) => {
  return `${getBasePath(product)}/${country.toLowerCase()}/${productFamily}/${product}`;
};
