import React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import {
  inputAddress,
  inputCity,
  inputName,
  inputState,
  inputZipPostalCode,
} from '../../utils/validateShippingForm';
import JumpingInput from '../common/JumpingInput';

export const ProceedBtn = styled.button`
  background: #ffd813;
  color: #0f1111;
  font-weight: bold;
  font-family: Arial;
  box-shadow: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  :hover {
    filter: brightness(0.95);
    background: #ffd813;
    color: #0f1111;
  }
  :focus {
    background: #ffd813;
  }
`;

const ShippingForm = ({
  inputs,
  handleInputChange,
  errors,
  formIsValid,
  setErrors,
  onSubmit,
}: any) => {
  return (
    <Form>
      <JumpingInput
        name='name'
        label='Full Name'
        value={inputs.name || ''}
        handleInputChange={handleInputChange}
        type='text'
        error={errors?.name}
        blur={() => inputName(inputs, formIsValid, setErrors)}
      />
      <JumpingInput
        name='address'
        label='Address'
        value={inputs.address || ''}
        handleInputChange={handleInputChange}
        type='text'
        error={errors?.address}
        blur={() => inputAddress(inputs, formIsValid, setErrors)}
      />
      <JumpingInput
        name='city'
        label='City'
        value={inputs.city || ''}
        handleInputChange={handleInputChange}
        type='text'
        error={errors?.city}
        blur={() => inputCity(inputs, formIsValid, setErrors)}
      />
      <JumpingInput
        name='state'
        label='State'
        value={inputs.state || ''}
        handleInputChange={handleInputChange}
        type='text'
        isSelect
        error={errors?.state}
        blur={() => inputState(inputs, formIsValid, setErrors)}
      />
      <JumpingInput
        name='zipPostalCode'
        label='Zip Postal Code'
        value={inputs.zipPostalCode || ''}
        handleInputChange={handleInputChange}
        type='number'
        error={errors?.zipPostalCode}
        blur={() => inputZipPostalCode(inputs, formIsValid, setErrors)}
      />
      <ProceedBtn onClick={onSubmit} type='submit' className='mb-5 mt-4'>
        Use this address
      </ProceedBtn>
    </Form>
  );
};

export default ShippingForm;
