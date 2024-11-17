import { Toast as T } from 'react-bootstrap';

const Toast = ({ message, success }: { message: any; success?: boolean }) => {
  return (
    <T
      className={`fixed z-[5002] bottom-4 py-2 px-3 left-1/2 -translate-x-1/2 shadow-xl rounded-lg bg-[#fff] border-[1px] ${
        success ? 'border-green-500' : 'border-red-500'
      } `}
      show={message !== null}
    >
      <T.Body className='text-gray-800 font-Matter-Regular text-sm flex items-center w-fit '>
        <i
          className={`${
            success ? 'fa-check text-green-500' : 'fa-exclamation text-red-500'
          } fa-solid  fa-xs border-[1px] rounded-full h-4 w-4 flex items-center justify-center ${
            success ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
          } mr-2`}
        ></i>
        {message.text}
      </T.Body>
    </T>
  );
};

export default Toast;
