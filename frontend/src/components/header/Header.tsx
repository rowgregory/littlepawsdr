import BottomHeader from './BottomHeader';
import TopHeader from './TopHeader';
import { Fragment } from 'react';

const Header = () => {
  return (
    <Fragment>
      <TopHeader />
      <BottomHeader />
    </Fragment>
  );
};

export default Header;
