import { Link } from 'react-router-dom';
import LogoDay from '../../assets/dashboard-logo.png';
import { Image } from 'react-bootstrap';
import { Container } from './styles';
import AdminActionModalBody from '../AdminActionModalBody';

const SideBar = () => {
  return (
    <Container className='d-flex flex-column'>
      <Link to='/' style={{ marginInline: 'auto', marginBottom: '2rem' }}>
        <Image
          src={LogoDay}
          alt='LPDR'
          style={{ width: '130px', objectFit: 'cover' }}
        />
      </Link>

      <AdminActionModalBody />
    </Container>
  );
};

export default SideBar;
