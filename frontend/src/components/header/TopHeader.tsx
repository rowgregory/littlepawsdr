import { FormEvent } from 'react';
import useForm from '../../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import { useAppDispatch, useCartSelector, useUserSelector } from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import Logo from '../common/Logo';
import { topHeaderLinks } from '../data/navbar-data';
import TopHeaderInfoBox from './TopHeaderInfoBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { validateEmailRegex } from '../../utils/regex';
import { showToast } from '../../redux/features/toastSlice';

const TopHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useUserSelector();
  const { cartItemsAmount } = useCartSelector();
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);
  const { inputs, handleInput, setInputs } = useForm(['email']);
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateEmailRegex.test(inputs.email);
    if (!isValid) {
      dispatch(showToast({ message: 'Invalid email', type: 'warning' }));
      return;
    }

    try {
      await createNewsletterEmail({ email: inputs.email }).unwrap();
      dispatch(showToast({ message: 'Email submitted for newsletter', type: 'success' }));
      setInputs({});
    } catch (err: any) {
      dispatch(showToast({ message: 'Error, please try again', type: 'warning' }));
    }
  };

  return (
    <div className='w-full bg-[#1a1f28] px-3'>
      <div
        className={`max-w-screen-2xl relative mx-auto w-full pt-1 lg:pt-4 pb-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between ${
          shouldExclude ? 'hidden' : 'block'
        }`}
      >
        <Logo className='w-40 md:w-28 lg:w-32 lg:-ml-3 mb-3.5 lg:mb-0' />
        <div className='flex items-center gap-x-12'>
          <div className='w-fit p-4 text-white items-center hidden 1230:block'>
            <form
              onSubmit={handleSubmit}
              className='grid grid-cols-12 items-center gap-1.5 sm:gap-3'
            >
              <input
                name='email'
                type='text'
                className='col-span-11 rounded-xl focus:outline-none text-charcoal p-3 w-full min-w-80 font-QBook placeholder:font-QBook'
                onChange={handleInput}
                value={inputs.email || ''}
                placeholder='Subscribe, Support, Rescue'
              />
              <button
                type='submit'
                className='col-span-1 h-12 w-14 rounded-xl bg-teal-400 text-white flex items-center justify-center group overflow-hidden relative'
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <i className='fas fa-paper-plane fa-xs absolute -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 duration-500' />
                    <i className='fas fa-paper-plane fa-xs absolute translate-x-0 translate-y-0 group-hover:translate-x-10 group-hover:-translate-y-10 duration-500' />
                  </>
                )}
              </button>
            </form>
          </div>
          <div className='hidden md:flex items-center md:mb-3 lg:mb-0 gap-x-12'>
            {topHeaderLinks(user, navigate, cartItemsAmount).map((obj, i) => (
              <TopHeaderInfoBox key={i} obj={obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
