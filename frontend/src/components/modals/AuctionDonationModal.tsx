import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import { useCreateOneTimeAuctionDonationMutation } from '../../redux/services/campaignApi';
import { validateEmailRegex } from '../../utils/regex';
import { Fragment, useState } from 'react';
import GreenRotatingTransparentCircle from '../Loaders/GreenRotatingTransparentCircle';
import StepThree from '../campaign/auction-donation-modal/StepThree';
import StepTwo from '../campaign/auction-donation-modal/StepTwo';
import StepOne from '../campaign/auction-donation-modal/StepOne';
import Modal from '../common/Modal';

const AuctionDonationModal = ({
  openModal,
  handleClose,
  steps,
  inputs,
  setInputs,
  setOpenModal,
  setSteps,
}: any) => {
  const state = useSelector((state: RootState) => state);
  const campaign = state.campaign.campaign;
  const auth = state.auth;
  let [emailError, setEmailError] = useState('');
  let [orderLoader, setOrderLoader] = useState(false);

  const handleContinue = () => {
    const currentStep = steps.step3 ? 'step3' : steps.step2 ? 'step2' : 'step1';
    if (currentStep) {
      if (currentStep === 'step2') {
        const validEmail = validateEmailRegex.test(inputs.email);
        if (!validEmail) {
          setEmailError('Email is not valid');
        } else {
          const nextStep = `step${parseInt(currentStep.slice(4)) + 1}`;
          setSteps((prevSteps: any) => ({ ...prevSteps, [nextStep]: true }));
        }
      } else {
        const nextStep = `step${parseInt(currentStep.slice(4)) + 1}`;
        setSteps((prevSteps: any) => ({ ...prevSteps, [nextStep]: true }));
      }
    }
  };

  const handleBack = () => {
    const currentStep = steps.step3 ? 'step3' : steps.step2 ? 'step2' : 'step1';
    if (currentStep) {
      const prevStep = `step${parseInt(currentStep.slice(4))}`;
      setSteps((prevSteps: any) => ({ ...prevSteps, [prevStep]: false }));
    }
  };

  const [createOneTimeAuctionDonation] = useCreateOneTimeAuctionDonationMutation();

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [openModal.donate],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: inputs.oneTimeDonationAmount,
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    },
    onApprove: (data: any, actions: any) => {
      setOrderLoader(true);
      return actions.order.capture().then(async (details: any) => {
        await createOneTimeAuctionDonation({
          auctionId: campaign?.auction?._id,
          donor: inputs.donor,
          email: inputs.email,
          donorPublicMessage: inputs.donorPublicMessage,
          oneTimeDonationAmount: inputs.oneTimeDonationAmount,
          paypalId: details.id,
          hasAnonymousBiddingEnabled: auth?.user?.anonymousBidding,
        })
          .unwrap()
          .then(() => {
            setOrderLoader(false);
            setOpenModal({ donate: false, confirmation: true, unauthorized: false });
          })
          .catch((err: any) => {
            setOrderLoader(false);
          });
      });
    },
  } as any;

  return (
    <Fragment>
      {orderLoader && <GreenRotatingTransparentCircle />}
      <Modal show={openModal.donate} onClose={handleClose}>
        <div className='bg-white rounded-xl flex flex-col justify-center items-center'>
          <div className='flex bg-gray-100 px-3 py-2.5 border-0 relative rounded-tl-xl rounded-tr-xl h-11 w-full justify-between items-center'>
            <div className='flex items-center'>
              <i
                onClick={handleBack}
                className={`${
                  steps.step2 || steps.step3 ? 'flex' : 'hidden'
                } cursor-pointer fa-solid fa-arrow-left fa-xs text-gray-900 h-6 w-6 rounded-full bg-gray-200 items-center justify-center mr-2.5`}
              ></i>
              <p className='text-sm font-Matter-Medium'>
                {steps.step3
                  ? 'Final Details'
                  : steps.step2
                  ? 'Show Your Support'
                  : 'Select Amount'}
              </p>
            </div>
            <i
              onClick={handleClose}
              className='fa-solid fa-xmark fa-xs text-xs cursor-pointer flex s'
            ></i>
          </div>
          <div className='p-4 w-full'>
            {steps.step3 ? (
              <StepThree inputs={inputs} payPalComponents={payPalComponents} />
            ) : steps.step2 ? (
              <StepTwo inputs={inputs} setInputs={setInputs} emailError={emailError} />
            ) : (
              <StepOne campaign={campaign} inputs={inputs} setInputs={setInputs} />
            )}
          </div>
          {!steps.step3 && (
            <div className='bg-gray-100 border-0 px-3 py-2 w-full flex justify-end rounded-br-xl rounded-bl-xl'>
              <button
                className={`text-xs font-Matter-Medium ${campaign?.themeColor?.dark} text-white rounded-sm py-2.5 px-8`}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default AuctionDonationModal;
