import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import P1 from '../../components/assets/popup1.jpg';
import P2 from '../../components/assets/popup2.jpg';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';

const Convex = styled.div`
  background: #fff;
  height: 50px;
  width: 100%;
  border-radius: 50%;
  position: absolute;
  top: -25px;
  box-shadow: 0px -27px 26px 6px rgba(0, 0, 0, 0.35);
`;

const PopUp = () => {
  const newsletterEmail = useSelector((state: RootState) => state.newsletterEmail);
  const continuedSession = sessionStorage.getItem('continuedToSite')
    ? JSON.parse(sessionStorage.getItem('continuedToSite') || '')
    : false;

  const hasSubmittedNewsletterEmail = localStorage.getItem('newsletterEmail')
    ? JSON.parse(localStorage.getItem('newsletterEmail') || '')
    : false;

  const showPopup = ![continuedSession, hasSubmittedNewsletterEmail].includes(true);

  const [show, setShow] = useState(showPopup);
  const handleClose = () => setShow(false);

  const [email, setNewsletterEmail] = useState('');

  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await createNewsletterEmail({ email });
  };

  const handleCloseModal = () => {
    handleClose();
    sessionStorage.setItem('continuedToSite', JSON.stringify(true));
  };

  return (
    <Modal
      show={show}
      onEscapeKeyDown={handleCloseModal}
      onHide={handleCloseModal}
      centered
    >
      <div className='bg-white rounded-xl'>
        <div className='rounded-tl-2 rounded-tr-2 max-w-screen-sm w-full grid grid-cols-2'>
          <img
            className='aspect-square object-cover rounded-tl-xl w-full'
            src={P1}
            alt='LPDR Pop Up Rescue Dachshund'
          />
          <img
            className='aspect-square object-cover rounded-tr-xl w-full '
            src={P2}
            alt='LPDR Pop Up Rescue Dachshund'
          />
        </div>
        <div className='relative'>
          <Convex />
        </div>
        <div className='flex justify-center items-center flex-col px-5 pb-5'>
          <h1 className='font-Matter-Medium text-3xl my-2 h-11 relative'>Subscribe!</h1>
          <p className='text-center mb-8 font-Matter-Regular'>
            Get weekly updates on our available dogs for adoption, fundraisers and events!
          </p>
          <form className='flex flex-col justify-center items-center w-full overflow-hidden'>
            <div
              className={`${newsletterEmail?.message ? 'block' : 'hidden'
                } w-full text-center font-Matter-Medium text-2xl text-teal-600 h-[54px]`}
            >
              {newsletterEmail?.message}!
            </div>
            <div
              className={`${newsletterEmail.message ? 'hidden' : 'flex'
                } w-full border-[1px] border-gray-200 rounded-xl p-3 flex items-center`}
            >
              <i className='fa-solid fa-envelopes-bulk text-teal-500 mr-1.5'></i>
              <p className='font-Matter-Medium whitespace-nowrap text-sm mr-2'>Email</p>
              <input
                type='email'
                onChange={(e: any) => setNewsletterEmail(e.target.value)}
                name='trackingNumber'
                alt='Email'
                aria-label='Email'
                value={email || ''}
                className='user-input w-full focus:outline-none text-sm font-Matter-Regular border-none placeholder:text-sm placeholder:font-Matter-Regular placeholder:text-gray-300'
                placeholder='Enter email'
              />
              {isLoading ? (
                <TailwindSpinner color='fill-teal-400' />
              ) : (
                <i
                  onClick={onSubmit}
                  className='fa-solid fa-paper-plane text-green-500 cursor-pointer'
                ></i>
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PopUp;
