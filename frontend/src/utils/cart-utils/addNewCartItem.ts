const addNewCartItem = (item: any, state: any) => {
  const newProductCartItems = [...state.cartItems, { ...item, quantity: item?.quantity || 1 }];

  const { shippingPrice, totalItems, subtotal } = newProductCartItems?.reduce(
    (acc, item) => {
      return {
        shippingPrice: acc.shippingPrice + Number(item.shippingPrice) * Number(item.quantity),
        totalItems: (acc.totalItems += Number(item.quantity)),
        subtotal: acc.subtotal + Number(item.price) * Number(item.quantity),
      };
    },
    { shippingPrice: 0, totalItems: 0, subtotal: 0 }
  );

  const isPhysicalProduct = newProductCartItems?.some((item: any) => item.isPhysicalProduct);

  localStorage.setItem('cartData', JSON.stringify(newProductCartItems));

  state.loading = false;
  state.cartItem = item;
  state.cartItems = newProductCartItems;
  state.cartItemsAmount = totalItems;
  state.subtotal = subtotal;
  state.shippingPrice = shippingPrice;
  state.isPhysicalProduct = isPhysicalProduct;
  state.totalPrice = shippingPrice + subtotal;
};

export default addNewCartItem;
