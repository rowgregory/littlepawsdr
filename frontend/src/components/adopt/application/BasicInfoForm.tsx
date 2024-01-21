import { ErrorMessage, Field, Formik } from 'formik';
import styled from 'styled-components';
import { STATES } from '../../../utils/states';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const Input = styled(Field)`
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  margin-bottom: 2px;
  width: 100%;
  font-size: 14px;
  color: #000 !important;
  ::-webkit-input-placeholder {
    font-size: 14px;
  }

  &:focus {
    outline: none !important;
  }

  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: #000;
  }
`;

export const Error = styled(ErrorMessage)`
  font-size: 12px;
  color: red;
`;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  state: '',
  bypassCode: '',
};

const validate = (values: any) => {
  const errors = {} as any;
  if (!values.email) {
    errors.email = 'Email Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.firstName) {
    errors.firstName = 'First Name Required';
  } else if (values.firstName.length > 50) {
    errors.firstName = 'Must be 50 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name Required';
  } else if (values.lastName.length > 50) {
    errors.lastName = 'Must be 50 characters or less';
  }

  if (!values.state) {
    errors.state = 'State Required';
  } else if (!/^[A-Za-z]{2}$/.test(values.state)) {
    errors.state = 'Invalid state code';
  }
  return errors;
};

const BasicInfoForm = ({ onSubmit }: any) => {
  const state = useSelector((state: any) => state);
  const loadingAdoptionFeeCreate = state?.adoptionFeeCreate?.loading;
  const loadingAdoptionFeeCheckActiveSession = state?.adoptionFeeCheckActiveSession?.loading;

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ handleSubmit, isValid }) => (
        <form onSubmit={handleSubmit} className='d-flex flex-column'>
          <div className='mb-3'>
            <Input type='text' name='firstName' placeholder='First Name' />
            <Error name='firstName' component='div' />
          </div>
          <div className='mb-3'>
            <Input type='text' name='lastName' placeholder='Last Name' />
            <Error name='lastName' component='div' />
          </div>
          <div className='mb-3'>
            <Input type='email' name='email' placeholder='Email' />
            <Error name='email' component='div' />
          </div>
          <div className='mb-3'>
            <Input component='select' id='state' name='state' className='adoption-fee-state-select'>
              {STATES.map((obj, i) => (
                <option key={i} value={obj.value}>
                  {obj.text}
                </option>
              ))}
            </Input>
            <Error name='state' component='div' />
          </div>
          <div className='mb-3'>
            <Input type='text' name='bypassCode' placeholder='Volunteer Bypass Code' />
          </div>
          <Button
            variant='success'
            type='submit'
            disabled={!isValid || loadingAdoptionFeeCreate || loadingAdoptionFeeCheckActiveSession}
          >
            {loadingAdoptionFeeCreate ? 'Initializing Form' : 'Continue'}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default BasicInfoForm;
