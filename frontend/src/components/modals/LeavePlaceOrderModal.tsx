import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { setShowModal } from '../../redux/features/cart/cartSlice';
import Modal from '../common/Modal';

const LeavePlaceOrderModal = () => {
  const dispatch = useAppDispatch();
  const { showModal } = useSelector((state: RootState) => state.cart);
  const closeModal = () => dispatch(setShowModal(false));

  return (
    <Modal show={showModal} onClose={closeModal}>
      <div className='bg-white px-4 py-5 h-60 rounded-xl flex flex-col justify-between'>
        <i
          onClick={closeModal}
          className='cursor-pointer absolute top-5 right-5 fas fa-times fa-lg text-gray-600'
        ></i>
        <p className='text-xl font-Matter-Regular'>Are you sure you want to go back?</p>
        <div className='flex items-center justify-end'>
          <button
            onClick={closeModal}
            className='border-2 border-teal-500 rounded-sm text-teal-500 bg-[#fff] px-4 py-2 w-fit duration-300 hover:bg-teal-100 '
          >
            No
          </button>
          <Link
            className='ml-2 border-2 border-teal-500 rounded-sm text-[#fff] bg-teal-500 px-4 py-2 w-fit duration-300 hover:bg-teal-600 hover:no-underline hover:text-white'
            to='/cart'
          >
            Yes
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default LeavePlaceOrderModal;
