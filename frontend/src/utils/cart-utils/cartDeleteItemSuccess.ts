const cartDeleteItemSuccess = (item: any, state: any) => {
    const cartItems = state.cartItems.map((cartItem: any) => {
      if (cartItem.productId === item.productId && cartItem.size === item.size) {
        const exist = JSON.parse(JSON.stringify(cartItem));
        exist.quantity -= 1;
        return exist;
      } else {
        return cartItem;
      }
    });
  
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
  
    state.loading = false;
    state.cartItem = item;
    state.cartItems = cartItems;
    state.cartItemsAmount = cartItemsAmount;
    state.subtotal = subtotal;
    state.shippingPrice = shippingPrice;
    state.isPhysicalProduct = isPhysicalProduct;
    state.totalPrice = shippingPrice + subtotal;
  };

  export default cartDeleteItemSuccess