import { Fragment, useState } from 'react';
import { AquaTile, Donate1, VenmoQRCode } from '../../components/assets';
import DonationConfirmationModal from '../../components/modals/DonationConfirmationModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import {
  OneTimeDonationForm,
  OneTimeDonationProgressTracker,
} from '../../components/donate/OneTimeDonation';
import {
  MonthlyDonationForm,
  MonthlyDonationProgressTracker,
} from '../../components/donate/MonthlyDonation';
import { useLocation } from 'react-router-dom';

const Donate = () => {
  const location = useLocation();
  const state = useSelector((state: RootState) => state);
  const user = state.auth?.user;
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const [step, setStep] = useState({ step1: true, step2: false, step3: false });
  const [type, setType] = useState(location.state?.cameFromSanctuary ? 'monthly' : 'one-time');

  return (
    <Fragment>
      <DonationConfirmationModal openModal={openModal} handleClose={handleClose} user={user} />
      <div className='mx-auto w-full mt-[-56px]'>
        <div
          style={{ backgroundImage: `url(${AquaTile})` }}
          className='h-[272px] sm:h-[350px] bg-repeat border-b-[7px] border-teal-500'
        ></div>
        <div className='flex flex-col mx-auto relative bg-slate-100 min-h-[calc(100vh-732px)] md:min-h-[calc(100vh-780px)] pb-40'>
          <div className='grid grid-cols-12 gap-4 md:gap-8  sm:px-6 mt-[-192px] md:mt-[-240px] max-w-screen-xl w-full mx-auto h-full'>
            <div className='col-span-12 lg:col-span-8 pt-[24px] md:pt-[48px] w-full'>
              <h1 className='text-3xl px-3 md:text-5xl font-Matter-Bold text-[#fff] mb-3 md:mb-4'>
                Donate to LPDR and Help Dachshunds
              </h1>
              <div className='flex items-center md:gap-3.5'>
                <div
                  onClick={() => setType('one-time')}
                  className={`w-full h-20 ${
                    type === 'one-time' ? 'text-teal-500 bg-[#fff]' : 'text-[#fff] bg-[#9863a8]'
                  }  text-xl font-Matter-Bold tracking-wide flex items-center justify-center whitespace-nowrap cursor-pointer`}
                >
                  ONE TIME
                  <span
                    className={`hidden sm:block ${
                      type === 'one-time' ? 'text-teal-500' : 'text-[#fff]'
                    } text-xl`}
                  >
                    &nbsp;DONATION
                  </span>
                </div>
                <div
                  onClick={() => setType('monthly')}
                  className={`w-full h-20 ${
                    type === 'monthly' ? 'text-teal-500 bg-[#fff]' : 'text-[#fff] bg-[#9863a8]'
                  } text-xl font-Matter-Bold tracking-wide flex items-center justify-center whitespace-nowrap cursor-pointer`}
                >
                  MONTHLY
                  <span
                    className={`hidden sm:block ${
                      type === 'monthly' ? 'text-teal-500' : 'text-[#fff]'
                    } text-xl`}
                  >
                    &nbsp;DONATION
                  </span>
                </div>
              </div>
              <div className='w-full pt-3 px-4 md:px-6 pb-12 bg-white'>
                <OneTimeDonationProgressTracker step={step} setStep={setStep} type={type} />
                <MonthlyDonationProgressTracker type={type} />
                <OneTimeDonationForm
                  type={type}
                  step={step}
                  setStep={setStep}
                  setOpenModal={setOpenModal}
                />
                <MonthlyDonationForm type={type} />
              </div>
              <div className='hidden lg:block mt-8 bg-white w-full p-[16px] md:p-6'>
                <p className='text-lg font-Matter-Regular mb-4'>Scan our Venmo QR code</p>
                <div className='border-4 border-teal-500 p-2.5 w-fit'>
                  <img src={VenmoQRCode} alt='LPDR Venmo QR code' className='max-w-40 w-full' />
                </div>
              </div>
            </div>
            <div className='col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col w-full'>
              <img
                src={Donate1}
                alt='Donate to LPDR'
                className='max-w-none sm:max-w-80 lg:max-w-none aspect-square object-cover'
              />
              <p className='bg-white px-6 p-8 font-QLight'>
                Little Paws Dachshund Rescue is a dedicated organization committed to rescuing,
                rehabilitating, and rehoming dachshunds in need. As a passionate advocate for these
                beloved dogs, our mission is to provide them with the care and support they require
                for a second chance at a happy life. Through our efforts, we strive to prevent
                cruelty and neglect, offering a safe haven for dachshunds who have been abandoned,
                abused, or surrendered. Your generous contributions enable us to continue our vital
                work, making a significant impact on the lives of dachshunds in need. Thank you for
                choosing to support Little Paws Dachshund Rescue and for helping us make a
                difference in the lives of these wonderful animals
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Donate;
