import React from 'react';
import { Link } from 'react-router-dom';

interface AlreadyPaidMessageProps {
  theme?: {
    text?: string;
    light?: string;
    dark?: string;
  };
}

const AlreadyPaidMessage: React.FC<AlreadyPaidMessageProps> = ({ theme }) => (
  <div className='text-center flex justify-center items-center flex-col'>
    <i
      className={`fa-solid fa-handshake-angle ${theme?.text} fa-xl rounded-md h-12 w-12 ${theme?.light} flex items-center justify-center p-2 mb-3`}
    ></i>
    <p className='font-Matter-Regular text-xl mb-3'>This item has already been paid for</p>
    <Link
      className={`${theme?.dark} px-4 py-2 rounded-lg text-white font-Matter-Medium hover:no-underline hover:text-white hover:shadow-lg`}
      to='/campaigns'
    >
      Go to campaigns
    </Link>
  </div>
);

export default AlreadyPaidMessage;
