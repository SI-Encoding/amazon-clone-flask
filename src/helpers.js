
async function calculateTotal(products) {
  let total_for_product = 0;
  Object.entries(products).map(item => {
    total_for_product += item[1][0].price * item[1].length;
  })
  return total_for_product;
}

export default calculateTotal;

