import { PayPalButtons } from '@paypal/react-paypal-js';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import { useCreateOneTimeAuctionDonationMutation } from '../../redux/services/campaignApi';
import { validateEmailRegex } from '../../utils/regex';
import { Fragment, useState } from 'react';
import GreenRotatingTransparentCircle from '../Loaders/GreenRotatingTransparentCircle';

const oneTimeDonationData = [10, 25, 50, 100, 250, 500, 1000];

const Step3 = ({ inputs, payPalComponents }: any) => {
  return (
    <div className='w-full h-auto'>
      <div className='flex justify-between items-center mb-3.5 w-full'>
        <p className='text-xs font-Matter-Medium'>Donation</p>
        <p className='text-xs font-Matter-Medium'>${inputs?.oneTimeDonationAmount?.toFixed(2)}</p>
      </div>
      <div className='flex justify-between items-center mb-3.5'>
        <p className='text-xs font-Matter-Medium'>Credit Card Processing Fee</p>
        <p className='text-xs font-Matter-Medium'>
          ${(inputs.oneTimeDonationAmount * 0.035).toFixed(2)}
        </p>
      </div>
      <div className='flex justify-between items-center mb-3.5'>
        <p className='text-xs font-Matter-Medium'>Total</p>
        <p className='text-xs font-Matter-Medium'>
          ${(inputs.oneTimeDonationAmount * 0.035 + inputs.oneTimeDonationAmount).toFixed(2)}
        </p>
      </div>
      <div className='flex flex-col justify-between'>
        <p className='text-xs font-Matter-Medium mb-3'>Payment</p>
        <PayPalButtons
          style={payPalComponents.style}
          forceReRender={payPalComponents.forceRerender}
          createOrder={payPalComponents.createOrder}
          onApprove={payPalComponents.onApprove}
        />
      </div>
    </div>
  );
};

const Step2 = ({ inputs, setInputs, emailError }: any) => (
  <div className='h-80'>
    <p className='text-xs font-Matter-Medium mb-2'>Add a public message</p>
    <div className='flex flex-col border-[0.5px] border-gray-200 rounded-xs bg-gray-50 p-3'>
      <div className='flex items-center mb-3'>
        <p className='font-Matter-Medium text-xs pr-1.5'>From: </p>
        <input
          type='text'
          value={inputs.donor || ''}
          name='donor'
          onChange={(e: any) => setInputs((prev: any) => ({ ...prev, donor: e.target.value }))}
          className='auction-donation-modal-input w-full bg-gray-50 font-Matter-Regular text-xs focus:outline-none border-0 placeholder:text-xs placeholder:text-gray-400 placeholder:font-Matter-Regular'
          placeholder='Your name'
        />
      </div>
      <textarea
        value={inputs.donorPublicMessage || ''}
        onChange={(e: any) =>
          setInputs((prev: any) => ({
            ...prev,
            donorPublicMessage: e.target.value,
          }))
        }
        placeholder='Write your message...'
        rows={7}
        className='auction-donation-modal-input auction-support-textarea text-xs focus:outline-none border-0 placeholder:text-xs placeholder:text-gray-400 placeholder:font-Matter-Regular'
      ></textarea>
      <div className='flex items-center mb-0'>
        <p className='font-Matter-Medium text-xs pr-1.5'>Email: </p>
        <input
          type='email'
          value={inputs.email || ''}
          name='email'
          onChange={(e: any) => setInputs((prev: any) => ({ ...prev, email: e.target.value }))}
          className='auction-donation-modal-input w-full bg-gray-50 font-Matter-Regular text-xs focus:outline-none border-0 placeholder:text-xs placeholder:text-gray-400 placeholder:font-Matter-Regular'
          placeholder='Your email'
        />
      </div>
      <p className='text-xs text-red-500 font-Matter-Regular'>{emailError}</p>
    </div>
  </div>
);

const Step1 = ({ campaign, setInputs, inputs }: any) => (
  <div className='h-80'>
    <div className='flex items-center justify-between mb-4 w-full'>
      <p
        className={`text-sm w-full border-[1px] text-center ${campaign?.themeColor?.dark} text-white rounded-tl-sm rounded-bl-sm px-3 py-2`}
      >
        One Time
      </p>
    </div>
    <div className='grid grid-cols-4 gap-3'>
      {oneTimeDonationData.map((amount: number, i: number) => (
        <span
          onClick={() =>
            setInputs((prev: any) => ({
              ...prev,
              oneTimeDonationAmount: amount,
            }))
          }
          className={`${inputs.oneTimeDonationAmount === amount
              ? `${campaign?.themeColor?.dark} text-white shadow-md`
              : ''
            } cursor-pointer col-span-1 border-[0.5px] px-2 py-1.5 rounded-sm ${campaign?.themeColor?.text
            } text-center text-xs font-Matter-Medium`}
          key={i}
        >
          ${amount}
        </span>
      ))}
      <div className='flex items-center col-span-1 border-[0.5px] rounded-sm'>
        <span
          className={`${campaign?.themeColor?.dark} text-white font-Matter-Medium text-xs h-full p-1.5`}
        >
          $
        </span>
        <input
          type='number'
          onChange={(e: any) =>
            setInputs((prev: any) => ({
              ...prev,
              oneTimeDonationAmount: parseFloat(e.target.value),
            }))
          }
          className={`w-8/12 rounded-sm px-2 py-1.5 ${campaign?.themeColor?.text} text-xs font-Matter-Medium placeholder:font-Matter-Medium placeholder:text-gray-200 placeholder:text-xs focus:outline-none`}
          placeholder='Other'
          onFocus={() => setInputs((prev: any) => ({ ...prev, oneTimeDonationAmount: 0 }))}
        />
      </div>
    </div>
  </div>
);

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
        if (details.status === 'COMPLETED' && details.id) {
          await createOneTimeAuctionDonation({
            auctionId: campaign?.auction?._id,
            donor: inputs.donor,
            email: inputs.email,
            donorPublicMessage: inputs.donorPublicMessage,
            oneTimeDonationAmount: inputs.oneTimeDonationAmount,
            creditCardProcessingFee: inputs.oneTimeDonationAmount * 0.035,
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
        }
      });
    },
  } as any;

  return (
    <Fragment>
      {orderLoader && <GreenRotatingTransparentCircle />}
      <Modal show={openModal.donate} onHide={handleClose} centered>
        <div className='bg-white rounded-xl flex flex-col justify-center items-center'>
          <div className='flex bg-gray-100 px-3 py-2.5 border-0 relative rounded-tl-xl rounded-tr-xl h-11 w-full justify-between items-center'>
            <div className='flex items-center'>
              <i
                onClick={handleBack}
                className={`${steps.step2 || steps.step3 ? 'flex' : 'hidden'
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
          <div className='p-4'>
            {steps.step3 ? (
              <Step3 inputs={inputs} payPalComponents={payPalComponents} />
            ) : steps.step2 ? (
              <Step2 inputs={inputs} setInputs={setInputs} emailError={emailError} />
            ) : (
              <Step1 campaign={campaign} inputs={inputs} setInputs={setInputs} />
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
