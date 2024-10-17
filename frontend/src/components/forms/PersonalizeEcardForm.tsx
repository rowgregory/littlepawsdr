import { FC } from 'react';
import { formatDateForCalendar } from '../../utils/dateFunctions';
import { PersonalizeEcardFormProps } from '../../types/form-types';

const PersonalizeEcardForm: FC<PersonalizeEcardFormProps> = ({
  handleInput,
  inputs,
  errors,
  sendNow,
  setSendNow,
  personalizeCallback,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minimum = formatDateForCalendar(tomorrow);

  return (
    <form className='col-span-12 flex flex-col'>
      <div className='flex flex-col md:flex-row gap-3'>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='name'>
            Your name*
          </label>
          <input
            className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
            id='name'
            name='name'
            onChange={handleInput}
            type='text'
            alt='Your name'
            aria-label='Your name'
            value={inputs.name || ''}
          />
          <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.name}</p>
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
            Your email*
          </label>
          <input
            className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
            id='email'
            name='email'
            onChange={handleInput}
            type='email'
            alt='Your email'
            aria-label='Your email'
            value={inputs.email || ''}
          />
          <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.email}</p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-3'>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
            Recipeints full name*
          </label>
          <input
            className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
            id='recipientsFullName'
            name='recipientsFullName'
            onChange={handleInput}
            type='text'
            alt='Recipeints full name'
            aria-label='Recipeints full name'
            value={inputs.recipientsFullName || ''}
          />
          <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>
            {errors?.recipientsFullName}
          </p>
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='password'>
            Recipients email*
          </label>
          <input
            className='user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
            id='recipientsEmail'
            name='recipientsEmail'
            onChange={handleInput}
            type='email'
            alt='Recipients email'
            aria-label='Recipients email'
            value={inputs.recipientsEmail || ''}
          />
          <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.recipientsEmail}</p>
        </div>
      </div>
      <label className='font-Matter-Medium text-sm mb-1' htmlFor='bio'>
        Message*
      </label>
      <textarea
        className='user-input border-[1px] border-gray-300 rounded-md w-full py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
        id='message'
        name='message'
        rows={4}
        value={inputs.message || ''}
        onChange={handleInput}
        aria-label='Enter message'
      ></textarea>
      <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.message}</p>
      <label htmlFor='sendNow' className='font-Matter-Light'>
        <input
          name='sendNow'
          type='radio'
          value='send-now'
          onChange={(e: any) => setSendNow(e.target.value)}
          className='mr-2 personalize-ecard'
          checked={sendNow === 'send-now'}
        />
        Send my ecard right now
      </label>
      <label htmlFor='sendNow' className='font-Matter-Light'>
        <input
          name='sendNow'
          type='radio'
          value='send-later'
          onChange={(e: any) => setSendNow(e.target.value)}
          className='mr-2 personalize-ecard'
          checked={sendNow === 'send-later'}
        />
        Send my ecard later
      </label>
      {sendNow === 'send-later' && (
        <div className='flex flex-col'>
          <label className='font-Matter-Medium text-sm mb-1'>Date to send</label>
          <input
            className='ecard-calandar user-input border-[1px] border-gray-300 rounded-md py-2.5 px-3.5 font-Matter-Regular focus:outline-none '
            name='dateToSend'
            id='dateToSend'
            onChange={handleInput}
            type='date'
            alt='Date to send'
            aria-label='Date to send'
            value={inputs.dateToSend || ''}
            min={minimum}
          />
          <p className='text-red-500 font-Matter-Medium text-xs mb-4 '>{errors?.dateToSend}</p>
        </div>
      )}
      <button
        onClick={personalizeCallback}
        className='mt-4 bg-teal-400 rounded-md text-white px-4 py-2.5 font-Matter-Medium duration-200 hover:bg-teal-500 hover:shadow-lg hover:no-underline text-center'
      >
        Preview ecard
      </button>
    </form>
  );
};

export default PersonalizeEcardForm;
