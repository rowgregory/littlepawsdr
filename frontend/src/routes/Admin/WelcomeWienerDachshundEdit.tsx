import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, FormGroup, FormLabel } from '../../components/styles/admin/Styles';
import { WELCOME_WIENER_DACHSHUND_UPDATE_RESET } from '../../constants/welcomeWienerDachshundConstants';
import {
  createWelcomeWienerDachshund,
  updateWelcomeWienerDachshund,
} from '../../actions/welcomeWienerDachshundActions';
import useWelcomeWienerDachshundForm from '../../utils/hooks/useWelcomeWienerDachshundForm';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';
import { listWelcomeWienerProducts } from '../../actions/welcomeWienerProductActions';
import WelcomeWienerDachshundLayout from '../../components/dashboard/dashboard2024/layouts/WelcomeWienerDachshundLayout';
import { ErrorText, Flex, Text, UpdateBtn } from '../../components/styles/Styles';
import { Spinner } from 'react-bootstrap';
import MultipleImages from '../../components/admin/products/MultipleImages';
import WelcomeWienerProduct from '../../components/welcome-wiener/WelcomeWienerProduct';

const AssociatedProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const WelcomeWienerDachshundEdit = () => {
  const {
    state: { dachshund, isEditMode },
  } = useLocation() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]) as any;
  const state = useSelector((state: any) => state);

  const loadingUpdate = state.welcomeWienerDachshundUpdate.loading;
  const successUpdate = state.welcomeWienerDachshundUpdate.success;
  const errorUpdate = state.welcomeWienerDachshundUpdate.error;

  const loadingCreate = state.welcomeWienerDachshundCreate.loading;
  const successCreate = state.welcomeWienerDachshundCreate.success;
  const errorCreate = state.welcomeWienerDachshundCreate.error;

  const productList = state.welcomeWienerProductList.productList;

  const updateWelcomeWienerDachshundCallback = async () => {
    setUploading(true);

    const imageUrls = await uploadMultipleFilesToFirebase(files);

    const updatedImages = [...inputs.images, ...imageUrls.filter(Boolean)];

    if (isEditMode) {
      dispatch(
        updateWelcomeWienerDachshund({
          _id: dachshund?._id,
          name: inputs?.name,
          bio: inputs?.bio,
          age: inputs?.age,
          displayUrl: updatedImages[0],
          associatedProducts: inputs?.associatedProducts,
          images: updatedImages,
        })
      );
    } else {
      dispatch(
        createWelcomeWienerDachshund({
          name: inputs?.name,
          bio: inputs?.bio,
          age: inputs?.age,
          displayUrl: imageUrls[0],
          associatedProducts: inputs?.associatedProducts?.map((obj) => obj?._id),
          images: imageUrls.filter(Boolean),
        })
      );
    }
  };

  useEffect(() => {
    if (successUpdate || successCreate) {
      history('/admin/welcome-wiener/dachshund/list');
      dispatch({ type: WELCOME_WIENER_DACHSHUND_UPDATE_RESET });
    } else {
      dispatch(listWelcomeWienerProducts());
    }
  }, [dispatch, history, successCreate, successUpdate]);

  const { onSubmit, handleInput, handleBlur, inputs, errors, addToAssociatedProducts, setInputs } =
    useWelcomeWienerDachshundForm(updateWelcomeWienerDachshundCallback, dachshund);

  return (
    <WelcomeWienerDachshundLayout
      error={errorUpdate || errorCreate}
      box1={
        <Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
          Welcome Wiener Dachshund {isEditMode ? 'Edit' : 'Create'}
        </Text>
      }
      box2={<GoBackBtn to='/admin/welcome-wiener/dachshund/list' color='#121212' />}
      box3={
        loadingUpdate || loadingCreate ? (
          <Spinner animation='border' size='sm' />
        ) : (
          errorUpdate ||
          (errorCreate && (
            <Text fontFamily='Rust' fontSize='20px'>
              {errorUpdate || errorCreate}
            </Text>
          ))
        )
      }
      box4={
        <>
          <MultipleImages
            handleInput={handleInput}
            setFiles={setFiles}
            files={files}
            uploading={uploading}
            inputs={inputs}
            setInputs={setInputs}
          />
          <ErrorText>{errors?.images}</ErrorText>
        </>
      }
      box5={
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
      box6={
        <FormGroup controlId='age'>
          <FormLabel>Age</FormLabel>
          <FormControl
            name='age'
            type='number'
            value={inputs.age || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></FormControl>
          <ErrorText>{errors?.age}</ErrorText>
        </FormGroup>
      }
      box7={
        <FormGroup controlId='bio'>
          <FormLabel>Bio</FormLabel>
          <FormControl className='p-3'
            name='bio'
            as='textarea'
            rows={6}
            value={inputs.bio || ''}
            onChange={handleInput}
          ></FormControl>
          <ErrorText>{errors?.bio}</ErrorText>
        </FormGroup>
      }
      box8={
        <FormGroup controlId='associatedProducts'>
          <FormLabel>Associated Products</FormLabel>
          <AssociatedProductsContainer>
            {inputs?.associatedProducts?.length === 0 ? (
              <Text p='8px 14px'>
                Click a welcome wiener product to associate it with{' '}
                {inputs?.name !== '' ? inputs?.name : 'this wiener'}.
              </Text>
            ) : (
              inputs?.associatedProducts?.map((product: any, i: number) => (
                <Text p='4px 14px' key={i}>
                  {product?.name}
                </Text>
              ))
            )}
          </AssociatedProductsContainer>
          <ErrorText>{errors?.associatedProducts}</ErrorText>
        </FormGroup>
      }
      box9={
        <Flex flexDirection='column'>
          <FormLabel>Welcome Wiener Products</FormLabel>
          {productList?.length === 0 ? (
            <Text>You need to create a welcome wiener product</Text>
          ) : (
            productList?.map((obj: any, i: number) => (
              <WelcomeWienerProduct
                key={i}
                product={obj}
                inputs={inputs}
                addToAssociatedProducts={addToAssociatedProducts}
              />
            ))
          )}
        </Flex>
      }
      box10={
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      }
    />
  );
};

export default WelcomeWienerDachshundEdit;
