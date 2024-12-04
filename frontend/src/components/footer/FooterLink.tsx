import { FC } from 'react';
import { Link } from 'react-router-dom';
interface FooterLinkProps {
  obj: {
    linkKey?: string;
    textKey: string;
  };
}
const FooterLink: FC<FooterLinkProps> = ({ obj }) => {
  return (
    <Link to={obj.linkKey || '#'} className='flex items-center cursor-pointer'>
      <i className='fas fa-chevron-right text-teal-400 mr-3 w-5 h-5' />
      <p className='text-white text-[13px] font-QLight tracking-wide'>{obj.textKey}</p>
    </Link>
  );
};

export default FooterLink;
