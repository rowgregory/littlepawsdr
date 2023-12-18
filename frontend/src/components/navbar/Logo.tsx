import { Link } from 'react-router-dom';
import LPDRLogo from '../../components/assets/logo-white2.png';
import { StyledImage } from '../styles/NavbarStyles';

const Logo = ({ pathname, show }: { pathname: string; show: boolean }) => {
  return (
    <Link to='/'>
      <StyledImage
        show={show?.toString()}
        p={pathname}
        style={{}}
        src={LPDRLogo}
        alt='Little Paws Dachshund Rescue!'
      />
    </Link>
  );
};

export default Logo;
