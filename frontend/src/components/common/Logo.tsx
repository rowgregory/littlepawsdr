import { Link } from 'react-router-dom';
import { WhiteLogo } from '../assets';

const Logo = ({ className }: { className: string }) => {
  return (
    <Link to='/'>
      <img className={className} src={WhiteLogo} alt='Little Paws Dachshund Rescue' />
    </Link>
  );
};

export default Logo;
