import { Link } from 'react-router-dom';
import LPDRLogo from '../../components/assets/logo-white2.png';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';

const StyledLogo = styled(Link)`
  cursor: 'pointer
`;

export const StyledImage = styled(Image) <{ show: any; p: string }>`
  height: 77px;
  object-fit: cover;
  margin-top: -9px;
  object-fit: cover;
`;

const Logo = ({ pathname, show }: { pathname: string; show: boolean }) => {
  return (
    <StyledLogo to='/'>
      <StyledImage
        show={show?.toString()}
        p={pathname}
        style={{}}
        src={LPDRLogo}
        alt='Little Paws Dachshund Rescue!'
      />
    </StyledLogo>
  );
};

export default Logo;
