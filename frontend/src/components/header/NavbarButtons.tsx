import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { NoImgDog } from '../assets';
import { toggleUserDropdown } from '../../redux/features/navbar/navbarSlice';

const styles = `bg-gray-300 text-slate-800 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer duration-300 hover:bg-gray-400 hover:no-underline`;

const Donate = () => (
  <Link to='/donate' className={styles}>
    <i className='fas fa-donate text-[#333]' />
  </Link>
);

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <Link to='/cart' className={`${styles} relative`}>
      <span className='text-white text-xs absolute -top-1 left-6 flex items-center text-center justify-center z-10 cursor-pointer bg-red-500 font-Matter-Medium w-5 h-5 rounded-full'>
        {cart?.cartItemsAmount}
      </span>
      <i color='fas fa-shopping-cart text-[#333]' />
    </Link>
  );
};

const Auth = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth?.user;

  return user?.isAdmin ? (
    <img
      className='w-10 h-10 rounded-full cursor-pointer object-cover duration-200'
      src={user?.avatar || NoImgDog}
      alt={`Hey ${user?.name}! We appreciate you! Love from LPDR`}
      onClick={() => dispatch(toggleUserDropdown({ userDropdown: true }))}
    />
  ) : user?._id ? (
    <div
      className={`uppercase cursor-pointer h-10 w-10 rounded-full flex items-center justify-center`}
      onClick={() => dispatch(toggleUserDropdown({ userDropdown: true }))}
    >
      {user?.firstNameFirstInitial}
      {user?.lastNameFirstInitial}
    </div>
  ) : (
    <Link to='/auth/login' className={styles}>
      <i className='fas fa-user text-[#333]' />
    </Link>
  );
};

export { Donate, Cart, Auth };
