import { FC } from 'react';
import { FiveStepProcessProps } from '../../../types/adopt-types';
import { Link } from 'react-router-dom';

const ProcessStep: FC<FiveStepProcessProps> = ({ titleKey, text, text2, text3, linkKey, path }) => {
  return (
    <div className='mb-4'>
      <h2 className='text-lg font-Matter-Medium mb-2 text-zinc-800'>{titleKey}</h2>
      <p className='text-lg font-Matter-Light'>{text}</p>
      {text2 && <p className='text-lg font-Matter-Light mt-4'>{text2}</p>}
      {text3 && <p className='text-lg font-Matter-Light my-4'>{text3}</p>}
      {linkKey && (
        <Link
          to={linkKey}
          className='text-teal-400 text-lg hover:no-underline hover:text-teal-500 duration-200'
        >
          {path}
        </Link>
      )}
    </div>
  );
};

export default ProcessStep;
