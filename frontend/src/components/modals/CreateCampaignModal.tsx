import Modal from '../common/Modal';
import TailwindSpinner from '../Loaders/TailwindSpinner';

const CreateCampaignModal = ({
  show,
  handleClose,
  text,
  setText,
  handleCreateCampaign,
  loadingCreate,
}: any) => {
  return (
    <Modal show={show} onClose={handleClose}>
      <div className='bg-white p-6 rounded-xl flex flex-col'>
        <div onClick={handleClose} className='flex items-center mb-4 cursor-pointer w-fit'>
          <i className='fa-solid fa-arrow-left mr-2 text-gray-300 text-sm'></i>
          <p className='text-gray-400 text-sm'>Start Over</p>
        </div>
        <p className='text-sm font-Matter-Regular'>Campaign Title</p>
        <form onSubmit={handleCreateCampaign}>
          <input
            type='text'
            alt='Campaign Title'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
            className='focus:outline-none px-3 py-2 font-Matter-Regular w-full bg-white rounded-lg mb-6 mt-1 border-[1px] border-gray-200'
          />
          <button
            type='submit'
            className='flex items-center justify-center text-white bg-yellow-to-green border-none py-2 px-3 rounded-md w-full'
          >
            {loadingCreate && <TailwindSpinner color='fill-white' />}
            <p className='ml-1 font-Matter-Regular text-white'>Create Campaign</p>
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCampaignModal;
