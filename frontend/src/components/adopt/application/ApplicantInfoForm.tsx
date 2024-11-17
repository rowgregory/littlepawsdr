import { FC } from 'react';
import { STATES } from '../../data/states';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import { ApplicantInfoFormProps } from '../../../types/form-types';

const styles = {
  input: `user-input bg-white border-[1px] text-zinc-900 border-gray-200 rounded-md py-2.5 px-4 font-QBook focus:border-teal-400 focus:outline-none h-12`,
  error: `font-QBold text-sm text-red-500`,
};

const ApplicantInfoForm: FC<ApplicantInfoFormProps> = ({
  onSubmit,
  handleInput,
  handleSelect,
  inputs,
  errors,
  openBasic,
  isLoading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`transition-all flex flex-col w-full duration-200 overflow-hidden ${
        openBasic ? 'max-h-[620px]' : 'max-h-[0px]'
      }`}
    >
      <div className='flex flex-col sm:flex-row sm:gap-x-4 mb-4'>
        <div className='flex flex-col w-full'>
          <label className='font-QBook text-sm mb-1' htmlFor='firstName'>
            First name*
          </label>
          <input
            name='firstName'
            type='text'
            alt='First name'
            className={styles.input}
            onChange={handleInput}
            value={inputs.firstName || ''}
          />
          {errors?.firstName && <p className={styles.error}>{errors?.firstName}</p>}
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-QBook text-sm mb-1' htmlFor='lastName'>
            Last name*
          </label>
          <input
            className={styles.input}
            name='lastName'
            onChange={handleInput}
            type='text'
            alt='Last name'
            value={inputs.lastName}
          />
          {errors?.lastName && <p className={styles.error}>{errors?.lastName}</p>}
        </div>
      </div>
      <div className='flex flex-col sm:flex-row sm:gap-x-4 mb-4'>
        <div className='flex flex-col w-full'>
          <label className='font-QBook text-sm mb-1' htmlFor='email'>
            Email*
          </label>
          <input
            className={styles.input}
            name='email'
            onChange={handleInput}
            type='email'
            alt='Email'
            value={inputs.email}
          />
          {errors?.email && <p className={styles.error}>{errors?.email}</p>}
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-QBook text-sm mb-1' htmlFor='state'>
            State*
          </label>
          <select
            className={styles.input}
            id='state'
            name='state'
            value={inputs.state || ''}
            onChange={handleSelect}
            aria-label='Select state'
          >
            {STATES.map((state: any, i: number) => (
              <option className='text-zinc-300' key={i} value={state.value}>
                {state.text}
              </option>
            ))}
          </select>
          {errors?.state && <p className={styles.error}>{errors?.state}</p>}
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <label className='font-QBook text-sm mb-1' htmlFor='bypassCode'>
          Bypass code
        </label>
        <input
          className={styles.input}
          name='bypassCode'
          onChange={handleInput}
          type='text'
          alt='Bypass code'
          value={inputs.bypassCode}
        />
      </div>
      <button
        type='submit'
        className='mt-4 w-full py-3 font-QBook flex items-center justify-center rounded-md duration-300 bg-teal-400 text-white hover:bg-teal-500 hover:shadow-lg'
      >
        {isLoading && <TailwindSpinner color='fill-[#fff]' />} Continue
      </button>
    </form>
  );
};

export default ApplicantInfoForm;
