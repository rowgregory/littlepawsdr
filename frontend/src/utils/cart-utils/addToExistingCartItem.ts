const addToExistingCartItem = (item: any, state: any, existingItem: any) => {
  if (item?.from === 'cart') existingItem.quantity += 1;
  else existingItem.quantity = item?.quantity;

  const updatedCartItems = state.cartItems.map((x: any) =>
    (x.productId === item?.productId && x.size === item?.size) ||
    (x.productId === item?.productId && item?.isEcard)
      ? existingItem
      : x
  );

  const { shippingPrice, totalItems, subtotal } = updatedCartItems?.reduce(
    (acc: any, item: any) => {
      return {
        shippingPrice: acc.shippingPrice + Number(item?.shippingPrice) * Number(item?.quantity),
        totalItems: (acc.totalItems += Number(item?.quantity)),
        subtotal: acc.subtotal + Number(item?.price) * Number(item?.quantity),
      };
    },
    { shippingPrice: 0, totalItems: 0, subtotal: 0 }
  );

  const isPhysicalProduct = updatedCartItems?.some((item: any) => item?.isPhysicalProduct);

  state.loading = false;
  state.cartItem = item;
  state.cartItems = updatedCartItems;
  state.cartItemsAmount = totalItems;
  state.subtotal = subtotal;
  state.shippingPrice = shippingPrice;
  state.isPhysicalProduct = isPhysicalProduct;
  state.totalPrice = shippingPrice + subtotal;
};

export default addToExistingCartItem;
