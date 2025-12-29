const hasPhysicalProduct = (cartItems: any[]) =>
  cartItems.some((item) => {
    // Products can be physical or digital
    if (item.itemType === 'product') {
      return item.isPhysicalProduct === true;
    }
    // Welcome Wieners are always digital
    if (item.itemType === 'welcomeWiener') {
      return false;
    }
    // Ecards are always digital
    if (item.itemType === 'ecard') {
      return false;
    }
    return false;
  });

export default hasPhysicalProduct;
