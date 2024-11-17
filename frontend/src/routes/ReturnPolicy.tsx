const ReturnPolicy = () => {
  return (
    <div className='px-3 my-32 min-h-[calc(100vh-1068px)]'>
      <div className='max-w-screen-xl w-full mx-auto'>
        <p className='text-3xl font-QBold mb-5'>RETURN POLICY</p>
        <p className='mb-12 font-QBook'>Last updated November 16th, {new Date().getFullYear()}</p>
        <p className='text-2xl mb-5 font-QBold'>REFUNDS</p>
        <p className='mb-12 font-QBook'>All sales are final and no refund will be issued.</p>
        <p className='text-2xl font-QBold mb-5'>QUESTIONS</p>
        <p className='text-xl font-QBook'>
          If you have any questions concerning our return policy, contact us at:
        </p>
        <p className='text-xl font-QBook'>lpdr@littlepawsdr.org</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
