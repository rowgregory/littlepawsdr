import { FC, useEffect, useRef } from 'react';
import NavigationLink from './NavigationLink';
import { NavigationDrawerAccordionProps } from '../../types/navigation-drawer-types';
import { useLocation } from 'react-router-dom';

const NavigationDrawerAccordion: FC<NavigationDrawerAccordionProps> = ({
  item,
  isOpen,
  toggleAccordion,
  closeMenu,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  return (
    <div className='accordion'>
      <button onClick={toggleAccordion} className='group px-8 h-12 hover:no-underline w-full'>
        <div
          className={`${
            isOpen
              ? `bg-[#323338] after:absolute after:left-0 after:w-0 after:h-0 after:border-t-[20px] after:border-b-[20px] after:border-l-[10px] after:border-t-transparent after:border-b-transparent after:border-l-[#62e638]`
              : ''
          } grid grid-cols-12 gap-2 items-center text-left h-full rounded-xl group-hover:bg-[#323338] -mx-4 pl-3`}
        >
          <i className={`${item.icon} col-span-1 group-hover:-mr-1 text-white`} />
          <p
            className={`${
              isOpen ? 'text-white' : 'text-[#75767b]'
            } col-span-10 font-Montserrat font-medium group-hover:text-white`}
          >
            {item.title}
          </p>
          <i
            className={`${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} col-span-1 fas text-white`}
          ></i>
        </div>
      </button>
      <div
        ref={contentRef}
        className={`${
          isOpen ? 'mt-2.5' : ''
        } flex flex-col gap-y-2.5 relative overflow-hidden transition-max-height duration-300 ease-in-out`}
      >
        {item?.links.map((link, index) => (
          <NavigationLink
            key={index}
            close={closeMenu}
            linkKey={link.linkKey}
            textKey={link.linkText}
            active={pathname === link.linkKey}
          />
        ))}
        <div
          className={`absolute top-0 left-10 w-[2px] bg-[#6c6c75] z-20`}
          style={{
            height: `${
              (item.links.length === 5 ? 50 : item.links.length === 4 ? 47.5 : 45) * item.links.length
            }px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default NavigationDrawerAccordion;
