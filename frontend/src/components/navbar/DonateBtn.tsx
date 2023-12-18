import { FAIcons } from '../styles/NavbarStyles';
import { Link } from 'react-router-dom';

const DonateBtn = () => {
  return (
    <FAIcons className='mr-2 hide'>
      <Link to='/donate' data-testid='donate' id='donate'>
        <i className='fas fa-dollar'></i>
      </Link>
    </FAIcons>
  );
};

export default DonateBtn;
