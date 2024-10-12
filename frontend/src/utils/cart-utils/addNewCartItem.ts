const addNewCartItem = (item: any, state: any) => {
  const newProductCartItem = [...state.cartItems, { ...item, quantity: item?.quantity || 1 }];

  const { shippingPrice, totalItems, subtotal } = newProductCartItem?.reduce(
    (acc, item) => {
      return {
        shippingPrice: acc.shippingPrice + Number(item.shippingPrice) * Number(item.quantity),
        totalItems: (acc.totalItems += Number(item.quantity)),
        subtotal: acc.subtotal + Number(item.price) * Number(item.quantity),
      };
    },
    { shippingPrice: 0, totalItems: 0, subtotal: 0 }
  );

  const isPhysicalProduct = newProductCartItem?.some((item: any) => item.isPhysicalProduct);

  state.loading = false;
  state.cartItem = item;
  state.cartItems = newProductCartItem;
  state.cartItemsAmount = totalItems;
  state.subtotal = subtotal;
  state.shippingPrice = shippingPrice;
  state.isPhysicalProduct = isPhysicalProduct;
  state.totalPrice = shippingPrice + subtotal;
};

export default addNewCartItem;
