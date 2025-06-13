import { FC } from 'react';
import { User } from 'lucide-react';
import FormInput from './FormInput';

interface PersonalInfoSectionProps {
  inputs: any;
  errors: any;
  handleInput: (e: any) => void;
  isEditing: boolean;
}

const PersonalInfoSection: FC<PersonalInfoSectionProps> = ({ inputs, errors, handleInput, isEditing }) => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
          <User className='w-4 h-4 text-blue-600' />
        </div>
        <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pl-11'>
        <FormInput
          label='First Name'
          name='firstName'
          value={inputs.firstName}
          onChange={handleInput}
          disabled={!isEditing}
          placeholder='Enter your first name'
          required={true}
          error={errors.firstName}
        />

        <FormInput
          label='Last Name'
          name='lastName'
          value={inputs.lastName}
          onChange={handleInput}
          disabled={!isEditing}
          placeholder='Enter your last name'
          required={true}
          error={errors.lastName}
        />
      </div>

      <div className='pl-11'>
        <FormInput
          label='Email Address'
          name='email'
          type='email'
          value={inputs.email}
          onChange={handleInput}
          disabled={!isEditing}
          placeholder='Enter your email address'
          required={true}
          error={errors.email}
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
