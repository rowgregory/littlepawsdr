import TailwindSpinner from '../../../Loaders/TailwindSpinner';
import { Form } from 'react-bootstrap';

const StoryForm = ({ genericUpdateCampaign, inputs, campaign, loading, handleInput }: any) => {
  return (
    <form className='flex flex-col'>
      <div className='flex flex-col md:flex-row md:justify-between mb-2'>
        <div className='flex flex-col'>
          <div className='font-Matter-Regular text-lg'>Story</div>
          <div className='font-Matter-Light text-sm'>
            Add a story to your campaign. This appears <br /> directly below the title.
          </div>
        </div>
        <button
          className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
          onClick={(e: any) =>
            genericUpdateCampaign(e, 'story', {
              story: inputs.story,
            })
          }
        >
          {campaign.success && campaign.type === 'story' ? (
            <i className='fas fa-check text-white'></i>
          ) : loading.story ? (
            <TailwindSpinner color='fill-white' />
          ) : (
            'Save'
          )}
        </button>
      </div>
      <Form.Control
        as='textarea'
        name='story'
        rows={10}
        value={inputs.story || ''}
        placeholder='Tell your story...'
        onChange={handleInput}
        className='font-Matter-Light placeholder:font-Matter-Light placeholder:text-sm border rounded-lg'
      />
    </form>
  );
};

export default StoryForm;
