const cartRemoveItem = (state: any, action: any) => {
  const item = action.payload;
  const cartItems = state.cartItems.filter(
    (x: any) =>
      x.size !== item.size ||
      x.productId !== item.productId ||
      x.dachshundId !== item.dachshundId
  );

  const { shippingPrice, cartItemsAmount, subtotal } = cartItems?.reduce(
    (acc: any, item: any) => {
      return {
        shippingPrice:
          acc.shippingPrice +
          Number(item.shippingPrice) * Number(item.quantity),
        cartItemsAmount: (acc.cartItemsAmount += Number(item.quantity)),
        subtotal: acc.subtotal + Number(item.price) * Number(item.quantity),
      };
    },
    { shippingPrice: 0, cartItemsAmount: 0, subtotal: 0 }
  );

  const totalPrice = shippingPrice + subtotal;

  const isPhysicalProduct = cartItems?.some(
    (item: any) => item.isPhysicalProduct
  );

  localStorage.setItem(
    'cartItems',
    JSON.stringify({
      cartItems,
      cartItemsAmount,
      subtotal,
      shippingPrice,
      isPhysicalProduct,
      totalPrice,
    })
  );

  return {
    ...state,
    cartItem: item,
    cartItems,
    cartItemsAmount,
    cartDrawer: false,
    subtotal,
    shippingPrice,
    isPhysicalProduct,
    totalPrice,
  };
};

export default cartRemoveItem;
