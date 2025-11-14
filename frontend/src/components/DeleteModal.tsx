import AwesomeIcon from './common/AwesomeIcon';
import Modal from './common/Modal';
import TailwindSpinner from './Loaders/TailwindSpinner';
import checkForVowel from '../utils/dashboard-utils/checkForVowel';
import { exclamationTriangleIcon } from '../icons';

const DeleteModal = ({ type, id, deleteDocument, loading, hook }: any) => {
  const getAction = async () =>
    await deleteDocument({ id })
      .unwrap()
      .then(() => hook.closeModal());

  return (
    <Modal show={hook.show} onClose={hook.closeModal} modalStyles='max-w-sm'>
      <div className='bg-white p-6 rounded-xl h-fit flex flex-col items-center justify-between'>
        <div className='w-12 h-12 mb-6 bg-red-50 rounded-full flex items-center justify-center'>
          <AwesomeIcon icon={exclamationTriangleIcon} className='w-6 h-6 text-red-500' />
        </div>
        <div className='flex flex-col items-center justify-center mb-5'>
          <h1 className='font-QBold text-charcoal text-2xl mb-2'>Delete {type}</h1>
          <p className='font-QBold text-charcoal text-center'>
            You're going to delete {checkForVowel(type)} {type}. <br />
            Are you sure?
          </p>
        </div>
        <div className='flex items-center justify-between gap-x-3 w-full'>
          <button className='w-full py-3 text-charcoal bg-zinc-100 rounded-full font-QBold duration-200 hover:shadow-lg' onClick={hook.closeModal}>
            No, Keep It.
          </button>
          <button
            className='w-full py-3 bg-red-500 text-white rounded-full font-QBold duration-200 hover:shadow-lg hover:bg-red-600'
            onClick={getAction}
          >
            {loading ? <TailwindSpinner color='fill-[#fff]' /> : 'Yes, Delete!'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
