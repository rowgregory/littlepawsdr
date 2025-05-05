import { FormEvent, Fragment, useCallback, useRef } from 'react';
import LinkContent from './navigation-drawer/LinkContent';
import useOutsideDetect from '../hooks/useOutsideDetect';
import { RootState, useAppDispatch } from '../redux/toolkitStore';
import { useSelector } from 'react-redux';
import AuthUserDisplay from './navigation-drawer/AuthUserDisplay';
import BlackPageOverlay from './common/BlackPageOverlay';
import { toggleNavigationDrawer } from '../redux/features/navbar/navbarSlice';
import TailwindSpinner from './Loaders/TailwindSpinner';
import useForm from '../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../redux/services/newsletterEmailApi';
import { validateEmailRegex } from '../utils/regex';
import { openToast } from '../redux/features/toastSlice';

const NavigationDrawer = () => {
  const dispatch = useAppDispatch();
  const overlayRef = useRef(null) as any;
  const navbar = useSelector((state: RootState) => state.navbar);
  const open = navbar.toggle.navigationDrawer;

  const handleClose = useCallback(() => {
    if (navbar.toggle.navigationDrawer) {
      dispatch(toggleNavigationDrawer({ navigationDrawer: false }));
    }
  }, [dispatch, navbar.toggle.navigationDrawer]);

  useOutsideDetect(overlayRef, handleClose);

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
    <Fragment>
      <BlackPageOverlay open={open} />
      <div
        ref={overlayRef}
        className={`${
          open
            ? 'left-0 w-screen sm:left-2 sm:w-[380px]'
            : `left-[-135vw] w-screen sm:w-[380px] sm:left-[-380px]`
        } py-6 overflow-y-scroll h-screen sm:h-[calc(100vh-16px)] sm:rounded-3xl fixed z-[110] top-0 sm:top-2 bottom:0 sm:bottom-2 bg-[#171b20] transition-all duration-300 no-scrollbar`}
      >
        <div className='px-8 mb-7 relative flex items-center justify-end gap-2'>
          <i onClick={handleClose} className='fas fa-times fa-xs text-white cursor-pointer'></i>
        </div>
        <AuthUserDisplay closeMenu={handleClose} />
        <div className='p-3 text-white items-center block 1230:hidden pb-12 border-b-[1px] border-b-zinc-700 mb-12'>
          <p className='font-QBook text-sm pb-6 sm:mb-0 text-white text-center'>
            Stay updated on rescues, events, and <br /> dachshund adoption opportunities!
          </p>
          <form onSubmit={handleSubmit} className='grid grid-cols-12 items-center gap-1.5 sm:gap-3'>
            <input
              name='email'
              type='text'
              className='col-span-12 rounded-xl focus:outline-none text-charcoal p-3 w-full font-QBook placeholder:font-QBook'
              onChange={handleInput}
              value={inputs.email || ''}
              placeholder='Subscribe, Support, Rescue'
            />
            <button
              type='submit'
              className='col-span-12 h-12 rounded-xl bg-teal-400 text-white flex items-center justify-center group overflow-hidden relative'
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
        <LinkContent closeMenu={handleClose} />
      </div>
    </Fragment>
  );
};

export default NavigationDrawer;
