import { useEffect } from 'react';
import {
  FormFile,
  FormInnerContainer,
  FormLeftContainer,
  FormRightContainer,
  UploadImageSquare,
} from '../styles/admin/Styles';
import { Form, Image } from 'react-bootstrap';
import { ErrorText, Text, UpdateBtn } from '../styles/Styles';
import PhotoUploadIcon from '../svg/PhotoUploadIcon';
import UploadImg from '../assets/upload.png';
import WelcomeWienerProduct from '../welcome-wiener/WelcomeWienerProduct';
import { useDispatch, useSelector } from 'react-redux';
import { listWelcomeWienerProducts } from '../../actions/welcomeWienerProductActions';
import styled from 'styled-components';

const AssociatedProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const CreateEditWelcomeWienerDachshundForm = ({
  inputs,
  handleInput,
  file,
  uploading,
  onSubmit,
  submitBtnText,
  setInputs,
  errors,
  handleBlur,
  handleFileInputChange,
}: any) => {
  const dispatch = useDispatch();

  const {
    welcomeWienerProductList: { productList },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listWelcomeWienerProducts());
  }, [dispatch]);

  return (
    <Form className='px-3'>
      <FormInnerContainer>
        <FormLeftContainer>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              type='text'
              value={inputs.name || ''}
              onChange={handleInput}
              onBlur={handleBlur}
            ></Form.Control>
            <ErrorText>{errors?.name}</ErrorText>
          </Form.Group>

          <Form.Group controlId='age' className='mt-3'>
            <Form.Label>Age</Form.Label>
            <Form.Control
              name='age'
              type='number'
              value={inputs.age || ''}
              onChange={handleInput}
              onBlur={handleBlur}
            ></Form.Control>
            <ErrorText>{errors?.age}</ErrorText>
          </Form.Group>
          <Form.Group controlId='bio' className='mt-3'>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              name='bio'
              as='textarea'
              rows={6}
              type='text'
              value={inputs.bio || ''}
              onChange={handleInput}
              onBlur={handleBlur}
            ></Form.Control>
            <ErrorText>{errors?.bio}</ErrorText>
          </Form.Group>

          <Form.Group controlId='displayUrl' className='d-flex flex-column'>
            <Form.Label>Image</Form.Label>
            <FormFile
              name='displayUrl'
              id='image-file'
              label={
                file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={inputs?.displayUrl || UploadImg}
                    width='100px'
                    height='100px'
                    style={{ objectFit: 'cover' }}
                    alt='Welcome Wiener Dachshund'
                  />
                )
              }
              onChange={(e: any) => handleFileInputChange(e)}
              onBlur={handleBlur}
            ></FormFile>
            <ErrorText>{errors?.displayUrl}</ErrorText>
          </Form.Group>
          <Form.Group controlId='associatedProducts' className='mt-3'>
            <Form.Label>Associated Products</Form.Label>
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
          </Form.Group>
        </FormLeftContainer>
        <FormRightContainer>
          <Form.Label>Welcome Wiener Products</Form.Label>
          {productList?.length === 0 ? (
            <Text>You need to create a welcome wiener product</Text>
          ) : (
            productList?.map((obj: any, i: number) => (
              <WelcomeWienerProduct
                product={obj}
                key={i}
                setInputs={setInputs}
                inputs={inputs}
              />
            ))
          )}
        </FormRightContainer>
      </FormInnerContainer>
      <UpdateBtn onClick={onSubmit}>
        {submitBtnText}
        {uploading ? 'ing...' : 'e'}
      </UpdateBtn>
    </Form>
  );
};

export default CreateEditWelcomeWienerDachshundForm;
