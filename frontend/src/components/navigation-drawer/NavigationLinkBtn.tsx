import { FC } from 'react';
import { Link } from 'react-router-dom';
import { NavigationLinkBtnProps } from '../../types/navigation-drawer-types';

const NavigationLinkBtn: FC<NavigationLinkBtnProps> = ({ closeMenu, item, isActive }) => {
  return (
    <Link
      to={item?.link}
      onClick={() => closeMenu()}
      className={`group px-8 h-12 hover:no-underline w-full`}
    >
      <div
        className={`${
          isActive
            ? `bg-[#323338] after:absolute after:left-0 after:w-0 after:h-0 after:border-t-[20px] after:border-b-[20px] after:border-l-[10px] after:border-t-transparent after:border-b-transparent after:border-l-teal-400`
            : ''
        } grid grid-cols-12 gap-2 items-center text-left h-full rounded-xl group-hover:bg-[#323338] -mx-4 pl-3`}
      >
        <i className={`${item?.icon} col-span-1 group-hover:-mr-1 text-white`} />
        <p
          className={`${
            isActive ? 'text-white' : 'text-[#75767b]'
          } col-span-10 font-Montserrat font-medium`}
        >
          {item?.title}
        </p>
      </div>
    </Link>
  );
};

export default NavigationLinkBtn;
