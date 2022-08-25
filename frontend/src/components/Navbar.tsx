import React, { useState } from 'react';
import DesktopNavbar from './navbar/DesktopNavbar';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <DesktopNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
};

export default Navbar;
