import React, { useEffect, useState } from 'react';
import { Accordion, Col, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { getPublicProductDetails } from '../../actions/productActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Rating from '../../components/shop/Rating';
import WriteAReviewModal from '../../components/shop/WriteAReviewModal';
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
  ReviewsAndRatingsContainer,
  SelectInput,
  SelectInputContainer,
  Size,
  SizeContainer,
  WriteAReviewBtn,
} from '../../components/styles/product-details/Styles';
import { Text } from '../../components/styles/Styles';
// import ToastPopUp from '../../components/ToastPopUp';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productContstants';

const ProductDetails = ({ match }: any) => {
  const [size, setSize] = useState('');
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  // const [itemAddedToCart, setItemAddedToCart] = useState(false) as any;
  const dispatch = useDispatch();
  const productId = match.params.id;
  const [show, setShow] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const productReviewCreate = useSelector(
    (state: any) => state.productReviewCreate
  );
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate !== undefined && productReviewCreate;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      handleClose();
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(getPublicProductDetails(productId));
  }, [dispatch, productId, successProductReview]);

  const addToCartHandler = (item: any) => {
    if (size !== '' || !['Shirts', 'Sweatshirts'].includes(product.category)) {
      dispatch(addToCart(item._id, qty, size));
      // setItemAddedToCart(true);
    } else setMessage('Select Size');
  };

  const sizes = () => ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <>
      <WriteAReviewModal
        show={show}
        handleClose={handleClose}
        productId={productId}
        rating={rating}
        comment={comment}
        errorProductReview={errorProductReview}
        userInfo={userInfo}
        setComment={setComment}
        setRating={setRating}
        loading={loadingProductReview}
      />
      {/* {itemAddedToCart && (
        <ToastPopUp
          userInfo={userInfo}
          message='Cart'
          setMessage={setMessage}
          itemAddedToCart={itemAddedToCart}
          setItemAddedToCart={setItemAddedToCart}
        />
      )} */}

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
              <Rating
                value={product?.rating}
                text={`(${product?.numReviews})`}
              />
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
                          bold='bold'
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
                      {[...Array(10).keys()].map((x) => (
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
          <ReviewsAndRatingsContainer>
            <Col className='d-flex flex-column mt-5 column'>
              <Text
                fontFamily='Roboto Condensed'
                fontSize='1.7rem'
                className='mt-5 mb-4'
              >
                Ratings & Reviews
              </Text>
              <div className='mb-3'>
                {product?.reviews?.length === 0 && (
                  <div>There are currently no reviews</div>
                )}
              </div>
              <div className='mb-5'>
                {product?.reviews?.map((review: any) => (
                  <div className='d-flex mb-5' key={review?._id}>
                    <Col lg={2}>
                      <Text
                        marginBottom='1rem'
                        fontFamily='Roboto Condensed'
                        fontSize='1.25rem'
                      >
                        {review?.name}
                      </Text>
                    </Col>
                    <Col md={6}>
                      <div>
                        <div className='d-flex align-items-center'>
                          <Rating value={review.rating} />
                          <div>
                            {' '}
                            {`- ${new Date(review?.createdAt)
                              .toString()
                              .substring(4, 16)}`}
                          </div>
                        </div>

                        <p className='mb-0'>{review?.comment}</p>
                      </div>
                    </Col>
                  </div>
                ))}
              </div>
              <WriteAReviewBtn onClick={() => handleShow()}>
                Write A Review
              </WriteAReviewBtn>
            </Col>
          </ReviewsAndRatingsContainer>
        </>
      )}
    </>
  );
};

export default ProductDetails;
