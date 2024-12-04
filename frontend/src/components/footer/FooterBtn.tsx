import { FC } from 'react';

interface FooterBtnProps {
  obj: {
    linkKey?: string;
    textKey: string;
  };
}

const FooterBtn: FC<FooterBtnProps> = ({ obj }) => {
  return (
    <div
      onClick={() => window.open(obj.linkKey, '_blank')}
      className='flex items-center cursor-pointer'
    >
      <i className='fas fa-chevron-right text-teal-400 mr-3 w-5 h-5' />
      <p className='text-white text-[13px] font-QLight tracking-wide'>{obj.textKey}</p>
    </div>
  );
};

export default FooterBtn;
