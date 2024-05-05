const CheckoutStep1 = ({ handleInput, inputs, errors, submitContactInfo }: any) => {
  return (
    <div className='flex flex-col h-fit'>
      <div className='flex flex-col md:flex-row gap-4 '>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
            Name*
          </label>
          <input
            className='bg-white border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none '
            name='name'
            onChange={handleInput}
            type='text'
            alt='Name'
            value={inputs.name || ''}
          />
          <p className='text-xs text-red-500 mb-4'>{errors?.name}</p>
        </div>
        <div className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
            Email*
          </label>
          <input
            className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none '
            name='emailAddress'
            onChange={handleInput}
            type='text'
            alt='Email'
            value={inputs.emailAddress || ''}
          />
          <p className='text-xs text-red-500 mb-4'>{errors?.emailAddress}</p>
        </div>
      </div>
      <button
        className=' mt-5 font-Matter-Medium border-[1px] self-center text-xl duration-300 mb-3 mr-3 text-[#fff] bg-teal-500 px-5 py-3 rounded-md hover:bg-teal-500 hover:text-white'
        onClick={submitContactInfo}
      >
        Continue
      </button>
    </div>
  );
};

export default CheckoutStep1;
