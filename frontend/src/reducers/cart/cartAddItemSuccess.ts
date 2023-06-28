const addToExistingCartItem = (item: any, state: any, existingItem: any) => {
  if (item.from === 'cart') existingItem.quantity += 1;
  else existingItem.quantity = item.quantity;

  const updatedCartItems = state.cartItems.map((x: any) =>
    (x.productId === item.productId && x.size === item.size) ||
    (x.productId === item.productId && item.isEcard)
      ? existingItem
      : x
  );

  const { shippingPrice, totalItems, subtotal } = updatedCartItems?.reduce(
    (acc: any, item: any) => {
      return {
        shippingPrice:
          acc.shippingPrice +
          Number(item.shippingPrice) * Number(item.quantity),
        totalItems: (acc.totalItems += Number(item.quantity)),
        subtotal: acc.subtotal + Number(item.price) * Number(item.quantity),
      };
    },
    { shippingPrice: 0, totalItems: 0, subtotal: 0 }
  );

  const isPhysicalProduct = updatedCartItems?.some(
    (item: any) => item.isPhysicalProduct
  );

  localStorage.setItem(
    'cartItems',
    JSON.stringify({
      cartItems: updatedCartItems,
      cartItemsAmount: totalItems,
      subtotal,
      shippingPrice,
      isPhysicalProduct,
      totalPrice: shippingPrice + subtotal,
      totalItems,
    })
  );

  return {
    ...state,
    loading: false,
    cartItem: item,
    cartItems: updatedCartItems,
    cartItemsAmount: totalItems,
    subtotal,
    shippingPrice,
    isPhysicalProduct,
    totalPrice: shippingPrice + subtotal,
  };
};

const addNewCartItem = (item: any, state: any) => {
  const newProductCartItem = [
    ...state.cartItems,
    { ...item, quantity: item?.quantity || 1 },
  ];

  const { shippingPrice, totalItems, subtotal } = newProductCartItem?.reduce(
    (acc, item) => {
      return {
        shippingPrice:
          acc.shippingPrice +
          Number(item.shippingPrice) * Number(item.quantity),
        totalItems: (acc.totalItems += Number(item.quantity)),
        subtotal: acc.subtotal + Number(item.price) * Number(item.quantity),
      };
    },
    { shippingPrice: 0, totalItems: 0, subtotal: 0 }
  );

  const isPhysicalProduct = newProductCartItem?.some(
    (item: any) => item.isPhysicalProduct
  );

  localStorage.setItem(
    'cartItems',
    JSON.stringify({
      cartItems: newProductCartItem,
      cartItemsAmount: totalItems,
      subtotal,
      shippingPrice,
      isPhysicalProduct,
      totalPrice: shippingPrice + subtotal,
    })
  );

  return {
    ...state,
    loading: false,
    cartItem: item,
    cartItems: newProductCartItem,
    cartItemsAmount: totalItems,
    subtotal,
    shippingPrice,
    isPhysicalProduct,
    totalPrice: shippingPrice + subtotal,
  };
};

const cartAddItemSuccess = (state: any, action: any) => {
  const item = action.payload;

  const existingItem: any = state.cartItems.find((x: any) =>
    item.dachshundId
      ? x.productId === item.productId && x.dachshundId === item.dachshundId
      : (x.productId === item.productId && x?.size === item?.size) ||
        (x.productId === item.productId && item.isEcard)
  );

  if (existingItem) {
    return addToExistingCartItem(item, state, existingItem);
  }
  return addNewCartItem(item, state);
};

export default cartAddItemSuccess;
