const cartRemoveItem = (item: any, state: any) => {
  const cartItems = state.cartItems.filter(
    (x: any) =>
      x.size !== item.size || x.productId !== item.productId || x.dachshundId !== item.dachshundId
  );

  const { shippingPrice, cartItemsAmount, subtotal } = cartItems?.reduce(
    (acc: any, item: any) => {
      return {
        shippingPrice: acc.shippingPrice + Number(item.shippingPrice) * Number(item.quantity),
        cartItemsAmount: (acc.cartItemsAmount += Number(item.quantity)),
        subtotal: acc.subtotal + Number(item.price) * Number(item.quantity),
      };
    },
    { shippingPrice: 0, cartItemsAmount: 0, subtotal: 0 }
  );

  const isPhysicalProduct = cartItems?.some((item: any) => item.isPhysicalProduct);

  localStorage.setItem('cartData', JSON.stringify(cartItems));

  state.loading = false;
  state.cartItem = {};
  state.cartItems = cartItems;
  state.cartItemsAmount = cartItemsAmount;
  state.subtotal = subtotal;
  state.shippingPrice = shippingPrice;
  state.isPhysicalProduct = isPhysicalProduct;
  state.totalPrice = shippingPrice + subtotal;
};

export default cartRemoveItem;
