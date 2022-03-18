import React from 'react';
import { useLocation } from 'react-router-dom';
import { LinkContainer, sidebarData, SideBarLink } from './SideBar';

const MobileNav = () => {
  const { pathname } = useLocation();
  return (
    <div className='d-flex flex-column mb-4'>
      {sidebarData().map((obj: any, i: number) => (
        <SideBarLink
          key={i}
          to={obj?.linkKey}
          active={(obj?.linkKey === pathname).toString()}
        >
          <LinkContainer
            style={{ border: 'none' }}
            active={(obj?.linkKey === pathname).toString()}
            className='d-flex align-items-center p-2'
          >
            <div>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </div>
  );
};

export default MobileNav;
