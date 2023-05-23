import { Button, Form } from 'react-bootstrap';
import { inputEmailAddress } from '../../utils/validateShippingForm';
import JumpingInput from '../common/JumpingInput';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  padding-inline: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-inline: 0px;
  }
`;

const CreateAccountCheckoutForm = ({
  fields,
  handleInput,
  errors,
  formIsValid,
  setErrors,
  onCreate,
}: any) => {
  return (
    <StyledForm>
      <JumpingInput
        name='emailAddress'
        label='Email Address'
        value={fields.emailAddress || ''}
        handleInputChange={handleInput}
        type='text'
        error={errors?.emailAddress}
        blur={() => inputEmailAddress(fields, formIsValid, setErrors)}
      />

      <Button className='mb-3 mr-3' onClick={onCreate}>
        Use this email
      </Button>
    </StyledForm>
  );
};

export default CreateAccountCheckoutForm;
