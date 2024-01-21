import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, openCartDrawer } from '../../actions/cartActions';
import { getPublicProductDetails } from '../../actions/productActions';
import {
  Container,
  InnerContainer,
} from '../../components/styles/product-details/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import MerchImages from '../../components/merch-detail/MerchImages';
import MerchNamePriceDescription from '../../components/merch-detail/MerchNamePriceDescription';
import AddToCartSection from '../../components/merch-detail/AddToCartSection';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const productId = id;
  const dispatch = useDispatch();
  const [qty, setQty] = useState<number>(1);
  const [size, setSize] = useState('');
  const [outOfStock, setOutOfStock] = useState(false);

  const state = useSelector((state: any) => state);
  const loading = state.productPublicDetails.loading;
  const productDetails = state.productPublicDetails.product;
  const product = productDetails?.product;

  useEffect(() => {
    dispatch(getPublicProductDetails(productId));
    dispatch(openCartDrawer(false));
  }, [dispatch, productId]);

  useEffect(() => {
    if (!product) return;

    const objIndex = product?.sizes?.findIndex(
      (obj: any) => obj?.size === size
    );
    const selectedSize = product?.sizes?.[objIndex >= 0 ? objIndex : 0];
    const productAmount = selectedSize?.amount;

    setSize(selectedSize?.size);

    if (
      productAmount === 0 ||
      product?.countInStock === 0 ||
      product?.countInStock === null
    ) {
      setOutOfStock(true);
    } else {
      setOutOfStock(false);
    }
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
      isEcard: false,
      countInStock: product?.countInStock,
      isPhysicalProduct: true,
      shippingPrice: product?.shippingPrice,
    };
    dispatch(addProductToCart(productCartItem));
    dispatch(openCartDrawer(true));
  };

  return (
    <Container>
      <LeftArrow text='Back To Merch' url='/merch' />
      <InnerContainer>
        <MerchImages loading={loading} product={product} />
        <MerchNamePriceDescription
          product={product}
          size={size}
          setSize={setSize}
          loading={loading}
        />
        <AddToCartSection
          product={product}
          outOfStock={outOfStock}
          qty={qty}
          setQty={setQty}
          size={size}
          addToCartHandler={addToCartHandler}
          loading={loading}
        />
      </InnerContainer>
    </Container>
  );
};

export default ProductDetails;
