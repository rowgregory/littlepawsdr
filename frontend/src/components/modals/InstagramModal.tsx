import DayGram from '../../components/assets/littlepawsdr_qr 3.png';
import styled, { keyframes } from 'styled-components';
import Modal from '../common/Modal';

const InstagramBtn = styled.div`
  width: 200px;
  background: linear-gradient(45deg, #ffdd55 0%, #ff543e 52%, #c837ab 100%);
  color: #fff;
  height: 50px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 300ms;
`;

const moveUpAndDown = keyframes`
  0%, 100% {
    top: 147px;
  }
  50% {
    top: 157px;
  }
`;

const InstaArrow = styled.i`
  background: linear-gradient(45deg, #ebcc50 0%, #e14d3a 52%, #a7308f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  animation: ${moveUpAndDown} 1s linear infinite;
  margin-block: 1rem;
`;

const InstagramModal = ({ show, handleClose }: any) => {
  return (
    <Modal show={show} onClose={handleClose}>
      <div className='bg-white p-6 rounded-xl flex flex-col justify-center items-center'>
        <InstagramBtn
          onClick={() => window.open('https://www.instagram.com/littlepawsdr/?hl=en', '_blank')}
        >
          Instagram
        </InstagramBtn>
        <p className='mb-3'>Or</p>
        <p className='text-center mb-10'>Scan QR Code</p>
        <InstaArrow className='fas fa-arrow-down fa-2x'></InstaArrow>
        <img src={DayGram} alt='insta-qr' className='max-w-screen-sm w-full' />
      </div>
    </Modal>
  );
};

export default InstagramModal;
