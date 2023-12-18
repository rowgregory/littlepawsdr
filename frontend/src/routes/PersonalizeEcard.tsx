import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicProductDetails } from '../actions/productActions';
import styled from 'styled-components';
import EcardForm from '../components/forms/EcardForm';
import { validatePersonalize } from '../utils/validateECardCheckout';
import { v4 as uuidv4 } from 'uuid';
import { addProductToCart, openCartDrawer } from '../actions/cartActions';
import { Image } from 'react-bootstrap';
import { Text } from '../components/styles/Styles';
import { LoadingImg } from '../components/LoadingImg';
import Message from '../components/Message';
import CartDrawer from '../components/CartDrawer';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  margin-top: 75px;
  margin-bottom: 25px;
  padding-top: 14px;
  padding-inline: 16px;
  max-width: 1110px;
  width: 100%;
  margin-inline: auto;
`;
const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    grid-template-columns: 1fr 1fr;
  }
`;

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

const EcardImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1/1;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 79%;
  }
`;

const PersonalizeEcard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [errors, setErrors] = useState({}) as any;

  const state = useSelector((state: any) => state);

  let loading = state.productPublicDetails.loading;
  const error = state.productPublicDetails.error;

  const ecard = state.productPublicDetails.product?.product;

  let formIsValid: boolean = false;

  useEffect(() => {
    dispatch(getPublicProductDetails(id));
  }, [dispatch, id]);

  const personalizeCallback = () => {
    const isValid = validatePersonalize(setErrors, inputs, formIsValid);

    if (isValid) {
      addToCartHandler(ecard);
    }
  };

  const { inputs, handleInput, onSubmit } = useECardForm(personalizeCallback);

  const addToCartHandler = (item?: any) => {
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
      category: item.category,
    };
    dispatch(addProductToCart(ecardCartItem));
    dispatch(openCartDrawer(true));
  };

  return (
    <Container>
      <CartDrawer />
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Text fontSize='30px' fontWeight={300} marginBottom='24px'>
            Personalize your Ecard
          </Text>
          <InnerContainer>
            <EcardForm
              inputs={inputs}
              handleInputChange={handleInput}
              errors={errors}
              formIsValid={formIsValid}
              setErrors={setErrors}
              onSubmit={onSubmit}
            />
            {loading ? (
              <LoadingImg w='100%' />
            ) : (
              <EcardImage src={ecard?.image} alt={ecard?.name} />
            )}
          </InnerContainer>
        </>
      )}
    </Container>
  );
};

export default PersonalizeEcard;
