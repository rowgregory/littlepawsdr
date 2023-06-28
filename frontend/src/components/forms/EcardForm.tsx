import { Form } from 'react-bootstrap';
import JumpingInput from '../common/JumpingInput';
import { ProceedBtn } from './ShippingForm';
import { Text } from '../styles/Styles';

const EcardForm = ({ inputs, handleInputChange, errors, onSubmit }: any) => {
  return (
    <Form className='p-3'>
      <Text fontSize='18px' fontWeight={400} marginBottom='6px'>
        Recipient Information
      </Text>
      <JumpingInput
        name='recipientsFullName'
        label='Enter Recipeints Full Name'
        value={inputs.recipientsFullName || ''}
        handleInputChange={handleInputChange}
        type='text'
        error={errors?.recipientsFullName}
        blur={() => {}}
      />
      <JumpingInput
        name='recipientsEmail'
        label='Enter Recipients Email'
        value={inputs.recipientsEmail || ''}
        handleInputChange={handleInputChange}
        type='email'
        error={errors?.recipientsEmail}
        blur={() => {}}
      />
      <JumpingInput
        name='message'
        label='Enter Message To Be Sent'
        value={inputs.message || ''}
        handleInputChange={handleInputChange}
        type='text'
        error={errors?.message}
        blur={() => {}}
        showPassword={false}
        setShowPassword={() => {}}
        disabled={false}
        isTextArea={true}
      />
      <JumpingInput
        name='dateToSend'
        label='Enter Date'
        value={inputs.dateToSend || ''}
        handleInputChange={handleInputChange}
        type='date'
        error={errors?.dateToSend}
      />
      <ProceedBtn onClick={onSubmit} className='mt-4'>
        Add To Cart
      </ProceedBtn>
    </Form>
  );
};

export default EcardForm;
