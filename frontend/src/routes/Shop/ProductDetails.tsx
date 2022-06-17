import React, { useEffect, useState } from 'react';
import { Accordion, Col, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { getPublicProductDetails } from '../../actions/productActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  AddToCartBtn,
  CollapseOnMobile,
  DetailsBtn,
  DetailsContainer,
  HorizontalLine,
  PlusMinusBtn,
  ProductDetailsContainer,
  ProductPrice,
  Quantity,
  SelectInput,
  SelectInputContainer,
  Size,
  SizeContainer,
} from '../../components/styles/product-details/Styles';
import { Text } from '../../components/styles/Styles';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';
import { CART_ADD_ITEM_RESET } from '../../constants/cartConstants';

const ProductDetails = ({ match }: any) => {
  const [size, setSize] = useState('');
  const [qty, setQty] = useState<number>(1);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const productId = match.params.id;
  const [collapse, setCollapse] = useState(false);

  const cart = useSelector((state: any) => state.cart);
  const { loading: loadingCart, success: itemAddedToCartSuccess } = cart;

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
    if (itemAddedToCartSuccess) {
      toaster.notify(
        ({ onClose }) => ToastAlert('Item Added To Cart', onClose, 'success'),
        { position: 'top' }
      );

      setTimeout(() => dispatch({ type: CART_ADD_ITEM_RESET }), 5000);
    }
  }, [cart.cartItems, dispatch, itemAddedToCartSuccess]);

  const addToCartHandler = (item: any) => {
    if (size !== '' || !['Shirts', 'Sweatshirts'].includes(product.category)) {
      dispatch(addToCart(item._id, qty, size));
    } else setMessage('Select Size');
  };

  const sizes = () => ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <>
      {loadingProductPublicDetails ? (
        <Loader />
      ) : errorProductPublicDetails ? (
        <Message variant='danger'>{errorProductPublicDetails}</Message>
      ) : (
        <>
          <ProductDetailsContainer>
            <CollapseOnMobile xl={1} lg={1} md={1}></CollapseOnMobile>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col xl={4} lg={4} md={6} sm={12}>
              <Text fontSize='1.75rem'>{product?.name}</Text>
              <ProductPrice>${product?.price}</ProductPrice>
              {product?.isLimitedProduct && (
                <Text>LIMITED AMOUNT OF PRODUCTS</Text>
              )}
              <HorizontalLine></HorizontalLine>
              <SizeContainer
                show={['Shirts', 'Sweatshirts'].includes(product.category)}
              >
                {sizes().map((s, i) => (
                  <Size active={s === size} onClick={() => setSize(s)} key={i}>
                    {s}
                  </Size>
                ))}
              </SizeContainer>
              <Accordion
                defaultActiveKey='0'
                className='d-flex justify-content-center'
              >
                <div className='w-100 mx-auto'>
                  <Accordion.Toggle
                    className='d-flex border-0 bg-transparent w-100'
                    eventKey='1'
                    onClick={() => setCollapse(!collapse)}
                  >
                    <div className='d-flex w-100 justify-content-between align-items-center mb-4'>
                      <DetailsBtn>Details & Material</DetailsBtn>
                      <PlusMinusBtn active={collapse} className='plus-minus'>
                        <i
                          className={`fas fa-${collapse ? 'minus' : 'plus'}`}
                        ></i>
                      </PlusMinusBtn>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='1'>
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                      <DetailsContainer>
                        <Text
                          textAlign='center'
                          fontWeight='bold'
                          fontSize='1.25rem'
                          marginBottom='2rem'
                        >
                          Details
                        </Text>
                        <Text>{product?.description}</Text>
                      </DetailsContainer>
                    </div>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              {message && size === '' && (
                <Message variant='danger'>{message}</Message>
              )}
              <div className='d-flex w-100 justify-content-between'>
                {product?.countInStock > 0 && (
                  <SelectInputContainer>
                    <Quantity>QTY</Quantity>
                    <SelectInput
                      as='select'
                      value={qty}
                      onChange={(e: any) => setQty(parseInt(e.target.value))}
                    >
                      {[
                        ...Array(
                          product.isLimitedProduct ? product.countInStock : 10
                        ).keys(),
                      ].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </SelectInput>
                  </SelectInputContainer>
                )}
                <AddToCartBtn
                  disabled={product?.countInStock === 0}
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
              </div>
            </Col>
          </ProductDetailsContainer>
        </>
      )}
    </>
  );
};

export default ProductDetails;
