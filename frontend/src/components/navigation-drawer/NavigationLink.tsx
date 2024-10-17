import { FC } from 'react';
import { Link } from 'react-router-dom';
import { NavigationLinkProps } from '../../types/navigation-drawer-types';

const NavigationLink: FC<NavigationLinkProps> = ({ close, linkKey, textKey, active }) => {
  return (
    <Link className='group px-8 h-12 hover:no-underline' to={linkKey} onClick={close}>
      <div className='relative grid grid-cols-12 gap-2 items-center text-left h-12 rounded-xl -mx-4 pl-3'>
        <div className='curve'></div>
        <p
          className={`${
            active ? 'text-white bg-[#323338]' : 'text-[#75767b]'
          } col-start-2 col-span-11 font-Montserrat font-medium group-hover:bg-[#323338] group-hover:text-white h-full rounded-xl flex items-center -ml-2 pl-3`}
        >
          {textKey}
        </p>
      </div>
    </Link>
  );
};

export default NavigationLink;
