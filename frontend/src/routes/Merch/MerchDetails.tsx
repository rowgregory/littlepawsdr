import { useEffect, useState } from 'react';
import LeftArrow from '../../components/svg/LeftArrow';
import MerchImages from '../../components/merch-detail/MerchImages';
import MerchNamePriceDescription from '../../components/merch-detail/MerchNamePriceDescription';
import AddToCartSection from '../../components/merch-detail/AddToCartSection';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../redux/services/productApi';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { useAppDispatch } from '../../redux/toolkitStore';
import { scrollToTop } from '../../utils/scrollToTop';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState<number>(1);
  const [size, setSize] = useState('');

  const { data, isLoading } = useGetProductQuery(id);
  const product = data?.product;

  console.log(product)

  useEffect(() => {
    scrollToTop()
    if (!product) return;

    const objIndex = product?.sizes?.findIndex((obj: any) => obj?.size === size);
    const selectedSize = product?.sizes?.[objIndex >= 0 ? objIndex : 0];

    setSize(selectedSize?.size);
  }, [product, size]);

  const addToCartHandler = (item?: any) => {
    const productCartItem = {
      price: item?.price,
      productImage: item?.image,
      productName: item?.name,
      productId: item?._id,
      quantity: Number(qty),
      size,
      sizes: product?.sizes,
      countInStock: product?.countInStock,
      isEcard: false,
      isProduct: true,
      isWelcomeWiener: false,
      shippingPrice: product?.shippingPrice,
    };
    dispatch(addToCart({ item: productCartItem }));
    dispatch(toggleCartDrawer(true));
  };

  return (
    <div className='py-32 min-h-[calc(100vh-475px)] px-3 max-w-screen-xl w-full mx-auto'>
      <LeftArrow text='Back To Merch' url='/merch' />
      <div className='grid grid-cols-12 gap-8 mt-3'>
        <MerchImages loading={isLoading} product={product} />
        <MerchNamePriceDescription product={product} size={size} setSize={setSize} loading={isLoading} />
        <AddToCartSection
          product={product}
          qty={qty}
          setQty={setQty}
          addToCartHandler={addToCartHandler}
          loading={isLoading}
          size={size}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
