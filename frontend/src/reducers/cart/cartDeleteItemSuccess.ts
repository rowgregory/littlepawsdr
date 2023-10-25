const cartDeleteItemSuccess = (state: any, action: any) => {
  const itemExistsAlready: any = state.cartItems.find(
    (x: any) =>
      x.productId === action.payload.productId && x.size === action.payload.size
  );

  itemExistsAlready.quantity -= 1;

  const cartItems = state.cartItems.map((item: any) =>
    (item.productId === action.payload.productId &&
      item.size === action.payload.size) ||
    (item.productId === action.payload.productId &&
      item.productName === action.payload.productName)
      ? itemExistsAlready
      : item
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
    loading: false,
    cartItem: action.payload,
    cartItems,
    cartItemsAmount,
    subtotal,
    shippingPrice,
    isPhysicalProduct,
    totalPrice,
    cartDrawer: false,
  };
};

export default cartDeleteItemSuccess;
