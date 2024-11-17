import { Errors, Inputs } from '../types/form-types';

const validateAdoptionApplicationApplicantInfo = (values: Inputs): Errors => {
  const errors: Errors = {};

  if (!values?.email) {
    errors.email = 'Email Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values?.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values?.firstName) {
    errors.firstName = 'First Name Required';
  } else if (values?.firstName.length > 50) {
    errors.firstName = 'Must be 50 characters or less';
  }

  if (!values?.lastName) {
    errors.lastName = 'Last Name Required';
  } else if (values?.lastName.length > 50) {
    errors.lastName = 'Must be 50 characters or less';
  }

  if (!values?.state) {
    errors.state = 'State Required';
  } else if (!/^[A-Za-z]{2}$/.test(values?.state)) {
    errors.state = 'Invalid state code';
  }

  return errors;
};

export default validateAdoptionApplicationApplicantInfo;
