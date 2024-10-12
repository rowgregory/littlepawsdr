const oneTimeDonationData = [10, 25, 50, 100, 250, 500, 1000];

const StepOne = ({ campaign, setInputs, inputs }: any) => (
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
          className={`${
            inputs.oneTimeDonationAmount === amount
              ? `${campaign?.themeColor?.dark} text-white shadow-md`
              : ''
          } cursor-pointer col-span-1 border-[0.5px] px-2 py-1.5 rounded-sm ${
            campaign?.themeColor?.text
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

export default StepOne