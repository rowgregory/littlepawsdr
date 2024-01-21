import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, FormGroup, FormLabel } from '../../components/styles/admin/Styles';
import {
  createWelcomeWienerProduct,
  updateWelcomeWienerProduct,
} from '../../actions/welcomeWienerProductActions';
import {
  WELCOME_WIENER_PRODUCT_CREATE_RESET,
  WELCOME_WIENER_PRODUCT_UPDATE_RESET,
} from '../../constants/welcomeWienerProductConstants';
import useWelcomeWienerProductForm from '../../utils/hooks/useWelcomeWienerProductForm';
import GoBackBtn from '../../utils/GoBackBtn';
import WelcomeWienerProductEditCreateLayout from '../../components/dashboard/dashboard2024/layouts/WelcomeWienerProductEditCreateLayout';
import { ErrorText, Flex, Text, UpdateBtn } from '../../components/styles/Styles';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const IconsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
`;

const IconContainer = styled.span`
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const WelcomeWienerProductEdit = () => {
  const {
    state: { product, isEditMode },
  } = useLocation() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  const loadingUpdate = state.welcomeWienerProductUpdate.loading;
  const successUpdate = state.welcomeWienerProductUpdate.success;
  const errorUpdate = state.welcomeWienerProductUpdate.error;

  const loadingCreate = state.welcomeWienerProductCreate.loading;
  const successCreate = state.welcomeWienerProductCreate.success;
  const errorCreate = state.welcomeWienerProductCreate.error;

  const updateWelcomeWienerProductCallback = async () => {
    if (isEditMode) {
      dispatch(
        updateWelcomeWienerProduct({
          _id: product?._id,
          name: inputs?.name,
          description: inputs?.description,
          price: inputs?.price,
          icon: inputs?.icon,
        })
      );
    } else {
      dispatch(
        createWelcomeWienerProduct({
          name: inputs?.name,
          description: inputs?.description,
          price: inputs?.price,
          icon: inputs.icon,
        })
      );
    }
  };

  useEffect(() => {
    if (successUpdate || successCreate) {
      history('/admin/welcome-wiener/product/list');
      dispatch({ type: WELCOME_WIENER_PRODUCT_UPDATE_RESET });
      dispatch({ type: WELCOME_WIENER_PRODUCT_CREATE_RESET });
    }
  }, [dispatch, history, successUpdate, successCreate]);

  const { onSubmit, handleInput, handleBlur, inputs, errors, setInputs } = useWelcomeWienerProductForm(
    updateWelcomeWienerProductCallback,
    product
  );

  const iconArr = [
    {
      icon: <i className='fa-solid fa-bowl-food fa-xl'></i>,
      iconClassName: 'fa-solid fa-bowl-food',
      textKey: 'Food and Treats',
    },
    {
      icon: <i className='fa-solid fa-staff-snake fa-xl'></i>,
      iconClassName: 'fa-solid fa-staff-snake',
      textKey: 'Health and Wellness',
    },
    {
      icon: <i className='fa-regular fa-hospital fa-xl'></i>,
      iconClassName: 'fa-regular fa-hospital',
      textKey: 'Hospital Visits',
    },
    {
      icon: <i className='fa-solid fa-car-side fa-xl'></i>,
      iconClassName: 'fa-solid fa-car-side',
      textKey: 'Travel and Outdoors',
    },
    {
      icon: <i className='fa-solid fa-volleyball fa-xl'></i>,
      iconClassName: 'fa-solid fa-volleyball',
      textKey: 'Toys',
    },
  ];

  return (
    <WelcomeWienerProductEditCreateLayout
      error={errorUpdate || errorCreate}
      box1={
        <Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
          Welcome Wiener Product {isEditMode ? 'Edit' : 'Create'}
        </Text>
      }
      box2={<GoBackBtn to='/admin/welcome-wiener/product/list' color='#121212' />}
      box3={
        loadingUpdate || loadingCreate ? (
          <Spinner animation='border' size='sm' />
        ) : (
          (errorUpdate || errorCreate) && (
            <Text fontFamily='Rust' fontSize='20px'>
              {errorUpdate || errorCreate}
            </Text>
          )
        )
      }
      box4={
        <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl
            name='name'
            type='text'
            value={inputs.name || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></FormControl>
          <ErrorText>{errors?.name}</ErrorText>
        </FormGroup>
      }
      box5={
        <FormGroup controlId='price'>
          <FormLabel>Price</FormLabel>
          <FormControl
            name='price'
            type='number'
            value={inputs.price || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></FormControl>
          <ErrorText>{errors?.price}</ErrorText>
        </FormGroup>
      }
      box6={
        <FormGroup controlId='description'>
          <FormLabel>Description</FormLabel>
          <FormControl
            className='p-3'
            name='description'
            as='textarea'
            rows={6}
            value={inputs.description || ''}
            onChange={handleInput}
          ></FormControl>
          <ErrorText>{errors?.description}</ErrorText>
        </FormGroup>
      }
      box7={
        <FormGroup>
          <FormLabel>Welcome Wiener Product</FormLabel>
          <IconsWrapper>
            {iconArr.map((item, index) => (
              <Flex
                key={index}
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                background={inputs.icon === item.iconClassName ? '#ededed' : '#fff'}
                style={{
                  aspectRatio: '1/1',
                  width: '100px',
                  height: '100px',
                }}
                onClick={() =>
                  setInputs((inputs: any) => ({
                    ...inputs,
                    icon: item.iconClassName,
                  }))
                }
              >
                <IconContainer>{item.icon}</IconContainer>
                <Text fontSize='13px' textAlign='center'>
                  {item.textKey}
                </Text>
              </Flex>
            ))}
            <ErrorText>{errors?.icon}</ErrorText>
          </IconsWrapper>
        </FormGroup>
      }
      box8={
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      }
    />
  );
};

export default WelcomeWienerProductEdit;
