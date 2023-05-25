import React from 'react';
import { EditForm, EditFormAndPreviewContainer } from '../styles/admin/Styles';
import { Form } from 'react-bootstrap';
import { ErrorText, Flex, Text, UpdateBtn } from '../styles/Styles';
import styled from 'styled-components';

const IconsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 8px;
  overflow-x: scroll;
  cursor: pointer;
  padding-bottom: 24px;
  border-radius: 8px;
`;

const IconContainer = styled.span`
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const CreateEditWelcomeWienerProductForm = ({
  inputs,
  handleInput,
  uploading,
  onSubmit,
  submitBtnText,
  setInputs,
  errors,
  handleBlur,
}: any) => {
  const iconArr = [
    {
      icon: <i className='fa-solid fa-bowl-food fa-3x'></i>,
      iconClassName: 'fa-solid fa-bowl-food',
      textKey: 'Food and Treats',
    },
    {
      icon: <i className='fa-solid fa-staff-snake fa-3x'></i>,
      iconClassName: 'fa-solid fa-staff-snake',
      textKey: 'Health and Wellness',
    },
    {
      icon: <i className='fa-regular fa-hospital fa-3x'></i>,
      iconClassName: 'fa-regular fa-hospital',
      textKey: 'Hospital Visits',
    },
    {
      icon: <i className='fa-solid fa-car-side fa-3x'></i>,
      iconClassName: 'fa-solid fa-car-side',
      textKey: 'Travel and Outdoors',
    },
    {
      icon: <i className='fa-solid fa-volleyball fa-3x'></i>,
      iconClassName: 'fa-solid fa-volleyball',
      textKey: 'Toys',
    },
  ];
  return (
    <EditFormAndPreviewContainer>
      <EditForm>
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
        <Form.Group controlId='price' className='mt-4'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name='price'
            type='number'
            value={inputs.price || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></Form.Control>
          <ErrorText>{errors?.price}</ErrorText>
        </Form.Group>
        <Form.Group controlId='description' className='mt-4'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            as='textarea'
            rows={6}
            type='text'
            value={inputs.description || ''}
            onChange={handleInput}
            onBlur={handleBlur}
          ></Form.Control>
          <ErrorText>{errors?.description}</ErrorText>
        </Form.Group>
        <IconsWrapper>
          {iconArr.map((item, index) => (
            <Flex
              key={index}
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              background={
                inputs.icon === item.iconClassName ? '#ededed' : '#fff'
              }
              style={{
                aspectRatio: '1/1',
                width: '130px',
                height: '130px',
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
        <UpdateBtn onClick={onSubmit}>
          {submitBtnText}
          {uploading ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </EditFormAndPreviewContainer>
  );
};

export default CreateEditWelcomeWienerProductForm;
