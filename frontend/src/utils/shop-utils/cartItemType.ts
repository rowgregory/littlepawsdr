const cartItemType = (cartItems: any) => {
    let isWelcomeWiener = false;
    let isEcard = false;
    let isProduct = false;
  
    for (const product of cartItems) {
      if (product?.isProduct) isProduct = true;
  
      if (product?.isWelcomeWiener) isWelcomeWiener = true;
  
      if (product?.isEcard) isEcard = true;
  
      if (isProduct && isWelcomeWiener && isEcard) {
        break;
      }
    }
  
    return { isProduct, isWelcomeWiener, isEcard };
  };

  export default cartItemType