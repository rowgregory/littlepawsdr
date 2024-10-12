import { Link } from 'react-router-dom';
import LogoDay from '../../../components/assets/logo-transparent.png';

const CartHeader = () => {
  return (
    <div className='flex items-center mb-16'>
      <Link to='/'>
        <img src={LogoDay} className='h-12 sm:h-24 object-cover' alt='Cart Logo' />
      </Link>
      <div className='w-[1px] h-10 sm:h-14 bg-gray-400 mx-3 sm:mx-4'></div>
      <p className='font-Matter-Regular text-gray-800 text-lg md:text-xl'>Shopping Cart</p>
    </div>
  );
};

export default CartHeader;
