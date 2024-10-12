const StepTwo = ({ inputs, setInputs, emailError }: any) => (
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

export default StepTwo;
