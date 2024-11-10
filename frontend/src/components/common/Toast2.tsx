import { useEffect } from 'react';
import { Toast as T } from 'react-bootstrap';
import { closeToast } from '../../redux/features/toastSlice';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { useSelector } from 'react-redux';

const Toast2 = () => {
  const dispatch = useAppDispatch();
  const toast = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        dispatch(closeToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, toast]);

  if (toast.success) {
    return (
      <T
        className={`slide-in-from-right fixed z-[5002] top-20 right-4 shadow-xl rounded-lg bg-[#fff] border-[1px] border-green-500`}
        show={toast.open}
      >
        <T.Body className='text-gray-800 font-Matter-Regular text-sm flex items-center w-fit '>
          <i
            className={`fa-check fa-solid fa-xs border-[1px] rounded-full h-4 w-4 flex items-center justify-center border-green-500 text-green-500 mr-2`}
          ></i>
          {toast.message}
        </T.Body>
      </T>
    );
  } else if (toast.success === false) {
    return (
      <T
        className={`slide-in-from-right fixed z-[5002] top-20 right-4 shadow-xl rounded-lg bg-[#fff] border-[1px] border-red-500`}
        show={toast.open}
      >
        <T.Body className='text-gray-800 font-Matter-Regular text-sm flex items-center w-fit '>
          <i
            className={`fa-check fa-solid fa-xs border-[1px] rounded-full h-4 w-4 flex items-center justify-center border-red-500 text-red-500 mr-2`}
          ></i>
          {toast.message}
        </T.Body>
      </T>
    );
  } else return <></>;
};

export default Toast2;
