import React, { useEffect, useState } from 'react';
import { Col, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { addToCart } from '../../actions/cartActions';
import { getPublicProductDetails } from '../../actions/productActions';
import Message from '../../components/Message';
import {
  AddToCartBtn,
  HorizontalLine,
  ProductDetailsContainer,
  Quantity,
  SelectInput,
  SelectInputContainer,
  ThirdColumnWrapper,
} from '../../components/styles/product-details/Styles';
import { Text } from '../../components/styles/Styles';
import { LoadingImg } from '../../components/LoadingImg';

const ProductDetails = ({ match }: any) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const [qty, setQty] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [size, setSize] = useState('');
  const [outOfStock, setOutOfStock] = useState(false);

  const cart = useSelector((state: any) => state.cart);
  const { loading: loadingCart } = cart;

  const productPublicDetails = useSelector(
    (state: any) => state.productPublicDetails
  );
  const {
    loading: loadingProductPublicDetails,
    error: errorProductPublicDetails,
    product,
  } = productPublicDetails;

  useEffect(() => {
    dispatch(getPublicProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    const objIndex = product?.sizes?.findIndex(
      (obj: any) => obj?.size === size
    );

    if (objIndex !== undefined) {
      if (product?.sizes?.length > 0) {
        if (product?.sizes[objIndex]?.amount === 0) {
          setOutOfStock(true);
        } else setOutOfStock(false);
      } else if (product?.countInStock === 0) {
        setOutOfStock(true);
      } else setOutOfStock(false);
    }
  }, [product, size]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0)
      setSize(product?.sizes[0]?.size);
  }, [product]);

  const addToCartHandler = (item?: any) => {
    dispatch(addToCart(item?._id, qty, size, product?.sizes));
    toaster.notify(
      ({ onClose }) => ToastAlert('Item added to cart', onClose, 'success'),
      { position: 'bottom' }
    );
  };

  return (
    <>
      {errorProductPublicDetails ? (
        <Message variant='danger'>{errorProductPublicDetails}</Message>
      ) : (
        <ProductDetailsContainer>
          <Col className='d-flex justify-content-center'>
            {loadingProductPublicDetails ? (
              <LoadingImg w='100%' h='100%' />
            ) : (
              <Image
                src={product?.image}
                alt={product?.name}
                fluid
                width='100%'
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                }}
              />
            )}
          </Col>
          <Col>
            {loadingProductPublicDetails ? (
              <LoadingImg />
            ) : (
              <>
                <Text fontSize='1.75rem'>{product?.name}</Text>
                <HorizontalLine margin='0 0 1rem 0' />
                <div className='d-flex'>
                  <div style={{ position: 'relative' }}>
                    <Text style={{ position: 'absolute', top: '6px' }}>$</Text>
                  </div>
                  <Text
                    marginLeft='0.7rem'
                    fontWeight='bold'
                    fontSize='2rem'
                    style={{ position: 'relative' }}
                    marginBottom='0.8rem'
                  >
                    {product?.price?.toString()?.split('.')[0]}
                    <sup
                      style={{
                        fontWeight: '500',
                        fontSize: '0.8rem',
                        top: '-15px',
                      }}
                    >
                      {product?.price?.toString()?.split('.')[1]}
                    </sup>
                  </Text>
                </div>
                {message && (
                  <Message variant='success'>
                    {message} <span onClick={() => setMessage('')}>X</span>
                  </Message>
                )}
                {product?.sizes?.length !== 0 && (
                  <SelectInputContainer
                    style={{
                      width: '84px',
                      border: 0,
                      marginBottom: '1rem',
                    }}
                  >
                    <Quantity>Size</Quantity>
                    <SelectInput
                      value={size}
                      as='select'
                      onChange={(e: any) => setSize(e.target.value)}
                    >
                      {product?.sizes?.map((x: any, i: number) => (
                        <option key={i} value={x?.size}>
                          {x.size}
                        </option>
                      ))}
                    </SelectInput>
                  </SelectInputContainer>
                )}
                <HorizontalLine margin='0 0 1rem 0' />
                <Text fontWeight='bold'>About this item</Text>
                <ul className='pl-4'>
                  {product?.description
                    ?.split('|')
                    .map((item: any, i: number) => (
                      <Text key={i}>
                        <li>{item}</li>
                      </Text>
                    ))}
                </ul>
              </>
            )}
          </Col>
          <Col>
            {loadingProductPublicDetails ? (
              <LoadingImg w='100%' />
            ) : (
              <ThirdColumnWrapper>
                <div className='d-flex'>
                  <div style={{ position: 'relative' }}>
                    <Text style={{ position: 'absolute', top: '6px' }}>$</Text>
                  </div>
                  <Text
                    marginLeft='0.7rem'
                    fontWeight='bold'
                    fontSize='2rem'
                    style={{ position: 'relative' }}
                    marginBottom='0.8rem'
                  >
                    {product?.price?.toString()?.split('.')[0]}
                    <sup
                      style={{
                        fontWeight: '500',
                        fontSize: '0.8rem',
                        top: '-15px',
                      }}
                    >
                      {product?.price?.toString()?.split('.')[1]}
                    </sup>
                  </Text>
                </div>
                <Text
                  color={outOfStock ? 'red' : '#007600'}
                  fontSize='1.5rem'
                  fontWeight='500'
                  fontFamily='Duru Sans'
                  marginBottom='0.2rem'
                  style={{
                    textRendering: 'optimizeLegibility',
                    lineHeight: '24px',
                  }}
                >
                  {outOfStock ? 'Not In stock' : 'In stock'}
                </Text>
                {!outOfStock && (
                  <>
                    <Text marginBottom='1rem' fontWeight='400'>
                      Usually ships within 4 to 5 days
                    </Text>

                    <SelectInputContainer
                      style={{
                        width: '84px',
                        border: 0,
                        marginBottom: '0.75rem',
                      }}
                    >
                      <Quantity>Qty</Quantity>
                      <SelectInput
                        value={qty}
                        as='select'
                        onChange={(e: any) => setQty(e.target.value)}
                      >
                        {[
                          ...Array(
                            product?.sizes?.length > 0
                              ? product?.sizes?.filter(
                                  (item: any) => item?.size === size
                                )[0]?.amount
                              : product.countInStock
                          ).keys(),
                        ].map((x: any, i: number) => (
                          <option key={i} value={x?.amount}>
                            {x + 1}
                          </option>
                        ))}
                      </SelectInput>
                    </SelectInputContainer>
                  </>
                )}
                <AddToCartBtn
                  disabled={outOfStock}
                  onClick={() => addToCartHandler(product)}
                >
                  {loadingCart ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    'Add To Cart'
                  )}
                </AddToCartBtn>
              </ThirdColumnWrapper>
            )}
          </Col>
        </ProductDetailsContainer>
      )}
    </>
  );
};

export default ProductDetails;
