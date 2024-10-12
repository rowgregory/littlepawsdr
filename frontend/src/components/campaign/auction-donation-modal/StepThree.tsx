import { PayPalButtons } from '@paypal/react-paypal-js';

const StepThree = ({ inputs, payPalComponents }: any) => {
  return (
    <div className='w-full h-auto'>
      <div className='flex items-center justify-center mb-10'>
        <div className='flex items-center'>
          <i className={`fa-solid fa-heart text-3xl text-red-500 mr-3`}></i>
          <p className='font-Matter-Medium text-2xl'>Donation   ${inputs?.oneTimeDonationAmount?.toFixed(2)}</p>
        </div>
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

export default StepThree;
