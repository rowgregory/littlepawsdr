import welcomeWienerIconData from '../../../utils/welcomeWienerIconData'

const WelcomeWienerProducts = ({ setInputs, inputs }: { setInputs: any; inputs: { icon: string } }) => {
  return (
    <div className='flex w-full flex-wrap gap-2 cursor-pointer rounded-md'>
      {welcomeWienerIconData.map((item, index) => (
        <div
          className={`w-28 h-28 flex justify-center items-center flex-col rounded-md p-2 hover:bg-gray-100 ${inputs.icon === item.iconClassName ? 'bg-gray-200' : 'bg-[#fff] border-[1px] border-gray-200'
            }`}
          key={index}
          onClick={() =>
            setInputs((inputs: any) => ({
              ...inputs,
              icon: item.iconClassName,
            }))
          }
        >
          <span className='flex items-center aspect-square justify-center text-sm'>{item.icon}</span>
          <p className='text-center text-sm font-Matter-Regular'>{item.textKey}</p>
        </div>
      ))}
    </div>
  )
}

export default WelcomeWienerProducts