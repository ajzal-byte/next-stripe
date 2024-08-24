function convertToSubCurrency(price: number, factor = 100) {
  return Math.round(price * factor);
}

export default convertToSubCurrency;
