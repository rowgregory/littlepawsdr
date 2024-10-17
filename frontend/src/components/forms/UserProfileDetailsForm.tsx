import { FC } from 'react';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { UserProfileDetailsFormProps } from '../../types/settings-types';

const UserProfileDetailsForm: FC<UserProfileDetailsFormProps> = ({
  inputs,
  handleInput,
  handleUpdateUser,
  isLoading,
  errors,
}) => {
  return (
    <form onSubmit={handleUpdateUser} className='flex flex-col gap-3'>
      <div className='flex flex-col gap-3 md:flex-row'>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-0' htmlFor='firstName'>
            First name
          </label>
          <input
            className='user-input bg-white border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none'
            name='firstName'
            onChange={handleInput}
            type='text'
            alt='First Name'
            value={inputs.firstName || ''}
          />
          {errors?.firstName && (
            <p className='font-Matter-Regular text-sm text-red-500'>{errors?.firstName}</p>
          )}
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-0' htmlFor='lastName'>
            Last name
          </label>
          <input
            className='user-input bg-white border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none'
            name='lastName'
            onChange={handleInput}
            type='text'
            alt='Last Name'
            value={inputs.lastName || ''}
          />
          {errors?.lastName && (
            <p className='font-Matter-Regular text-sm text-red-500'>{errors?.lastName}</p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular'
      >
        {isLoading ? <TailwindSpinner color='fill-lime-400' /> : 'Save'}
      </button>
    </form>
  );
};

export default UserProfileDetailsForm;
