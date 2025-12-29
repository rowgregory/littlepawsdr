import { FormEvent, useState } from 'react';
import useForm from '../../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { useAppDispatch } from '../../redux/toolkitStore';
import { validateEmailRegex } from '../../utils/regex';
import { showToast } from '../../redux/features/toastSlice';

const FooterNewsletterSection = () => {
  const dispatch = useAppDispatch();
  const { inputs, handleInput } = useForm(['email']);
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateEmailRegex.test(inputs.email)) {
      await createNewsletterEmail({ email: inputs.email })
        .unwrap()
        .then(() => {
          setSuccess(true);
          dispatch(showToast({ message: 'Email submitted for newsletter', type: 'success' }));
        })
        .catch(() => dispatch(showToast({ message: 'Error, please try again', type: 'error' })));
    } else {
      dispatch(showToast({ message: 'Invalid email', type: 'error' }));
    }
  };

  return (
    <div className='grid grid-cols-12 col-span-9 bg-[#1e1e29] rounded-2xl w-full p-4 sm:p-10  text-white items-center'>
      <div className='col-span-12 sm:col-span-6'>
        <h5 className='text-lg mb-3 font-QBold text-center sm:text-left text-white'>Subscribe, Support, Rescue</h5>
        <p className='font-QLight text-sm mb-6 sm:mb-0 text-white'>
          Stay updated on rescues, events, and <br /> dachshund adoption opportunities!
        </p>
      </div>

      {success ? (
        <div className='col-span-12 sm:col-span-6 flex items-center'>
          <p className='text-white font-QBook'>Thank you for subscribing! You’re now part of the Little Paws family!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='col-span-12 sm:col-span-6 flex items-center gap-1.5 sm:gap-3'>
          <input
            name='email'
            type='text'
            className='rounded-xl focus:outline-none text-charcoal p-3 w-full font-QBook placeholder:font-QBook'
            onChange={handleInput}
            value={inputs.email || ''}
            placeholder='Enter email here!'
          />
          <button
            type='submit'
            className='h-12 max-w-[56px] w-full rounded-xl bg-teal-400 text-white flex items-center justify-center group relative overflow-hidden'
          >
            {isLoading ? (
              <TailwindSpinner color='fill-[#fff]' />
            ) : (
              <>
                <i className='fas fa-paper-plane fa-xs absolute -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 duration-500' />
                <i className='fas fa-paper-plane fa-xs absolute translate-x-0 translate-y-0 group-hover:translate-x-10 group-hover:-translate-y-10 duration-500' />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default FooterNewsletterSection;
