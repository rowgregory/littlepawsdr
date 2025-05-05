import { FormEvent } from 'react';
import useForm from '../../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import Logo from '../common/Logo';
import { topHeaderLinks } from '../data/navbar-data';
import TopHeaderInfoBox from './TopHeaderInfoBox';
import { useLocation, useNavigate } from 'react-router-dom';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { validateEmailRegex } from '../../utils/regex';
import { openToast } from '../../redux/features/toastSlice';

const TopHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  const { cartItemsAmount } = useAppSelector((state: RootState) => state.cart);
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);
  const { inputs, handleInput, setInputs } = useForm(['email']);
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateEmailRegex.test(inputs.email)) {
      await createNewsletterEmail({ email: inputs.email })
        .unwrap()
        .then(() => {
          dispatch(
            openToast({ message: 'Email submitted for newsletter', success: true, open: true })
          );
          setInputs({});
        })
        .catch(() =>
          dispatch(openToast({ message: 'Error, please try again', success: false, open: true }))
        );
    } else {
      dispatch(openToast({ message: 'Invalid email', success: false, open: true }));
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
                  <TailwindSpinner color='fill-[#fff]' />
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
            {topHeaderLinks(auth, dispatch, navigate, cartItemsAmount).map((obj, i) => (
              <TopHeaderInfoBox key={i} obj={obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
