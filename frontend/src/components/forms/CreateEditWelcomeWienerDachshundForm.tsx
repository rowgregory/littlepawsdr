import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { ErrorText, Text, UpdateBtn } from '../styles/Styles';
import WelcomeWienerProduct from '../welcome-wiener/WelcomeWienerProduct';
import { useDispatch, useSelector } from 'react-redux';
import { listWelcomeWienerProducts } from '../../actions/welcomeWienerProductActions';
import styled from 'styled-components';
import MultipleImages from '../admin/products/MultipleImages';

const FormInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: 1.25fr 1fr;
  }
`;
const FormLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-right: 32px;
  }
`;

const FormRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssociatedProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const CreateEditWelcomeWienerDachshundForm = ({
  inputs,
  handleInput,
  setFiles,
  files,
  uploading,
  onSubmit,
  submitBtnText,
  errors,
  handleBlur,
  addToAssociatedProducts,
  setInputs
}: any) => {
  const dispatch = useDispatch();

  const {
    welcomeWienerProductList: { productList },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listWelcomeWienerProducts());
  }, [dispatch]);

  return (
    <Form>
      <FormInnerContainer>
        <FormLeftContainer>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control style={{ border: '1px solid #ededed' }}
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
          <MultipleImages
            handleInput={handleInput}
            setFiles={setFiles}
            files={files}
            uploading={uploading}
            inputs={inputs}
            setInputs={setInputs}
          />
          <ErrorText>{errors?.images}</ErrorText>
        </FormLeftContainer>
        <FormRightContainer>
          <Form.Group controlId='associatedProducts'>
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
          <Form.Label>Welcome Wiener Products</Form.Label>
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
        </FormRightContainer>
      </FormInnerContainer>
      <UpdateBtn onClick={onSubmit}>
        {submitBtnText}{uploading ? 'ing...' : 'e'}
      </UpdateBtn>
    </Form>
  );
};

export default CreateEditWelcomeWienerDachshundForm;
