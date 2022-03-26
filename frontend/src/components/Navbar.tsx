import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import GlobalStyles from '../GlobalStyles';
import DesktopNavbar from './navbar/DesktopNavbar';
import MobileNavbar from './navbar/MobileNavbar';
import SocialMediaNavbar from './navbar/SocialMediaNavbar';

const Navbar = () => {
  const { pathname: p } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const isNotDashboard = !['admin'].includes(p.split('/')[1]);

  return (
    <>
      <GlobalStyles hasClickedHamburger={openMenu} />
      <MobileNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <DesktopNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      {isNotDashboard && <SocialMediaNavbar />}
    </>
  );
};

export default Navbar;
