import { Modal } from 'react-bootstrap';
import TailwindSpinner from './Loaders/TailwindSpinner';
import { useState } from 'react';

export const useDeleteModal = () => {
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return { show, openModal, closeModal };
};

const DeleteModal = ({ type, id, deleteDocument, loading, hook }: any) => {

  const getAction = async () => await deleteDocument({ id }).unwrap().then(() => hook.closeModal())

  const checkForVowel = (word: string) => {
    const firstLetter = word?.charAt(0);
    const isVowel = ['A', 'E', 'I', 'O'].includes(firstLetter);
    if (isVowel) return 'an ';
    return 'a ';
  };

  return (
    <Modal show={hook.show} centered>
      <div className='bg-white p-5 rounded-xl min-h-72 flex flex-col justify-between'>
        <p className='text-2xl font-Matter-Medium'>
          Are you sure you want to <span className='text-2xl text-red-500'>DELETE</span> {checkForVowel(type)}
          {type}
        </p>
        <div className='flex items-center justify-end gap-3'>
          <button className='px-3 py-2 text-red-500 border-2 border-red-500 rounded-md font-Matter-Medium duration-200 hover:shadow-lg' onClick={hook.closeModal}>
            No
          </button>
          <button className='px-3 py-2 bg-red-500 border-2 border-red-500 text-white font-Matter-Medium rounded-md duration-200 hover:shadow-lg hover:bg-red-600' onClick={getAction}>
            {loading ? <TailwindSpinner color='fill-[#fff]' /> : 'Yes'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
