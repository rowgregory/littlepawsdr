import { FormEvent, Fragment, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import LinkContent from './navigation-drawer/LinkContent';
import { RootState, useAppDispatch, useAppSelector } from '../redux/toolkitStore';
import AuthUserDisplay from './navigation-drawer/AuthUserDisplay';
import { toggleNavigationDrawer } from '../redux/features/navbar/navbarSlice';
import TailwindSpinner from './Loaders/TailwindSpinner';
import useForm from '../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../redux/services/newsletterEmailApi';
import { validateEmailRegex } from '../utils/regex';
import { openToast } from '../redux/features/toastSlice';

// New animated black overlay
const AnimatedBlackOverlay = ({ open, handleClose }: { open: boolean; handleClose: any }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        onClick={handleClose}
        className='fixed inset-0 bg-black/50 z-[101] backdrop-blur-xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </AnimatePresence>
);

const NavigationDrawer = () => {
  const dispatch = useAppDispatch();
  const overlayRef = useRef(null) as any;
  const navbar = useAppSelector((state: RootState) => state.navbar);
  const open = navbar.toggle.navigationDrawer;
  const { inputs, handleInput, setInputs } = useForm(['email']);
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();
  const handleClose = () => dispatch(toggleNavigationDrawer({ navigationDrawer: false }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateEmailRegex.test(inputs.email)) {
      await createNewsletterEmail({ email: inputs.email })
        .unwrap()
        .then(() => {
          dispatch(openToast({ message: 'Email submitted for newsletter', success: true, open: true }));
          setInputs({});
        })
        .catch(() => dispatch(openToast({ message: 'Error, please try again', success: false, open: true })));
    } else {
      dispatch(openToast({ message: 'Invalid email', success: false, open: true }));
    }
  };

  return (
    <Fragment>
      <AnimatedBlackOverlay open={open} handleClose={handleClose} />
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            className='py-6 overflow-y-scroll h-screen sm:h-[calc(100vh-16px)] sm:rounded-3xl fixed z-[102] top-0 sm:top-2 bottom:0 sm:bottom-2 bg-[#171b20] no-scrollbar w-screen sm:w-[380px]'
            initial={{
              x: typeof window !== 'undefined' && window.innerWidth >= 640 ? -380 : -window.innerWidth,
              opacity: 0.8,
            }}
            animate={{
              x: typeof window !== 'undefined' && window.innerWidth >= 640 ? 8 : 0,
              opacity: 1,
            }}
            exit={{
              x: typeof window !== 'undefined' && window.innerWidth >= 640 ? -380 : -window.innerWidth,
              opacity: 0.8,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className='px-8 mb-7 relative flex items-center justify-end gap-2'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}>
                <i onClick={handleClose} className='fas fa-times fa-xs text-white cursor-pointer'></i>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
              <AuthUserDisplay closeMenu={handleClose} />
            </motion.div>

            <motion.div
              className='p-3 text-white items-center block 1230:hidden pb-12 border-b-[1px] border-b-zinc-700 mb-12'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.p
                className='font-QBook text-sm pb-6 sm:mb-0 text-white text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                Stay updated on rescues, events, and <br /> dachshund adoption opportunities!
              </motion.p>

              <form onSubmit={handleSubmit} className='grid grid-cols-12 items-center gap-1.5 sm:gap-3'>
                <motion.input
                  name='email'
                  type='text'
                  className='col-span-12 rounded-xl focus:outline-none text-charcoal p-3 w-full font-QBook placeholder:font-QBook border-2 border-transparent focus:border-teal-400 transition-colors duration-200'
                  onChange={handleInput}
                  value={inputs.email || ''}
                  placeholder='Subscribe, Support, Rescue'
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileFocus={{ scale: 1.02 }}
                />

                <motion.button
                  type='submit'
                  className='col-span-12 h-12 rounded-xl bg-teal-400 text-white flex items-center justify-center group overflow-hidden relative'
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: '#0d9488',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <TailwindSpinner color='fill-[#fff]' />
                  ) : (
                    <>
                      <motion.div
                        className='absolute'
                        initial={{ x: -40, y: 40, opacity: 0 }}
                        whileHover={{ x: 0, y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Send className='w-4 h-4' />
                      </motion.div>
                      <motion.div
                        className='absolute'
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        whileHover={{ x: 40, y: -40, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Send className='w-4 h-4' />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
              <LinkContent closeMenu={handleClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default NavigationDrawer;
