import themeColors from '../../../data/campaign/theme-colors';
import TailwindSpinner from '../../../Loaders/TailwindSpinner';

const MainDetailsForm = ({
  handleInput,
  inputs,
  campaign,
  genericUpdateCampaign,
  setInputs,
  loading,
}: any) => {
  return (
    <form className='flex flex-col gap-3'>
      <div className='flex flex-col'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='title'>
          Title
        </label>
        <input
          className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
          name='title'
          onChange={handleInput}
          type='text'
          alt='title'
          value={inputs.title || ''}
        />
      </div>
      <div className='flex flex-col'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='subtitle'>
          Subtitle
        </label>
        <div className='text-sm font-Matter-Light'>
          Large, bold text that appears at the top of the page.
        </div>
        <input
          className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
          name='subtitle'
          onChange={handleInput}
          type='text'
          alt='subtitle'
          value={inputs.subtitle || ''}
        />
      </div>
      <div className='flex flex-col'>
        <label className='font-Matter-Medium text-sm mb-1' htmlFor='subtitle'>
          Goal
        </label>
        <div className='text-sm font-Matter-Light'>Add a goal and progress bar to your page.</div>
        <input
          className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
          name='goal'
          onChange={handleInput}
          type='number'
          alt='goal'
          value={inputs.goal || ''}
        />
      </div>
      <div className='flex flex-col  w-full mt-2 my-3'>
        <div className='flex flex-wrap gap-0.5 h-fit'>
          {themeColors.map((obj: any, i: number) => (
            <div
              onClick={() => setInputs((prev: any) => ({ ...prev, themeColor: obj }))}
              key={i}
              className={`${obj.dark} rounded-md h-8 w-8 flex items-center justify-center cursor-pointer`}
            >
              {inputs.themeColor.dark === obj.dark && (
                <div className='bg-white h-2 w-2 rounded-full'></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
        onClick={(e: any) =>
          genericUpdateCampaign(e, 'details', {
            title: inputs.title,
            subtitle: inputs.subtitle,
            goal: inputs.goal,
            themeColor: inputs.themeColor,
          })
        }
      >
        {campaign.success && campaign.type === 'details' ? (
          <i className='fas fa-check text-white'></i>
        ) : loading.details ? (
          <TailwindSpinner color='fill-white' />
        ) : (
          'Save'
        )}
      </button>
    </form>
  );
};

export default MainDetailsForm;
