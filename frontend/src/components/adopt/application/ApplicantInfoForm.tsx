import { STATES } from '../../../utils/states';
import TailwindSpinner from '../../Loaders/TailwindSpinner';

export const validateAdoptionApplicationApplicantInfo = (values: any) => {
  const errors = {} as any;
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

const ApplicantInfoForm = ({
  onSubmit,
  handleInput,
  inputs,
  errors,
  openBasic,
  isLoading,
}: any) => {
  return (
    <form
      className={`transition-all flex flex-col w-full duration-200 overflow-hidden ${openBasic ? 'max-h-[620px]' : 'max-h-[0px]'
        }`}
    >
      <div className='flex flex-col mb-4'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='firstName'>
          First name*
        </label>
        <input
          className='user-input bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
          name='firstName'
          onChange={handleInput}
          type='text'
          alt='First name'
          value={inputs.firstName || ''}
        />
        {errors?.firstName && (
          <p className='font-Matter-Regular text-sm text-red-500'>{errors?.firstName}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='lastName'>
          Last name*
        </label>
        <input
          className='user-input bg-white border-[1px] w-full border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
          name='lastName'
          onChange={handleInput}
          type='text'
          alt='Last name'
          value={inputs.lastName}
        />
        {errors?.lastName && (
          <p className='font-Matter-Regular text-sm text-red-500'>{errors?.lastName}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
          Email*
        </label>
        <input
          className='user-input bg-white border-[1px] w-full border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
          name='email'
          onChange={handleInput}
          type='email'
          alt='Email'
          value={inputs.email}
        />
        {errors?.email && (
          <p className='font-Matter-Regular text-sm text-red-500'>{errors?.email}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='state'>
          State*
        </label>
        <select
          className='user-input bg-white border-[1px] h-[46px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none'
          id='state'
          name='state'
          value={inputs.state || ''}
          onChange={handleInput}
          aria-label='Select state'
        >
          {STATES.map((state: any, i: number) => (
            <option className='text-zinc-300' key={i} value={state.value}>
              {state.text}
            </option>
          ))}
        </select>
        {errors?.state && (
          <p className='font-Matter-Regular text-sm text-red-500'>{errors?.state}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='bypassCode'>
          Bypass code
        </label>
        <input
          className='user-input bg-white border-[1px] w-full border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
          name='bypassCode'
          onChange={handleInput}
          type='text'
          alt='Bypass code'
          value={inputs.bypassCode}
        />
      </div>
      <button
        className='mt-4 w-full py-2 font-Matter-Medium flex items-center justify-center rounded-md duration-200 bg-yellow-to-green text-white hover:shadow-lg'
        onClick={onSubmit}
      >
        {isLoading && <TailwindSpinner color='fill-[#fff]' />} Continue
      </button>
    </form>
  );
};

export default ApplicantInfoForm;
