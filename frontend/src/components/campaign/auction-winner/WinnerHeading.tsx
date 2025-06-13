import React from 'react';

interface WinnerHeadingProps {
  name: string;
  theme?: string;
}

const WinnerHeading: React.FC<WinnerHeadingProps> = ({ name, theme }) => (
  <>
    <h1 className='text-4xl text-center font-bold capitalize'>{name},</h1>
    <h4 className={`text-xl font-bold text-center mb-5 ${theme}`}>You're the Winner!</h4>
  </>
);

export default WinnerHeading;
