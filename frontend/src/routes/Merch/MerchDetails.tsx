import { useEffect, useState } from 'react';
import { Col, Image, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, openCartDrawer } from '../../actions/cartActions';
import { getPublicProductDetails } from '../../actions/productActions';
import Message from '../../components/Message';
import {
  AddToCartBtn,
  HorizontalLine,
  PriceContainer,
  ProductDetailsContainer,
  Quantity,
  SelectInput,
  SelectInputContainer,
  ThirdColumnWrapper,
} from '../../components/styles/product-details/Styles';
import { Text } from '../../components/styles/Styles';
import { LoadingImg } from '../../components/LoadingImg';
import LeftArrow from '../../components/svg/LeftArrow';
import CartDrawer from '../../components/CartDrawer';
import { ProceedBtn } from '../../components/forms/ShippingForm';
import EcardForm from '../../components/forms/EcardForm';
import { validatePersonalize } from '../../utils/validateECardCheckout';
import { Content } from '../../components/ContinueSessionModal';
import { v4 as uuidv4 } from 'uuid';

const useECardForm = (cb: any) => {
  const [inputs, setInputs] = useState({
    recipientsFullName: '',
    recipientsEmail: '',
    dateToSend: '',
    message: '',
  });

  const handleInput = (event: any) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { handleInput, inputs, onSubmit };
};

const ProductDetails = ({ match }: any) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const [qty, setQty] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [size, setSize] = useState('');
  const [outOfStock, setOutOfStock] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [errors, setErrors] = useState({}) as any;
  const [scaleImage, setScaleImage] = useState({ isScaled: false, id: '' });

  const state = useSelector((state: any) => state);

  const loadingCart = state.cart.loading;

  const loading = state.productPublicDetails.loading;
  const error = state.productPublicDetails.error;
  const productDetails = state.productPublicDetails.product;

  const product = productDetails?.product;
  const isEcard = productDetails?.isEcard;

  let formIsValid: boolean = false;

  const personalizeCallback = () => {
    const isValid = validatePersonalize(setErrors, inputs, formIsValid);

    if (isValid) {
      addToCartHandler(product);
    }
  };

  const { inputs, handleInput, onSubmit } = useECardForm(personalizeCallback);

  useEffect(() => {
    dispatch(getPublicProductDetails(productId));
    dispatch(openCartDrawer(false));
  }, [dispatch, productId]);

  useEffect(() => {
    const isProduct = product !== undefined && Object.keys(product).length > 0;

    if (isProduct) {
      const objIndex = product?.sizes?.findIndex(
        (obj: any) => obj?.size === size
      );
      const productAmount =
        product?.sizes?.[objIndex >= 0 ? objIndex : 0]?.amount;

      setSize(product?.sizes?.[objIndex >= 0 ? objIndex : 0]?.size);

      if (productAmount === 0) return setOutOfStock(true);
      if (productAmount >= 1) return setOutOfStock(false);
    }
    if (
      product?.countInStock === 0 ||
      product?.countInStock === null ||
      product?.counInStock === undefined
    )
      return setOutOfStock(true);
    if (product?.countInStock >= 1) return setOutOfStock(false);
  }, [product, size]);

  const addToCartHandler = (item?: any) => {
    if (isEcard) {
      const ecardCartItem = {
        price: item?.price,
        productImage: item?.image,
        productName: item?.name,
        productId: uuidv4(),
        quantity: 1,
        isEcard: true,
        recipientsFullName: inputs.recipientsFullName,
        recipientsEmail: inputs.recipientsEmail,
        dateToSend: inputs.dateToSend,
        message: inputs.message,
        isPhysicalProduct: false,
        subtotal: item.price,
        totalPrice: item.price,
        shippingPrice: 0,
      };
      dispatch(addProductToCart(ecardCartItem));
      dispatch(openCartDrawer(true));
      setEditForm(false);
    } else {
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
    }
  };

  if (error) return <Message variant='danger'>{error}</Message>;

  return (
    <div
      style={{
        padding: '128px 16px',
        maxWidth: '1400px',
        marginInline: 'auto',
        width: '100%',
      }}
    >
      <CartDrawer />
      <LeftArrow text='Back To Merch' url='/merch' />
      <ProductDetailsContainer>
        {!loading ? (
          <div style={{ overflow: 'hidden', marginBottom: '32px' }}>
            <Image
              src={scaleImage?.id || product?.image}
              style={{
                maxWidth: '700px',
                width: '100%',
                objectFit: 'cover',
                aspectRatio: '1/1',
              }}
            />
            <div
              style={{
                marginTop: '24px',
                display: 'flex',
                gap: '8px',
                overflowX: 'scroll',
              }}
            >
              {product?.images?.map((img: any, i: number) => (
                <Image
                  onClick={() =>
                    setScaleImage({ isScaled: !scaleImage.isScaled, id: img })
                  }
                  key={i}
                  width='150px'
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                  }}
                  src={img}
                />
              ))}
            </div>
          </div>
        ) : (
          <LoadingImg w='100%' mw='700px' />
        )}

        <Col>
          <Text fontSize='28px' fontWeight={400}>
            {product?.name}
          </Text>
          <HorizontalLine margin='0 0 1rem 0' />
          <PriceContainer>
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
          </PriceContainer>
          {message && (
            <Message variant='success'>
              {message} <span onClick={() => setMessage('')}>X</span>
            </Message>
          )}
          {product?.sizes?.length !== 0 && !isEcard && (
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
          {!isEcard && (
            <>
              <HorizontalLine margin='0 0 1rem 0' />
              <Text fontWeight='bold' marginBottom='16px'>
                About this item
              </Text>
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
          {loading ? (
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
              {!isEcard && (
                <Text
                  color={outOfStock ? 'red' : '#007600'}
                  fontSize='1.5rem'
                  fontWeight='500'
                  marginBottom='0.2rem'
                  style={{
                    textRendering: 'optimizeLegibility',
                    lineHeight: '24px',
                  }}
                >
                  {outOfStock ? 'Not In stock' : 'In stock'}
                </Text>
              )}
              {!outOfStock && !isEcard && (
                <>
                  <Text marginBottom='1rem' fontWeight='400'>
                    Usually ships within 4 to 5 days
                  </Text>

                  <SelectInputContainer
                    style={{
                      width: '90px',
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
                          product?.sizes?.length >= 1
                            ? product?.sizes?.filter(
                                (item: any) => item?.size === size
                              )[0]?.amount === -1
                              ? 0
                              : product?.sizes?.filter(
                                  (item: any) => item?.size === size
                                )[0]?.amount
                            : product?.countInStock
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
              {isEcard ? (
                <ProceedBtn onClick={() => setEditForm(!editForm)}>
                  Personalize
                </ProceedBtn>
              ) : (
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
              )}
            </ThirdColumnWrapper>
          )}
        </Col>
      </ProductDetailsContainer>
      <Modal
        show={editForm}
        centered
        onHide={() => {
          setErrors({});
          setEditForm(false);
        }}
      >
        <Content>
          <EcardForm
            inputs={inputs}
            handleInputChange={handleInput}
            errors={errors}
            formIsValid={formIsValid}
            setErrors={setErrors}
            onSubmit={onSubmit}
          />
        </Content>
      </Modal>
    </div>
  );
};

export default ProductDetails;
